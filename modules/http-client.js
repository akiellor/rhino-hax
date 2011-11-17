var streams = require('streams');

function serializeHeaders(headers){
  var result = '';
  for(var i = 0; i < headers.length; i++){
    result = result + headers[i].toString() + "\n";
  }
  return result;
}

function serializeEntry(entry){
  return entry.getStatusLine().toString() + "\n" + serializeHeaders(entry.getAllHeaders()) + "\n" + streams.toString(entry.getResource().getInputStream());
}

exports.libraryCache = function(path){
  function hash(string){
    var digest = java.security.MessageDigest.getInstance("MD5");
    digest.update(new java.lang.String(string).getBytes());
    return String(new java.lang.String(digest.digest()));
  }

  return org.apache.http.client.cache.HttpCacheStorage({
    getEntry: function(key){
      return null;
    },
    putEntry: function(key, entry){
      var serializedEntry = serializeEntry(entry);
      var writer = new java.io.BufferedWriter(new java.io.FileWriter(new java.io.File(path, hash(serializedEntry))));
      writer.write(serializedEntry);
      writer.close();
    },
    removeEntry: function(key){
    },
    updateEntry: function(key, callback){
      putEntry(key, callback.update(getEntry(key)));
    }
  });
}

