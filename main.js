require.paths.unshift("modules");
require.paths.unshift(".");

var polyglot = require('polyglot').polyglot();
polyglot.register('coffee', require('coffee-script').CoffeeScript.compile);
require = polyglot.require;

require('http').server(function(){
  this.port = 8080;
}).run(require('app').app);
