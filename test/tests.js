var assert = require("assert"),
_ = require("underscore");
cargar = require(__dirname+"/../lib/lector.js");

// si config.nombre = "config" tiene 5 campos: nombre, servidor, index, presentacion y error
// en otro caso comprobar que solo tiene alguno de los nombres de las paginas y tiene 4 campos:
// nombre, plantilla, contenido, datos
describe('Lector', function(){
  describe('Carga de archivos JSON', function(){
    it('Número de campos de configuracion', function(){
      var config = cargar(__dirname+"/../config/config.json");
      assert.equal(_.size(config), 5);
    });
    // Añadir también para campos correctos
  });
});




//TESTS DE VERSIÓN ANTERIOR, COMENTADOS HASTA QUE LOS REVISE

/*
// var should = require('should');

var request = require('supertest');

// hay que arrancar el servidor antes. Más adelante probaremos esto http://51elliot.blogspot.com.es/2013/08/testing-expressjs-rest-api-with-mocha.html

var server=require(__dirname + '/../app.js');
var port = Number(process.env.PORT || 3000);
request=request("http://localhost:"+port);

describe('Web', function(){

it('Debería devolver la raíz', function(){
request.get("/")
.expect(200)
.end(function(err,res) {
if (err) {
throw err ;
}
});
});

it('Debería devolver página personal', function(){
request.get("/personal.html")
.expect(200)
.end(function(err,res) {
if (err) {
throw err ;
}
});
});

});
*/
