/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2015 Germán Martínez Maldonado

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


var _ = require("underscore"),
should = require("should"),
request = require("supertest"),
existe = require(__dirname+"/../lib/existe"),
cargar = require(__dirname+"/../lib/cargar"),
app = require(__dirname+"/../app.js");
acceso = cargar(__dirname+"/../test/acceso.json");

describe('Comprobar existencia de archivos JSON de datos', function(){
  _.each(acceso.archivos, function(valor) {
    it('Archivo \"'+valor+'\" existe', function(){
      var cargaArchivo = existe(__dirname+"/../config/"+valor);
      cargaArchivo.should.be.exactly(true);
    });
  });
});

describe('Test de carga y formato de JSONs', function(){
  describe('Archivo de configuración', function(){
    var config = cargar(__dirname+"/../config/config.json");

    describe('Carga de archivo', function(){
      it('Cargado', function(){
        config.should.not.be.null;
      });
    });

    describe('Formato de archivo', function(){
      it('Número de campos: 6', function(){
        var tamaConfig = _.size(config);
        tamaConfig.should.be.exactly(6);
      });

      describe('Campos obligatorios', function(){
        it('nombre', function(){
          config.should.have.property("nombre");
        });
        it('servidor', function(){
          config.should.have.property("servidor");
        });
        it('puerto', function(){
          config.should.have.property("puerto");
        });

        describe('index: [nombre, plantilla, enlaces: [nombre, href, id]]', function(){
          it('index', function(){
            config.should.have.property("index");
          });
          it('[nombre, plantilla, enlaces]', function(){
            config.index.should.have.property("nombre");
            config.index.should.have.property("plantilla");
            config.index.should.have.property("enlaces");
          });
          it('[enlaces: [nombre, href, id]]', function(){
            _.each(config.index.enlaces, function(enlace) {
              enlace.should.have.property("nombre");
              enlace.should.have.property("href");
              enlace.should.have.property("id");
            });
          });
        });

        describe('presentacion: [titulo, plantilla]', function(){
          it('presentacion', function(){
            config.should.have.property("presentacion");
          });
          it('[titulo, plantilla]', function(){
            config.presentacion.should.have.property("titulo");
            config.presentacion.should.have.property("plantilla");
          });
        });

        describe('error: [titulo, texto]', function(){
          it('error', function(){
            config.should.have.property("error");
          });
          it('[titulo, texto]', function(){
            config.error.should.have.property("titulo");
            config.error.should.have.property("texto");
          });
        });
      });

      describe('Valores obligatorios de campos', function(){
        it('nombre: \"config\"', function(){
          config.nombre.should.be.exactly("config");
        });
        it('servidor: \"http://opendata.ugr.es/\"', function(){
          config.servidor.should.be.exactly("http://opendata.ugr.es/");
        });

        describe('index:', function(){
          it('nombre: \"Inicio\"', function(){
            config.index.nombre.should.be.exactly("Inicio");
          });
          it('plantilla: \"index\"', function(){
            config.index.plantilla.should.be.exactly("index");
          });
        });

        describe('presentacion:', function(){
          it('titulo: \"Presentación\"', function(){
            config.presentacion.titulo.should.be.exactly("Presentación");
          });
          it('plantilla: \"presentacion\"', function(){
            config.presentacion.plantilla.should.be.exactly("presentacion");
          });
        });

      });
    });
  });

  _.each(acceso.categorias, function(entrada) {
    describe(entrada.descripcion, function(){
      _.each(entrada.secciones, function(valor) {
        describe(valor.descripcion, function(){
          var seccion = cargar(__dirname+"/../config/"+valor.archivo);

          describe('Carga de archivo', function(){
            it('Cargado', function(){
              seccion.should.not.be.null;
            });
          });

          describe('Formato de archivo', function(){
            it('Número de campos: 4', function(){
              var tamaSeccion = _.size(seccion);
              tamaSeccion.should.be.exactly(4);
            });
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              seccion.should.have.property("nombre");
            });
            it('plantilla', function(){
              seccion.should.have.property("plantilla");
            });

            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                seccion.should.have.property("contenido");
              });
              it('[encabeza, texto]', function(){
                _.each(seccion.contenido, function(valor) {
                  valor.should.have.property("encabezado");
                  valor.should.have.property("texto");
                });
              });
            });

            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                seccion.should.have.property("datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                _.each(seccion.datos, function(dato) {
                  dato.should.have.property("dataset");
                  dato.should.have.property("id_dataset");
                  dato.should.have.property("nombre");
                  dato.should.have.property("vista");
                  dato.should.have.property("url");
                  dato.should.have.property("descarga");
                });
              });
            });
          });

        });
      });
    });
  });
});

describe('Prueba de acceso', function(){
  _.each(acceso.elemento, function(valor) {
    it(valor.nombre, function(done){
      request(app)
      .get(valor.ruta)
      .expect(200)
      .end(function(err, res){
        if (err){
          throw err;
        }
        done();
      });
    });
  });
  it("Error", function(done){
    request(app)
    .get("/foo")
    .expect(404)
    .end(function(err, res){
      if (err){
        throw err;
      }
      done();
    });
  });
});
