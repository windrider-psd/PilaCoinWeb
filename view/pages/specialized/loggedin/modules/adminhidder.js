let $ = require('jquery')
let utils = require('./../../../generic/modules/utils')
let observer = require('./../../../generic/modules/observer')

$(document).ready(function () {
    observer.Observe('session-data-ready', (sessionData) => {
        let user = sessionData.user;
        observer.o
        if(user.admin)
        {
            $(".admin").removeClass('hidden')
        }
    })
})
