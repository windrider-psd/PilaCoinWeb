var express = require('express');
var router = express.Router();
let models = require('./../model/DBModels')

router.get('/user', (req, res, next) => {
    if(typeof(req.session.user) == 'undefined' || req.session.user == null)
    {
      models.user.create({username: "christian", password: "123", admin : true})
        .then((user) => {
          res.status(200).end(user.datavalues);
        })
        .catch(err => {
          res.status(500).end(JSON.stringify(err))
        });
    }
    else
    {
      res.status(401).end("No permission while logged in");
    }
})

module.exports = router;
