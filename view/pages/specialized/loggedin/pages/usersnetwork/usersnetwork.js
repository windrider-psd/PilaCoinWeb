let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')

$(document).ready(function () {
    $.ajax({
        url: 'users/network',
        method : 'GET',
        dataType : "JSON",
        success : (response) =>{
            let htmlString = ''
            for(let user of response)
            {
                htmlString += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.inetAddress}</td>
                    <td>${user.publicKey}</td>
                    <td><a href="wallet?userId=${user.id}">See wallet</a></td>
                </tr>
                `
            }
            $("#user-list tbody").html(htmlString)
        },
        error : (err) =>
        {
            utils.GerarNotificacao(err.responseText, 'danger')
        }
    })
})