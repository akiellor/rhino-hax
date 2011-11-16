jasmineGlobals = require('https://raw.github.com/pivotal/jasmine/v2.0.0.rc1/lib/jasmine-core/jasmine.js', require('timers'))
jasmine = jasmineGlobals.jasmine
logger = require('log').logger()
fs = require('fs')
require('https://raw.github.com/pivotal/jasmine/master/src/console/ConsoleReporter.js', jasmineGlobals)

exports.console = (config) ->
  donebacks = []
  resolve = (runner) -> doneback(runner) for doneback in donebacks
  
  return {
    done: (doneback) -> donebacks.push(doneback)
    run: ->
      require(spec.substring(0, spec.lastIndexOf('.')), jasmineGlobals) for spec in fs.list(config.specDir)

      jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(logger.log, (-> resolve(jasmine.getEnv().currentRunner())), true))

      jasmine.getEnv().execute()
  }

