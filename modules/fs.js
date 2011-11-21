function list(file){
  var file = new java.io.File(file)
  if(file.isFile() && file.exists()){
    return [file.getPath()];
  } else if(file.isDirectory()){
    var files = file.listFiles();
    var allFiles = [];
    for(var i = 0; i < files.length; i++){
      var file = files[i];
      allFiles = allFiles.concat(list(file.getPath()));
    }
    return allFiles;
  }
}

exports.list = list

