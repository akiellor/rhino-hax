list = (file) ->
  file = new java.io.File(file)
  if file.isFile() && file.exists()
    filePath = file.getPath()
    [filePath.substring(0, filePath.lastIndexOf('.'))]
  
  else if (file.isDirectory())
    files = file.listFiles()
    allFiles = []
    for file in files
      do (file) ->
        allFiles = allFiles.concat(list(file.getPath()))
    allFiles

exports.list = list

