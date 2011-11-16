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
  cacheConfig.setMaxObjectSizeBytes(10485760);
  
  var defaultClient = new client.DefaultHttpClient(new org.apache.http.impl.conn.SingleClientConnManager(sr));
  var cachingClient = new cache.CachingHttpClient(defaultClient, cacheStorage,cacheConfig);
  var log = require('log').logger("URL Loader");

  return {
    loadFn: function(lib){
      try{
        var httpget = new org.apache.http.client.methods.HttpGet(lib);
        var localContext = new org.apache.http.protocol.BasicHttpContext();
        var response = cachingClient.execute(httpget, localContext);

        var responseStatus = localContext.getAttribute(cache.CachingHttpClient.CACHE_RESPONSE_STATUS);
        log.debug(responseStatus.toString() + ": " + lib);
        return function() { return streams.toString(response.getEntity().getContent()) };
      }catch(e){
        log.debug(e);
        return false;
      }
      return false; 
    }
  }
}

