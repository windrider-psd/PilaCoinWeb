let express = require('express');
let router = express.Router();
let {CrossAppCommunicator, OPERATIONTYPE, RESPONSESTATUS} = require('./../services/CrossAppComunicator')

require('dotenv/config')

router.use((req, res, next) => {

    if (typeof (req.session.user) != 'undefined' && req.session.user != null) {
        next()
    } else {
        res.status(401).end("No session.");
    }
})


router.get('/schedule', (req, res) => {
    CrossAppCommunicator.WriteCommand('pilacoin/schedule', OPERATIONTYPE.READ, {}, (err, response) => {
        if(err)
        {
            res.status(500).end(err.message)
        }
        else if(response.responseStatus != RESPONSESTATUS.OK)
        {
            res.status(500).end(response.arg.message)
        }
        else
        {
            res.status(200).json(response.arg)
        }
    })
});

router.get('/validation', (req, res) => {
    CrossAppCommunicator.WriteCommand('pilacoin/validation', OPERATIONTYPE.READ, {}, (err, response) => {
        if(err)
        {
            res.status(500).end(err.message)
        }
        else if(response.responseStatus != RESPONSESTATUS.OK)
        {
            res.status(500).end(response.arg.message)
        }
        else
        {
            res.status(200).json(response.arg)
        }
    })
});

router.get('/storage', (req, res) => {
    CrossAppCommunicator.WriteCommand('pilacoin/storage', OPERATIONTYPE.READ, {}, (err, response) => {
        if(err)
        {
            res.status(500).end(err.message)
        }
        else if(response.responseStatus != RESPONSESTATUS.OK)
        {
            res.status(500).end(response.arg.message)
        }
        else
        {
            res.status(200).json(response.arg)
        }
    })
});



module.exports = router;