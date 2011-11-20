var log = require('log').logger('Polyglot')
var sandbox = require('sandbox');

var compilers = {'js': function(source){return source;}};

function register(ext, compile){
  compilers[ext] = compile;
}

var loaders = [require('module-url-loader').urlLoader(), require('module-file-loader').fileLoader()];

function contents(lib){
  for(var i = 0; i < loaders.length; i++){
    var loadFn = loaders[i].loadFn(lib, compilers);
    if(loadFn){
      return loadFn();
    }
  }
  throw "Module not found: " + lib;
}

function req(lib, globals){
  log.debug("REQUIRING: " + lib)
  var sb = sandbox.sandbox(globals);
  sb.set("exports", {});
  sb.set("require", req);
  sb.eval(contents(lib), {name: lib});
  return sb.get("exports");
}

req.paths = require.paths;

exports.polyglot = function(){
  return {
    require: req,
    register: register
  }
}

