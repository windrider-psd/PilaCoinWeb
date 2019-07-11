let express = require('express');
let router = express.Router();
const path = require('path')
let {
  CrossAppCommunicator,
  MESSAGETYPE,
  OPERATIONTYPE,
  RESPONSESTATUS
} = require('./../services/CrossAppComunicator')


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


router.get('/', (req, res, next) => {
  CrossAppCommunicator.WriteCommand('mining/control', OPERATIONTYPE.READ, {}, (err, response) => {

    if(err)
    {
      res.status(500).end(err.message);
    }
    else
    {
      res.status(200).json(response.arg)
    }
  })
})

router.put('/', (req, res, next) => {
  /**
   * @type {{value : boolean}}
   */
  let params = req.body

  if(params.value == null)
  {
    res.status(400).end("Invalid parameters");
  }
  else
  {
    params.value = params.value === 'true';
    CrossAppCommunicator.WriteCommand('mining/control', OPERATIONTYPE.WRITE, params.value, (err, response) => {
      if(err)
      {
        res.status(500).end(err.message);
      }
      else
      {
        res.status(200).end(String(response.arg));
      }
    })
  }
})  

module.exports = router;