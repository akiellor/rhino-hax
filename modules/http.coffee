_ = require('underscore')._
jetty = org.eclipse.jetty;

servlet = (fn) ->
  return new javax.servlet.http.HttpServlet({
    service: (req, res) ->
      [status, headers, body] = fn({method: req.getMethod(), uri: req.getRequestURI()})
      res.setStatus(status)
      _.each headers, (header, value) ->
        res.addHeader(header, value)
      _.each body, (chunk) ->
        res.getWriter().print(chunk)
  })

contextHandler = (app) -> 
  context = jetty.servlet.ServletContextHandler(jetty.servlet.ServletContextHandler.SESSIONS)
  context.addServlet(jetty.servlet.ServletHolder(servlet(app)), '/')
  context

defaults = ->
  return {
    port: 8080
  }

exports.server = (configurer = ->) ->
  config = defaults()
  configurer.apply(config)
  server = jetty.server.Server(config.port)
  return {
    run: (app) ->
      server.handler = contextHandler(app)
      server.start()
      server.join()
  }

