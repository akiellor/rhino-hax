exports.toString = function(is){
  var stream = new java.io.BufferedReader(new java.io.InputStreamReader(is));

  var line, output = '';
  while ((line = stream.readLine()) != null){
    output = output + line + '\n';
  }
  return output;
}

