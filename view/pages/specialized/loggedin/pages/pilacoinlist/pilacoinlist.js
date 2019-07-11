let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')

$(document).ready(function () {
    observer.Observe('session-data-ready', (sessionData) => {
        console.log(sessionData)
    })
    $.ajax({
        url: 'pilacoins/storage',
        method : 'GET',
        dataType : "JSON",
        success : (response) =>{
            let htmlString = ''
            response.sort((a, b) => {
               return a.id- b.id;
            });

            for(pilaCoin of response)
            {
                htmlString += `
                <tr>
                    <td>${pilaCoin.id}</td>
                    <td>${pilaCoin.idCriador}</td>
                    <td>${new Date(pilaCoin.dataCriacao)}</td>
                    <td>${pilaCoin.numeroMagico}</td>
                    <td>${pilaCoin.transacoes != null ? pilaCoin.transacoes.length : 0}</td>
                </tr>
                `
            }
            $("#pila-coins-list tbody").html(htmlString)
        },
        error : (err) =>
        {
            console.error(err)
        }
    })
})