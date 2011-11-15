scheduler = java.util.concurrent.Executors.newScheduledThreadPool(1)
futures = []

exports.setTimeout = (fn, delay) ->
  id = futures.length
  runnable = java.lang.Runnable({ run: fn })
  futures[id] = scheduler.schedule(runnable, delay, java.util.concurrent.TimeUnit.SECONDS)
  return id

exports.clearTimeout = (id) ->
  ids[id].cancel()
  delete ids[id]

exports.setInterval = (fn, delay) ->
  id = futures.length; 
  runnable = java.lang.Runnable({ run: fn })
  futures[id] = scheduler.schedule(ids[id], delay, delay, java.util.concurrent.TimeUnit.SECONDS)
  return id

exports.clearInterval = exports.clearTimeout

