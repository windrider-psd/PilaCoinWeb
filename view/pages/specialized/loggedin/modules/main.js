const $ = require('jquery')
const utils = require('./../../../generic/modules/utils')
const observer = require('./../../../generic/modules/observer')

$(document).ready(function() {
    $.ajax({
        method : 'GET',
        url : '/users/session-data',
        data: {},
        dataType : "JSON",
        success : (response) => {
            observer.Trigger('session-data-ready', response)
        },
        error : function (message) {
            utils.GerarNotificacao(message.responseText, 'primary')
        }
    })
})