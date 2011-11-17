exports.trust = {
  easy: function(){
    return javax.net.ssl.X509TrustManager({
      checkClientTrusted: function(){},
      getAcceptedIssuers: function(){return null;}
    })
  }
}


