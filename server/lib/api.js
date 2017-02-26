var express = require("express");
var utils = require('./utils');
var router = new express.Router();




// Devuelve un objeto que representa la definicion de los sprites
router.get("/spriteDefinitionsLoader", function(req, res) {
  var spriteDefinition = {};

  utils.readFilesFromFolder('spriteDefinitions/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      spriteDefinition[key.split(".")[0]] = _jsonToSpriteDefinition(value);
    });

    res.send(spriteDefinition);
  }, function(err) {
    res.send(err);
    throw err;
  });

  function _jsonToSpriteDefinition(json) {
    return JSON.parse(json);
  }
});

module.exports = router;
