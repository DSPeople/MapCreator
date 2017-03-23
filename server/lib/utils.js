var fs = require('fs');

module.exports = {
  objForEach: objForEach,
  readFilesFromFolder: readFilesFromFolder
};

function objForEach(object, callbackFn) {
  for (var key in object) {
    // skip loop if the property is from prototype
    if (!object.hasOwnProperty(key)) continue;

    callbackFn(object[key], key);
  }
}

function readFilesFromFolder(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    var dataObj = {};
    filenames.forEach(function(filename) {
      dataObj[filename] = fs.readFileSync(dirname + filename, 'utf-8');
    });

    onFileContent(dataObj);
  });
}
