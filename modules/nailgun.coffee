http = require('http')
streams = require('streams')

sandbox = ->
  ctx = Packages.org.mozilla.javascript.Context.enter();
  scope = ctx.initStandardObjects();
  org.mozilla.javascript.ScriptableObject.putProperty(scope, "exports", {})
  org.mozilla.javascript.ScriptableObject.putProperty(scope, "require", require('polyglot').polyglot().require)
  org.mozilla.javascript.ScriptableObject.putProperty(scope, "arguments", [])
  return scope;

nailgunApp = require('sinatra').define ->
  this.post /^\/$/, (env) ->
    out = java.io.ByteArrayOutputStream()
    java.lang.System.setOut(java.io.PrintStream(out))
    ctx = Packages.org.mozilla.javascript.Context.enter()
    scope = sandbox()
    ctx.evaluateString(scope, streams.toString(env.request.getInputStream()), '', 0, null)
    return java.lang.String(out.toByteArray())


exports.run = -> require('http').server(-> this.port = 8080).run(nailgunApp)

