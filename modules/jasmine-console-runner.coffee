jasmineGlobals = require('jasmine', require('timers'))
jasmine = jasmineGlobals.jasmine
logger = require('log').buffered()
fs = require('fs')
require('jasmine-console-reporter', jasmineGlobals)

exports.console = (config) ->
  donebacks = [-> logger.flush()]
  resolve = (runner) -> doneback(runner) for doneback in donebacks
  
  return {
    done: (doneback) -> donebacks.push(doneback)
    run: ->
      require(spec, jasmineGlobals) for spec in fs.list(config.specDir)

      jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(logger.log, (-> resolve(jasmine.getEnv().currentRunner())), true))

      jasmine.getEnv().execute()
  }

