let $ = require('jquery')
let utils = require('./../../modules/utils')

$(document).ready(function () {
    $("#logout").on('click', function(){
        $.ajax({
            method : 'DELETE',
            url : '/users/login',
            data: {},
            dataType : "JSON",
            success : (response) => {
                console.log(response)
            },
            error : function (message) {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    })

    $.ajax({
        method : 'GET',
        url : '/users/session-data',
        data: {},
        dataType : "JSON",
        success : (response) => {
            console.log(response)
        },
        error : function (message) {
            utils.GerarNotificacao(message.responseText, 'primary')
        }
    })
})