var assert = require("assert"),
_ = require("underscore");
cargar = require(__dirname+"/../lib/lector.js");
existe = require(__dirname+"/../lib/existe.js");
error = false;

describe('Comprobar existencia de archivos JSON de datos', function(){
  it('Archivo \"config.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/config.json"), true);
  });
  it('Archivo \"personal.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/personal.json"), true);
  });
  it('Archivo \"infoEconomica.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/infoEconomica.json"), true);
  });
  it('Archivo \"servicios.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/servicios.json"), true);
  });
  it('Archivo \"ofertaDemanda.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/ofertaDemanda.json"), true);
  });
  it('Archivo \"claustro.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/claustro.json"), true);
  });
  it('Archivo \"estudiantes.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/estudiantes.json"), true);
  });
  it('Archivo \"mision.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/mision.json"), true);
  });
  it('Archivo \"planEstrategico.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/planEstrategico.json"), true);
  });
  it('Archivo \"gobierno.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/gobierno.json"), true);
  });
  it('Archivo \"estadisticas.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/estadisticas.json"), true);
  });
  it('Archivo \"normativaLegal.json\" existe', function(){
    assert.equal(existe(__dirname+"/../config/normativaLegal.json"), true);
  });
});

try{
  describe('Test de carga y formato de JSONs', function(){
    describe('Archivo de configuración', function(){
      var config = cargar(__dirname+"/../config/config.json");
      var arrayConfig = _.toArray(config);
      var nombresConfig = _.keys(config);
      var nombresIndex = _.keys(arrayConfig[2]);
      var nombresPresentacion = _.keys(arrayConfig[3]);
      var nombresError = _.keys(arrayConfig[4]);
      var tamaEnlaces = _.size(arrayConfig[2].enlaces);

      describe('Carga de archivo', function(){
        it('Cargado', function(){
          assert(config, "Cargado archivo de configuración");
        });
      });

      describe('Formato de archivo', function(){
        it('Número de campos: 5', function(){
          assert.equal(_.size(config), 5);
        });

        describe('Campos obligatorios', function(){
          it('nombre', function(){
            assert.equal(nombresConfig[0], "nombre");
          });
          it('servidor', function(){
            assert.equal(nombresConfig[1], "servidor");
          });

          describe('index: [nombre, plantilla, enlaces: [nombre, href, id]]', function(){
            it('index', function(){
              assert.equal(nombresConfig[2], "index");
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
              assert.equal(nombresConfig[3], "presentacion");
            });
            it('[titulo, plantilla]', function(){
              assert.equal(nombresPresentacion[0], "titulo");
              assert.equal(nombresPresentacion[1], "plantilla");
            });
          });

          describe('error: [titulo, texto]', function(){
            it('error', function(){
              assert.equal(nombresConfig[4], "error");
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
              assert.equal(arrayConfig[2].nombre, "Inicio");
            });
            it('plantilla: \"index\"', function(){
              assert.equal(arrayConfig[2].plantilla, "index");
            });
          });

          describe('presentacion:', function(){
            it('titulo: \"Presentación\"', function(){
              assert.equal(arrayConfig[3].titulo, "Presentación");
            });
            it('plantilla: \"presentacion\"', function(){
              assert.equal(arrayConfig[3].plantilla, "presentacion");
            });
          });

        });
      });
    });

    describe('Sección Administración', function(){
      describe('Datos de Personal', function(){
        var personal = cargar(__dirname+"/../config/personal.json");
        var arrayPersonal = _.toArray(personal);
        var nombresPersonal = _.keys(personal);
        var tamaContenido = _.size(arrayPersonal[2]);
        var tamaDatos = _.size(arrayPersonal[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(personal, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(personal), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresPersonal[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresPersonal[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresPersonal[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayPersonal[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresPersonal[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayPersonal[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Personal\"', function(){
              assert.equal(arrayPersonal[0], "Personal");
            });
            it('plantilla: \"personal\"', function(){
              assert.equal(arrayPersonal[1], "personal");
            });
          });
        });
      });

      describe('Datos de Información Económica', function(){
        var infoEconomica = cargar(__dirname+"/../config/infoEconomica.json");
        var arrayInfoEconomica = _.toArray(infoEconomica);
        var nombresInfoEconomica = _.keys(infoEconomica);
        var tamaContenido = _.size(arrayInfoEconomica[2]);
        var tamaDatos = _.size(arrayInfoEconomica[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(infoEconomica, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(infoEconomica), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresInfoEconomica[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresInfoEconomica[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresInfoEconomica[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayInfoEconomica[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresInfoEconomica[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayInfoEconomica[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Información Económica\"', function(){
              assert.equal(arrayInfoEconomica[0], "Información Económica");
            });
            it('plantilla: \"infoEconomica\"', function(){
              assert.equal(arrayInfoEconomica[1], "infoEconomica");
            });
          });
        });
      });
    });

    describe('Sección Docencia', function(){
      describe('Datos de Oferta y Demanda Académica', function(){
        var ofertaDemanda = cargar(__dirname+"/../config/ofertaDemanda.json");
        var arrayOfertaDemanda = _.toArray(ofertaDemanda);
        var nombresOfertaDemanda = _.keys(ofertaDemanda);
        var tamaContenido = _.size(arrayOfertaDemanda[2]);
        var tamaDatos = _.size(arrayOfertaDemanda[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(ofertaDemanda, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(ofertaDemanda), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresOfertaDemanda[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresOfertaDemanda[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresOfertaDemanda[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayOfertaDemanda[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresOfertaDemanda[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayOfertaDemanda[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Oferta y Demanda Académica\"', function(){
              assert.equal(arrayOfertaDemanda[0], "Oferta y Demanda Académica");
            });
            it('plantilla: \"ofertaDemanda\"', function(){
              assert.equal(arrayOfertaDemanda[1], "ofertaDemanda");
            });
          });
        });
      });

      describe('Datos de Claustro', function(){
        var claustro = cargar(__dirname+"/../config/claustro.json");
        var arrayClaustro = _.toArray(claustro);
        var nombresClaustro = _.keys(claustro);
        var tamaContenido = _.size(arrayClaustro[2]);
        var tamaDatos = _.size(arrayClaustro[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(claustro, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(claustro), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresClaustro[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresClaustro[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresClaustro[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayClaustro[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresClaustro[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayClaustro[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Claustro\"', function(){
              assert.equal(arrayClaustro[0], "Claustro");
            });
            it('plantilla: \"claustro\"', function(){
              assert.equal(arrayClaustro[1], "claustro");
            });
          });
        });
      });

      describe('Datos de Estudiantes', function(){
        var estudiantes = cargar(__dirname+"/../config/estudiantes.json");
        var arrayEstudiantes = _.toArray(estudiantes);
        var nombresEstudiantes = _.keys(estudiantes);
        var tamaContenido = _.size(arrayEstudiantes[2]);
        var tamaDatos = _.size(arrayEstudiantes[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(estudiantes, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(estudiantes), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresEstudiantes[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresEstudiantes[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresEstudiantes[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayEstudiantes[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresEstudiantes[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayEstudiantes[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Estudiantes\"', function(){
              assert.equal(arrayEstudiantes[0], "Estudiantes");
            });
            it('plantilla: \"estudiantes\"', function(){
              assert.equal(arrayEstudiantes[1], "estudiantes");
            });
          });
        });
      });
    });

    describe('Sección Gestión e Investigación', function(){
      describe('Datos de Misión', function(){
        var mision = cargar(__dirname+"/../config/mision.json");
        var arrayMision = _.toArray(mision);
        var nombresMision = _.keys(mision);
        var tamaContenido = _.size(arrayMision[2]);
        var tamaDatos = _.size(arrayMision[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(mision, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(mision), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresMision[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresMision[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresMision[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayMision[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresMision[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayMision[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Misión\"', function(){
              assert.equal(arrayMision[0], "Misión");
            });
            it('plantilla: \"mision\"', function(){
              assert.equal(arrayMision[1], "mision");
            });
          });
        });
      });

      describe('Datos de Plan Estratégico', function(){
        var planEstrategico = cargar(__dirname+"/../config/planEstrategico.json");
        var arrayPlanEstrategico = _.toArray(planEstrategico);
        var nombresPlanEstrategico = _.keys(planEstrategico);
        var tamaContenido = _.size(arrayPlanEstrategico[2]);
        var tamaDatos = _.size(arrayPlanEstrategico[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(planEstrategico, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(planEstrategico), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresPlanEstrategico[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresPlanEstrategico[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresPlanEstrategico[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayPlanEstrategico[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresPlanEstrategico[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayPlanEstrategico[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Plan Estratégico\"', function(){
              assert.equal(arrayPlanEstrategico[0], "Plan Estratégico");
            });
            it('plantilla: \"planEstrategico\"', function(){
              assert.equal(arrayPlanEstrategico[1], "planEstrategico");
            });
          });
        });
      });

      describe('Datos de Gobierno', function(){
        var gobierno = cargar(__dirname+"/../config/gobierno.json");
        var arrayGobierno = _.toArray(gobierno);
        var nombresGobierno = _.keys(gobierno);
        var tamaContenido = _.size(arrayGobierno[2]);
        var tamaDatos = _.size(arrayGobierno[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(gobierno, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(gobierno), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresGobierno[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresGobierno[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresGobierno[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayGobierno[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresGobierno[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayGobierno[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Gobierno\"', function(){
              assert.equal(arrayGobierno[0], "Gobierno");
            });
            it('plantilla: \"gobierno\"', function(){
              assert.equal(arrayGobierno[1], "gobierno");
            });
          });
        });
      });

      describe('Datos de Estadísticas', function(){
        var estadisticas = cargar(__dirname+"/../config/estadisticas.json");
        var arrayEstadisticas = _.toArray(estadisticas);
        var nombresEstadisticas = _.keys(estadisticas);
        var tamaContenido = _.size(arrayEstadisticas[2]);
        var tamaDatos = _.size(arrayEstadisticas[3]);

        describe('Carga de archivo', function(){
          it('Cargado', function(){
            assert(estadisticas, "Cargado");
          });
        });

        describe('Formato de archivo', function(){
          it('Número de campos: 4', function(){
            assert.equal(_.size(estadisticas), 4);
          });

          describe('Campos obligatorios', function(){
            it('nombre', function(){
              assert.equal(nombresEstadisticas[0], "nombre");
            });
            it('plantilla', function(){
              assert.equal(nombresEstadisticas[1], "plantilla");
            });
            describe('contenido: [encabezado, texto]', function(){
              it('contenido', function(){
                assert.equal(nombresEstadisticas[2], "contenido");
              });
              it('[encabeza, texto]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresContenido = _.keys(arrayEstadisticas[2][i])
                  assert.equal(nombresContenido[0], "encabezado");
                  assert.equal(nombresContenido[1], "texto");
                }
              });
            });
            describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
              it('datos', function(){
                assert.equal(nombresEstadisticas[3], "datos");
              });
              it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
                for(i=0; i<tamaContenido; ++i){
                  var nombresDatos = _.keys(arrayEstadisticas[3][i])
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

          describe('Valores obligatorios de campos', function(){
            it('nombre: \"Estadísticas\"', function(){
              assert.equal(arrayEstadisticas[0], "Estadísticas");
            });
            it('plantilla: \"estadisticas\"', function(){
              assert.equal(arrayEstadisticas[1], "estadisticas");
            });
          });
        });
      });
    });

    describe('Sección Normativa Legal', function(){
      var normativaLegal = cargar(__dirname+"/../config/normativaLegal.json");
      var arrayNormativaLegal = _.toArray(normativaLegal);
      var nombresNormativaLegal = _.keys(normativaLegal);
      var tamaContenido = _.size(arrayNormativaLegal[2]);
      var tamaDatos = _.size(arrayNormativaLegal[3]);

      describe('Carga de archivo', function(){
        it('Cargado', function(){
          assert(normativaLegal, "Cargado");
        });
      });

      describe('Formato de archivo', function(){
        it('Número de campos: 4', function(){
          assert.equal(_.size(normativaLegal), 4);
        });

        describe('Campos obligatorios', function(){
          it('nombre', function(){
            assert.equal(nombresNormativaLegal[0], "nombre");
          });
          it('plantilla', function(){
            assert.equal(nombresNormativaLegal[1], "plantilla");
          });
          describe('contenido: [encabezado, texto]', function(){
            it('contenido', function(){
              assert.equal(nombresNormativaLegal[2], "contenido");
            });
            it('[encabeza, texto]', function(){
              for(i=0; i<tamaContenido; ++i){
                var nombresContenido = _.keys(arrayNormativaLegal[2][i])
                assert.equal(nombresContenido[0], "encabezado");
                assert.equal(nombresContenido[1], "texto");
              }
            });
          });
          describe('datos: [dataset, id_dataset, nombre, vista, url, descarga]', function(){
            it('datos', function(){
              assert.equal(nombresNormativaLegal[3], "datos");
            });
            it('[dataset, id_dataset, nombre, vista, url, descarga]', function(){
              for(i=0; i<tamaContenido; ++i){
                var nombresDatos = _.keys(arrayNormativaLegal[3][i])
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

        describe('Valores obligatorios de campos', function(){
          it('nombre: \"Normativa Legal\"', function(){
            assert.equal(arrayNormativaLegal[0], "Normativa Legal");
          });
          it('plantilla: \"normativaLegal\"', function(){
            assert.equal(arrayNormativaLegal[1], "normativaLegal");
          });
        });
      });
    });
  });
}
catch(e){
  console.log("Alguno de los archivos JSON de datos necesario no se encuentra. No es posible finalizar todos los test.");
}



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
