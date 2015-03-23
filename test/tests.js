var assert = require("assert"),
_ = require("underscore"),
should = require('should'),
request = require('supertest'),
existe = require(__dirname+"/../lib/existe.js"),
cargar = require(__dirname+"/../lib/lector.js"),
app = require(__dirname+"/../app.js");
acceso = cargar(__dirname+"/../test/acceso.json");

try{
  describe('Comprobar existencia de archivos JSON de datos', function(){
    _.each(acceso.archivos, function(valor) {
      it('Archivo \"'+valor+'\" existe', function(){
        assert.equal(existe(__dirname+"/../config/"+valor), true);
      });
    });
  });

  describe('Test de carga y formato de JSONs', function(){
    describe('Archivo de configuración', function(){
      var config = cargar(__dirname+"/../config/config.json");
      var arrayConfig = _.toArray(config);
      var nombresConfig = _.keys(config);
      var nombresIndex = _.keys(arrayConfig[3]);
      var nombresPresentacion = _.keys(arrayConfig[4]);
      var nombresError = _.keys(arrayConfig[5]);
      var tamaEnlaces = _.size(arrayConfig[2].enlaces);

      describe('Carga de archivo', function(){
        it('Cargado', function(){
          assert(config, "Cargado archivo de configuración");
        });
      });

      describe('Formato de archivo', function(){
        it('Número de campos: 6', function(){
          assert.equal(_.size(config), 6);
        });

        describe('Campos obligatorios', function(){
          it('nombre', function(){
            assert.equal(nombresConfig[0], "nombre");
          });
          it('servidor', function(){
            assert.equal(nombresConfig[1], "servidor");
          });
          it('puerto', function(){
            assert.equal(nombresConfig[2], "puerto");
          });

          describe('index: [nombre, plantilla, enlaces: [nombre, href, id]]', function(){
            it('index', function(){
              assert.equal(nombresConfig[3], "index");
            });
            it('[nombre, plantilla, enlaces]', function(){
              assert.equal(nombresIndex[0], "nombre");
              assert.equal(nombresIndex[1], "plantilla");
              assert.equal(nombresIndex[2], "enlaces");
            });
            it('[enlaces: [nombre, href, id]]', function(){
              for(i=0; i<tamaEnlaces; ++i){
                nombresEnlaces = _.keys(arrayConfig[2].enlaces[i]);
                assert.equal(nombresEnlaces[0], "nombre");
                assert.equal(nombresEnlaces[1], "href");
                assert.equal(nombresEnlaces[2], "id");
              }
            });
          });

          describe('presentacion: [titulo, plantilla]', function(){
            it('presentacion', function(){
              assert.equal(nombresConfig[4], "presentacion");
            });
            it('[titulo, plantilla]', function(){
              assert.equal(nombresPresentacion[0], "titulo");
              assert.equal(nombresPresentacion[1], "plantilla");
            });
          });

          describe('error: [titulo, texto]', function(){
            it('error', function(){
              assert.equal(nombresConfig[5], "error");
            });
            it('[titulo, texto]', function(){
              assert.equal(nombresError[0], "titulo");
              assert.equal(nombresError[1], "texto");
            });
          });
        });

        describe('Valores obligatorios de campos', function(){
          it('nombre: \"config\"', function(){
            assert.equal(arrayConfig[0], "config");
          });
          it('servidor: \"http://opendata.ugr.es/\"', function(){
            assert.equal(arrayConfig[1], "http://opendata.ugr.es/");
          });

          describe('index:', function(){
            it('nombre: \"Inicio\"', function(){
              assert.equal(arrayConfig[3].nombre, "Inicio");
            });
            it('plantilla: \"index\"', function(){
              assert.equal(arrayConfig[3].plantilla, "index");
            });
          });

          describe('presentacion:', function(){
            it('titulo: \"Presentación\"', function(){
              assert.equal(arrayConfig[4].titulo, "Presentación");
            });
            it('plantilla: \"presentacion\"', function(){
              assert.equal(arrayConfig[4].plantilla, "presentacion");
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
            var arraySeccion = _.toArray(seccion);
            var nombresSeccion = _.keys(seccion);
            var tamaContenido = _.size(arraySeccion[2]);
            var tamaDatos = _.size(arraySeccion[3]);

            describe('Carga de archivo', function(){
              it('Cargado', function(){
                assert(seccion, "Cargado");
              });
            });

            describe('Formato de archivo', function(){
              it('Número de campos: 4', function(){
                assert.equal(_.size(seccion), 4);
              });
            });

            describe('Campos obligatorios', function(){
              it('nombre', function(){
                assert.equal(nombresSeccion[0], "nombre");
              });
              it('plantilla', function(){
                assert.equal(nombresSeccion[1], "plantilla");
              });
              describe('contenido: [encabezado, texto]', function(){
                it('contenido', function(){
                  assert.equal(nombresSeccion[2], "contenido");
                });
                it('[encabeza, texto]', function(){
                  for(i=0; i<tamaContenido; ++i){
                    var nombresContenido = _.keys(arraySeccion[2][i]);
                    assert.equal(nombresContenido[0], "encabezado");
                    assert.equal(nombresContenido[1], "texto");
                  }
                });
              });
              describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
                it('datos', function(){
                  assert.equal(nombresSeccion[3], "datos");
                });
                it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                  for(i=0; i<tamaContenido; ++i){
                    var nombresDatos = _.keys(arraySeccion[3][i]);
                    assert.equal(nombresDatos[0], "dataset");
                    assert.equal(nombresDatos[1], "id_dataset");
                    assert.equal(nombresDatos[2], "nombre");
                    assert.equal(nombresDatos[3], "vista");
                    assert.equal(nombresDatos[4], "url");
                    assert.equal(nombresDatos[5], "descarga");
                  }
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
  });
}
catch(e){
  console.log("Alguno de los archivos JSON de datos necesario no se encuentra. No es posible "+
  "finalizar todos los test.");
}
