var streams = require('streams');
var codec = require('codec');
var log = require('log').logger("Http Client");

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

function deserialiseEntry(filename){
  var entityDeserializer = new org.apache.http.impl.entity.EntityDeserializer(new org.apache.http.impl.entity.LaxContentLengthStrategy());
  var fis = java.io.FileInputStream(filename);
  var sibm = org.apache.http.impl.io.AbstractSessionInputBuffer({
    publicInit: function(is){ this.init(is, 16, org.apache.http.params.BasicHttpParams()) }
  });
  sibm.publicInit(fis);
  var responseParser = org.apache.http.impl.io.HttpResponseParser(sibm,
      org.apache.http.message.BasicLineParser.DEFAULT,
      org.apache.http.impl.DefaultHttpResponseFactory(),
      org.apache.http.params.BasicHttpParams());

  var response = responseParser.parse();

  response.setEntity(entityDeserializer.deserialize(sibm,response));
  var entity = response.getEntity();
  var resource = org.apache.http.client.cache.Resource({
    dispose: function(){},
    getInputStream: function(){ return entity.getContent(); },
    length: function(){ return entity.getContentLength(); }
  });
  var responseDate = new Date(response.getFirstHeader("Date").getValue());
  return org.apache.http.client.cache.HttpCacheEntry(responseDate, responseDate, response.getStatusLine(), response.getAllHeaders(), resource);
}

exports.libraryCache = function(path){
  java.io.File(path).mkdir();
  var map = java.util.Properties();
  var mapFile = java.io.File(path, "lock");
  if(mapFile.exists()){
    map.load(java.io.FileInputStream(mapFile));
  }

  return org.apache.http.client.cache.HttpCacheStorage({
    getEntry: function(key){
      var hash = map.get(key);
      if(hash){
        return deserialiseEntry(java.io.File(path, hash).getPath());
      }
      return null;
    },
    putEntry: function(key, entry){
      var serializedEntry = serializeEntry(entry);
      var hash = codec.md5(serializedEntry);
      var writer = new java.io.BufferedWriter(new java.io.FileWriter(new java.io.File(path, hash)));
      writer.write(serializedEntry);
      writer.close();

      map.put(key, hash);
      map.store(java.io.FileOutputStream(mapFile), null);
    },
    removeEntry: function(key){
    },
    updateEntry: function(key, callback){
      putEntry(key, callback.update(getEntry(key)));
    }
  });
}

