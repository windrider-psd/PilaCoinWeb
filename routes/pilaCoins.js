let express = require('express');
let router = express.Router();
let {CrossAppCommunicator, OPERATIONTYPE, RESPONSESTATUS} = require('./../services/CrossAppComunicator')
let models = require('./../model/DBModels')
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


router.use((req, res, next) => {
    if (typeof (req.session.user) != 'undefined' && req.session.user != null) {
        next()
    } else {
        res.status(401).end("No session.");
    }
})

router.use((req, res, next) => {
    if (req.session.user.admin == true) {
        next()
    } else {
        res.status(401).end("No permissions.");
    }
})

router.put('/transfer', (req, res) => {
    /**
     * @type {{pilaCoinId : Number, targetId : String}}
     */
    let params = req.body

    if(!(params.pilaCoinId == null && params.targetId == null))
    {
        res.status(400).end("Invalid parameters")
    }
    else
    {
        CrossAppCommunicator.WriteCommand('dht/sell', OPERATIONTYPE.WRITE, {pilaCoinId : params.pilaCoinId, targetId : params.targetId}, (err, response) => {
            if(err)
            {
                res.status(500).end(err.message)
            }
            else
            {
                res.status(200).json({});
                models.Transaction.create({pilaCoin: params.pilaCoinId, targetId: params.targetId, user : req.session.user.id});
            }
        })
    }
});

module.exports = router;