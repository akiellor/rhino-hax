exports.buffered = -> 
  buffer = new java.lang.StringBuilder()

  flush = ->
    java.lang.System.out.print(buffer.toString())
    buffer = new java.lang.StringBuilder()

  return {
    log: (msg) -> buffer.append(msg)
    flush: flush
  }


