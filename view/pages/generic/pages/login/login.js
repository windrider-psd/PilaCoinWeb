let $ = require('jquery')
let utils = require('./../../modules/utils')


$(document).ready(function () {
    $("#register-form").on('submit', function(){
        let params = utils.FormToAssocArray($(this))
        $.ajax({
            method : 'POST',
            url : '/users/user',
            data: params,
            success : (response) => {
                console.log(response)
            },
            error : function (message) {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    })
})
