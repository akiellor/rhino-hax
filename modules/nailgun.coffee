http = require('http')
streams = require('streams')
sandbox = require('sandbox')

nailgunApp = require('sinatra').define ->
  this.post /^\/$/, (env) ->
    out = java.io.ByteArrayOutputStream()
    java.lang.System.setOut(java.io.PrintStream(out))
    scope = sandbox.sandbox()
    scope.set("require", require('polyglot').polyglot().require)
    scope.eval(streams.toString(env.request.getInputStream()), {name: 'repl'});
    return java.lang.String(out.toByteArray())


exports.run = -> require('http').server(-> this.port = 8080).run(nailgunApp)

