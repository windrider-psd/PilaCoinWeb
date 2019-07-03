var express = require('express');
var router = express.Router();
let models = require('./../model/DBModels')
let bcrypt = require('bcrypt')
let sanitizer = require('sanitizer')

router.post('/login', (req, res, next) => {
  /**
   * @type {{username : String, password : String}}
   */
  let params = req.body

  if(!(params.username && params.password))
  {
    res.status(400).end("Invalid parameters.")
  }
  else
  {
    params.username = sanitizer.sanitize(params.username)

    models.user.findOne({where : {username : params.username}})
      .then((user) => {
        if(!user)
        {
          res.status(400).end("Invalid username or password")
        }
        else
        {
          bcrypt.compare(params.password, user.password, (err, equals) => {
            if(err)
            {
              res.status(500).end("Error while authenticating user")
            }
            else if(equals)
            {

              req.session.regenerate(err => {

                if(err)
                {
                  res.status(500).end("Error while authenticating user")
                }
                else
                {
                  delete user.dataValues.password
                  req.session.user = user.dataValues
                  req.session.save(err => {
                    if(err)
                    {
                      res.status(500).end("Error while authenticating user")
                    }
                    else
                    {
                      res.status(200).json(user.dataValues)
                    }
                  })
                  
                }
              })
            }
            else
            {
              res.status(400).end("Invalid username or password")
            }
          })
        }
      })
  }
})

router.delete('/login', (req, res, next) => {
  req.session.regenerate(err => {
    if(err)
    {
      res.status(200).end("Error while logging out")
    }
    else
    {
      res.status(200).end("")
    }
  })
})

router.use((req, res, next) => {
  
  if (typeof (req.session.user) != 'undefined' && req.session.user != null) {
    next()
  } else {
    res.status(401).end("No session.");
  }
})


router.get("/session-data", (req, res, next) => {
  res.status(200).json(req.session)
})

router.use((req, res, next) => {
  if (req.session.user.admin == true) {
    next()
  } else {
    res.status(401).end("No permissions.");
  }
})


router.post('/user', (req, res, next) => {
  /**
   * @type {{username : String, password : String, admin : Boolean}}
   */
  let params = req.body

  if(!(params.username && params.password && params.admin == null))
  {
    res.status(400).end("Invalid parameters")
    return
  }

  models.user.findOne({
      where: {
        username: params.username
      }
    })
    .then((user) => {
      if (user) {
        res.status(400).end("Username already exists.")
      } else {
        bcrypt.hash(params.password, 9, (err, encryptedPassword) => {
          if (err) {
            res.status(500).end("Error while encrypting password")
          } else {
            models.user.create({
                username: sanitizer.sanitize(params.username),
                password: encryptedPassword,
                admin: params.admin
              })
              .then((createdUser) => {
                res.status(200).json(createdUser.dataValues)
              })
              .catch((err) => {
                res.status(500).end("Error while creating user.");
              })
          }
        })
      }
    }).catch(err => {
      res.status(500).end("Error while creating user.");
    })

})



module.exports = router;