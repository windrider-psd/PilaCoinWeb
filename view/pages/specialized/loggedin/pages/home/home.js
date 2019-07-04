let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')

$(document).ready(function () {

    $("#logout").on('click', function(){
        $.ajax({
            method : 'DELETE',
            url : '/users/login',
            data: {},
            dataType : "JSON",
            success : (response) => {
                location.reload()
            },
            error : (message) => {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    })

    $.ajax({
        method : 'GET',
            url : '/pilacoins/storage',
            data: {},
            dataType : "JSON",
            success : (response) => {
                console.log(response)
            },
            error : (message) => {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
    })
})