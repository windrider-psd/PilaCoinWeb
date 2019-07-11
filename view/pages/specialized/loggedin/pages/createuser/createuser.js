let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')


$(document).ready(function () {
    $("#register-form").on('submit', function(){
        let params = utils.FormToAssocArray($(this))
        $.ajax({
            method : 'POST',
            url : '/users/user',
            data: params,
            dataType : "JSON",
            success : (response) => {
                utils
                $(this)[0].reset();
            },
            error : function (message) {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    })
    

})
