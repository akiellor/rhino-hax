var urlLoader = require('module-url-loader').urlLoader;

var compilers = {'js': function(source){return source;}};

function register(ext, compile){
  compilers[ext] = compile;
}

var fileLoader = function(){
  return {
    loadFn: function(lib){
      for(var ext in compilers){
        for(var index in require.paths){
          var f = new java.io.File(require.paths[index], lib + '.' + ext);
          if(f.exists()){
            return function(){ return compilers[ext](readFile(f.path)); };
          }else{
            continue;
          }
        }
      }
      return false;
    }
  }
}

var loaders = [urlLoader(), fileLoader()];

function contents(lib){
  for(var i = 0; i < loaders.length; i++){
    var loadFn = loaders[i].loadFn(lib);
    if(loadFn){
      return loadFn();
    }
  }
  throw "Module not found: " + lib;
}

function sandbox(){
  var ctx = Packages.org.mozilla.javascript.Context.enter();
  var scope = ctx.initStandardObjects();
  org.mozilla.javascript.ScriptableObject.putProperty(scope, "exports", {});
  org.mozilla.javascript.ScriptableObject.putProperty(scope, "require", req);
  return scope;
}

function req(lib, globals){
  var ctx = Packages.org.mozilla.javascript.Context.enter();
  var scope = sandbox();
  for(var key in globals){
    org.mozilla.javascript.ScriptableObject.putProperty(scope, key, globals[key]);
  }
  ctx.evaluateString(scope, contents(lib), lib, 0, null);
  return org.mozilla.javascript.ScriptableObject.getProperty(scope, "exports");
}

exports.polyglot = function(){
  return {
    require: req,
    register: register
  }
}

