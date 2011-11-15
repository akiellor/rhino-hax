dsl = ->
  handlers = []
  
  get = (match, callback) ->
    handlers.push({method: "GET", match: match, callback: callback})

  post = (match, callback) ->
    handlers.push({method: "POST", match: match, callback: callback})

  return {
    get: get
    post: post
    handlers: -> handlers
  }

app = (handlers) ->
  lookup = (env) ->
    return (handler for handler in handlers when env.uri.match(handler.match) and env.method.equals(handler.method))[0]

  return (env) ->
    handler = lookup(env)
    if handler?
      [200, [], [handler.callback(env)]]
    else
      [404, [], []]

exports.define = (fn) ->
  scope = dsl()
  fn.apply(scope)
  return app(scope.handlers())
 
