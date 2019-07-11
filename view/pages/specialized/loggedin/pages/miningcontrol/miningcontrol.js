let $ = require('jquery')
let utils = require('./../../../../generic/modules/utils')
let observer = require('./../../../../generic/modules/observer')

$(document).ready(function () {
    observer.Observe('session-data-ready', (sessionData) => {
        console.log(sessionData)
    })
    let getState = ()=> {
        $.ajax({
            method: 'GET',
            url: '/mining',
            dataType: "JSON",
            success: (response) => {
                let magical = response.numeroMagico
                let scheduled = response.scheduledPilaCoins
                let threads = response.threads
                let turnedOn = response.turnedOn
                let underValidation = response.underValidation;
    
                $(".pila-coin-info .magic span").text(magical);
                $(".pila-coin-info .scheduled span").text(scheduled);
                $(".pila-coin-info .threads span").text(threads);
                $(".pila-coin-info .validation span").text(underValidation);
    
                let textStatus = turnedOn ? "Mining is ON" : "Mining is OFF"
                $(".pila-coin-info .status").text(textStatus);
                if (turnedOn) {
                    $("#mining-off").removeClass("hidden");
                    $("#mining-on").addClass("hidden");
                } else {
                    $("#mining-on").removeClass("hidden");
                    $("#mining-off").addClass("hidden");
                }
    
            },
            error: (message) => {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        })
    }
   


    $("#mining-off").on('click', function () {

        $.ajax({
            method: 'PUT',
            data : {value : false},
            url: '/mining',
            dataType: "JSON",
            success : (response) => {
                utils.GerarNotificacao("Mining is turned off", 'success')
                getState();
            },
            error: (message) => {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        });
    })
    $("#mining-on").on('click', function () {

        $.ajax({
            method: 'PUT',
            data : {value : true},
            url: '/mining',
            dataType: "JSON",
            success : (response) => {
                utils.GerarNotificacao("Mining is turned on", 'success')
                getState();
            },
            error: (message) => {
                utils.GerarNotificacao(message.responseText, 'primary')
            }
        });
    })
    getState();
})