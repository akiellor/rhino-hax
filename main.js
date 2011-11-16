require.paths.unshift("modules");
require.paths.unshift(".");

var polyglot = require('polyglot').polyglot();
polyglot.register('coffee', polyglot.require('https://raw.github.com/akiellor/coffee-script/master/extras/coffee-script.js').CoffeeScript.compile);
require = polyglot.require;

require('http').server(function(){
  this.port = 8080;
}).run(require('app').app);
