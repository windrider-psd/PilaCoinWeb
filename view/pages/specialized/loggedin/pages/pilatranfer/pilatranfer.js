let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')

$(document).ready(function () {
    observer.Observe('session-data-ready', (sessionData) => {
        console.log(sessionData)
    })
    let queryParams = utils.ParseGET();
    utils.LimparObj(queryParams);
    
    
    GetStorage((storage) => {

        let pilaCoin = null;
        for(let p of storage)
        {
            if(p.id == queryParams['pilaCoinId'])
            {
                pilaCoin = p;
                break
            }
        }

        if(pilaCoin == null)
        {
            utils.GerarNotificacao("Pila coin not found!", 'danger');
        }
        else{
            $("#pila-coin span").text(pilaCoin.id)
            $("#transfer-form").on('submit', function() {

                let params = utils.FormToAssocArray($(this))
                params.pilaCoinId = pilaCoin.id
                console.log(params)
                $.ajax({
                    url : 'pilacoins/transfer',
                    method : 'PUT',
                    data : params,
                    dataType : 'JSON',
                    success : (response) => {
                        utils.GerarNotificacao("Pila Coin transfered", "success")
                    },
                    error : (err) =>
                    {
                        utils.GerarNotificacao(err.responseText, 'danger')
                    }
                })
            })
            
        }
    })
    

})

function GetStorage(callback)
{
    $.ajax({
        url: 'pilacoins/storage',
        method : 'GET',
        dataType : "JSON",
        success : (response) =>{
            callback(response)
        },
        error : (err) =>
        {
            utils.GerarNotificacao(err.responseText, 'danger')
        }
    })
}