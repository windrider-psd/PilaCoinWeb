#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('pilacoinweb:server');
const http = require('http');
const yargs = require('yargs').argv
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const redis = require('redis').createClient({host : 'localhost', port : 6379});

const armazenadorSessao = new RedisStore({host : 'localhost', port : 6379, client : redis})
const sessaomiddleware = session({
  store : armazenadorSessao,
  resave: true,
  saveUninitialized : true, 
  secret : 'uijn4unip32nur324p23u'});

if(yargs.clearsessions)
{
  console.log("Eliminando todas as sessões");
  redis.flushdb();
}

var app = require('../app')(sessaomiddleware);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}