exports.logger = function(name, truncateNewlines){
  var _truncateNewlines = truncateNewlines || false;
  var _logger = org.apache.log4j.Logger.getLogger(name);
  
  var processMessage = function(msg){
    if(_truncateNewlines){
      return msg.replace(/\n$/, '');
    }else{
      return msg;
    }
  }

  return {
    log: function(msg){ _logger.log(org.apache.log4j.Level.INFO, processMessage(msg.toString())); },
    fatal: function(msg){ _logger.info(processMessage(msg.toString())); },
    info: function(msg){ _logger.info(processMessage(msg.toString())); },
    debug: function(msg){ _logger.debug(processMessage(msg.toString())); }
  }
}
