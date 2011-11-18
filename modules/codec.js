function toHex(byteArray){
  var hexString = java.lang.StringBuilder();
  for(var i = 0; i < byteArray.length; i++){
    var hex = java.lang.Integer.toHexString(0xFF & byteArray[i]);
    if (hex.length() == 1) {
      hexString.append('0');
    }
    hexString.append(hex);
  }
  return hexString.toString();
}

exports.md5 = function(string){
  var digest = java.security.MessageDigest.getInstance("MD5");
  digest.update(new java.lang.String(string).getBytes());
  return String(toHex(digest.digest()));
}

