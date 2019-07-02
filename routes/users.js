var express = require('express');
var router = express.Router();
let models = require('./../model/DBModels')
let bcrypt = require('bcrypt')
let sanitizer = require('sanitizer')

router.post('/user', (req, res, next) => {
    if(typeof(req.session.user) == 'undefined' || req.session.user == null)
    {

      /**
       * @type {{username : String, password : String, admin : Boolean}}
       */
      let params = req.body
      models.user.findOne({where : {username : params.username}})
        .then((user) => {
          if(user)
          {
            res.status(400).end("Username already exists.")
          }
          else
          {
            bcrypt.hash(params.password, 9, (err, encryptedPassword) => {
              if(err)
              {
                res.status(500).end("Error while encrypting password")
              }
              else
              {
                models.user.create({username: sanitizer.sanitize(params.username), password : encryptedPassword, admin : params.admin})
                  .then((createdUser) => {
                    res.status(200).json(createdUser.dataValues)
                  })
              }
            })
          }
        }).catch(err => {
          res.status(500).end("Error while creating user.");
        })
    }
    else
    {
      res.status(401).end("No permission while logged in");
    }
})

module.exports = router;
