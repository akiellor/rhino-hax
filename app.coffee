exports.app = require('sinatra').define ->
  this.get /^\/ping$/, -> "pong"

  this.get /^\/foo$/, -> "bar"

  this.post /^\/ping$/, -> "POST: pong"
