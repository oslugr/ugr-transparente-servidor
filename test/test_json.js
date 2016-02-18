/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
    Copyright (C) 2015 Germán Martínez Maldonado
	Copyright (C) 2016 Andrés Ortiz Corrales

	This file is part of UGR Transparente.

	UGR Transparente is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	UGR Transparente is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var assert = require('chai').assert;
var _ = require("underscore");

var config=require('./config.js');

describe('Archivos de configuración', function() {
    //Compueba que existen los archivos JSON
    it("Carga Archivos JSON",function(){
        var existe=require('../lib/existe');
        var cargar=require('../lib/cargar');
        _.each(config.archivosJSON, function(valor) {
            assert.ok(existe('./config/'+valor));
            var file=cargar('./config/'+valor);
            assert.ok(file);
        });
    });
    it("Archivo de configuración",function(){
        var config2=require('../config/config');
        assert.ok(config2);
        assert.ok(config2.puerto);
        assert.ok(config2.servidor);
    });  
});

/*
describe('Prueba de acceso', function() {
  _.each(acceso.elemento, function(valor) {
    it(valor.nombre, function(done) {
      this.timeout(4000);
      request(app)
        .get(valor.ruta)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
  it("Error", function(done) {
    request(app)
      .get("/foo")
      .expect(404)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});*/
