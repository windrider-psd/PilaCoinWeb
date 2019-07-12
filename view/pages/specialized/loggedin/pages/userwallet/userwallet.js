let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')

$(document).ready(function () {

    let params = utils.ParseGET();
    params = utils.LimparObj(params)


    GetUsersNetwork((users) => {
        let user = null

        users.forEach(element => {
            if (element.id == params.id) {
                user = element
                return false
            }
        });

        if (true) {
            //$("#user-title span").text(user.id)
            GetUserWallet(user.id, (pilaCoins) => {
                let htmlString = ''
                for (let pilaCoin of pilaCoins) {
                    htmlString += `
                    <tr>
                        <td>${pilaCoin.id}</td>
                        <td>${pilaCoin.idCriador}</td>
                        <td>${new Date(pilaCoin.dataCriacao)}</td>
                        <td>${pilaCoin.numeroMagico}</td>
                        <td>${pilaCoin.transacoes != null ? pilaCoin.transacoes.length : 0}</td>
                        <td><a href = "pila_tranf?pilaCoinId=${pilaCoin.id}">Transfer</a></td>
                    </tr>
                    `
                }
                $("#wallet tbody").html(htmlString)
            });
        }
    })
    function GetUsersNetwork(callback) {
        $.ajax({
            url: 'users/network',
            method: 'GET',
            dataType: "JSON",
            success: (response) => {

                callback(response);
            },
            error: (err) => {
                utils.GerarNotificacao(err.responseText, 'danger')
            }
        })
    }

    function GetUserWallet(userId, callback) {

        $.ajax({
            url: 'users/wallet',
            method: 'GET',
            data: { userId: userId },
            dataType: 'JSON',
            success: (response) => {
                callback(response)
            },
            error: (err) => {
                utils.GerarNotificacao(err.responseText, 'danger')
            }
        })

    }
})