var streams = require('streams');

exports.fileLoader = function(){
  return {
    loadFn: function(lib, compilers){
      for(var ext in compilers){
        for(var index in require.paths){
          var f = new java.io.File(require.paths[index], lib + '.' + ext);
          if(f.exists()){
            return function(){ return compilers[ext](streams.toString(java.io.FileInputStream(f.path))); };
          }else{
            continue;
          }
        }
      }
      return false;
    }
  }
}

