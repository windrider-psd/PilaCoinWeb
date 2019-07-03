let createError = require('http-errors')
let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let helmet = require('helmet')
let DDDoS = require('dddos')
let webpack = require('webpack');
let webpackConfig = require('./webpack.config');
let compiler = webpack(webpackConfig);
let yargs = require('yargs').argv
let config = require('./app.config')
let {URL} = require('url')

let ip = require('ip')

module.exports = function CriarApp(sessao)
{
  let app = express()

  // view engine setup
  app.set('views', path.join(__dirname, 'dist'))
  app.set('view engine', 'pug')
  app.use(helmet())
  app.use(new DDDoS({
    maxWeight: 100
  }).express('ip', 'path'))
 
  
 
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'dist')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(logger('dev'))
  app.use(sessao)
  app.use('/', require('./routes/pages'))

  app.use((req, res, next) => {
    console.log(req.headers.referer)
    if(typeof(req.headers.referer) != 'undefined')
    {
      let url = new URL(req.headers.referer)
      let validPort = (config.web.port == "80" && url.port == "") || url.port == config.web.port
      let validHost = (url.host == config.web.host)
      let validIP = (url.host == ip.address() || url.host == "127.0.0.1")
      if(validPort && (validHost || validIP))
      {
        next()
      }
      else
      {
        res.status(400).end("Invalid request.")
      }
    }
    else
    {
      res.status(400).end("Invalid request.")
    }
  })

  app.use('/users/', require('./routes/users'))
  

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  })


  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.json(err)
  });
  app.locals.enderecoIP = require('ip').address()
  console.log(`Mode: ${config.mode}`)
  if(config.mode == 'development' && !yargs.nowebpack)
  {
    app.use(require("webpack-dev-middleware")(compiler, {
      publicPath: __dirname + '/dist/', writeToDisk : true
    }));
  
    app.use(require("webpack-hot-middleware")(compiler));
  }

  return app
}