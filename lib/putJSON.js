var fs = require('fs');

var escribir = function() {
  require(__dirname + '/getJSON').initialize(function(err, body) {
    prueba = JSON.stringify(body.result, null, 4);

    fs.writeFileSync(__dirname + '/../config/prueba.json', prueba);
  });
};

module.exports = escribir;