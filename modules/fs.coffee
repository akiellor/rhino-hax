list = (file) ->
  file = new java.io.File(file)
  if file.isFile() && file.exists()
    [file.getPath()]
  
  else if (file.isDirectory())
    files = file.listFiles()
    allFiles = []
    for file in files
      do (file) ->
        allFiles = allFiles.concat(list(file.getPath()))
    allFiles

exports.list = list

