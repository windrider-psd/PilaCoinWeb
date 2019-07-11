let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')


$(document).ready(function () {
    observer.Observe('session-data-ready', (sessionData) => {
        console.log(sessionData)
    })
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