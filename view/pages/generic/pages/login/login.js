let $ = require('jquery')
let utils = require('./../../modules/utils')


$(document).ready(function () {
    $("#register-form").on('submit', function(){
        let params = utils.FormToAssocArray($(this))
        $.ajax({
            method : 'POST',
            url : '/users/login',
            data: params,
            dataType : "JSON",
            success : (response) => {
                console.log(response)
            },
            error : function (message) {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    })
    

})
