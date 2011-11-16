exports.buffered = function(){ 
  var buffer = new java.lang.StringBuilder();

  flush = function(){
    java.lang.System.out.print(buffer.toString());
    buffer = new java.lang.StringBuilder();
  }

  return {
    log: function(msg) { buffer.append(msg) },
    flush: flush
  }
}

exports.logger = function(){
  return {
    log: function(msg){ java.lang.System.out.print(msg.toString()); },
    debug: function(msg) { if(java.lang.System.getenv().get("DEBUG")) { this.log(msg); } }
  }
}
