var client = Packages.org.apache.http.impl.client;
var cache = client.cache;
var Scheme = org.apache.http.conn.scheme.Scheme;
var PlainSocketFactory = org.apache.http.conn.scheme.PlainSocketFactory;
var SSLSocketFactory = org.apache.http.conn.ssl.SSLSocketFactory;

var streams = {
  toString: function(is){
    var stream = new java.io.BufferedReader(new java.io.InputStreamReader(is));

    var line, output = '';
    while ((line = stream.readLine()) != null){
      output = output + line + '\n';
    }
    return output;
  }
}

var logger = function(objectName){
  return {
    debug: function(msg){
      if(java.lang.System.getenv().get("DEBUG")){
        java.lang.System.out.println(objectName + ": " + msg.toString());
      }
    }
  }
}

var easyTrustManager = new javax.net.ssl.X509TrustManager({
  checkClientTrusted: function(){},
  getAcceptedIssuers: function(){return null;}
});

var sslcontext = javax.net.ssl.SSLContext.getInstance("SSL")
sslcontext.init(null, [easyTrustManager], null);

var sf = new SSLSocketFactory(sslcontext, SSLSocketFactory.STRICT_HOSTNAME_VERIFIER);

var http = new Scheme("http", 80, PlainSocketFactory.getSocketFactory());
var https = new Scheme("https", 443, sf);

var sr = new org.apache.http.conn.scheme.SchemeRegistry();
sr.register(http);
sr.register(https);

var cacheStorage = new org.apache.http.impl.client.cache.memcached.MemcachedHttpCacheStorage(new java.net.InetSocketAddress("localhost", 11211));


exports.urlLoader = function(){
  var cacheConfig = cache.CacheConfig();  
  cacheConfig.setMaxCacheEntries(1000);
  cacheConfig.setMaxObjectSizeBytes(8192);

  var cachingClient = new cache.CachingHttpClient(new client.DefaultHttpClient(new org.apache.http.impl.conn.SingleClientConnManager(sr)), cacheStorage,cacheConfig);
  var log = logger("URL Loader");
  return {
    loadFn: function(lib){
      try{
        var httpget = new org.apache.http.client.methods.HttpGet(lib);
        var localContext = new org.apache.http.protocol.BasicHttpContext();
        var response = cachingClient.execute(httpget, localContext);
        log.debug("Loaded " + lib);
        return function() { return streams.toString(response.getEntity().getContent()) };
      }catch(e){
        return false;
      }
      return false; 
    }
  }
}

