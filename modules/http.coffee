jetty = org.eclipse.jetty;

servlet = (fn) ->
  return new javax.servlet.http.HttpServlet({
    service: (req, res) ->
      [status, headers, body] = fn({method: req.getMethod(), uri: req.getRequestURI(), request: req, response: res})
      res.setStatus(status)
      res.addHeader(header, value) for header, value in headers
      res.getWriter().print(chunk) for chunk in body
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

