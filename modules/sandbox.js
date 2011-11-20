exports.sandbox = function(obj){
  var ctx = Packages.org.mozilla.javascript.Context.enter();
  var scope = ctx.initStandardObjects();
  for(var key in obj){
    org.mozilla.javascript.ScriptableObject.putProperty(scope, key, obj[key]);
  }

  return {
    eval: function(string, options){
      var name = options.name || '';
      return ctx.evaluateString(scope, string, name, 0, null);
    },
    get: function(key){
      return org.mozilla.javascript.ScriptableObject.getProperty(scope, key);
    },
    set: function(key, value){
      org.mozilla.javascript.ScriptableObject.putProperty(scope, key, value);
    }
  }
  return scope;
}

