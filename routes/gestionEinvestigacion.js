/*
  Portal web transparente.ugr.es para publicar datos de la Universidad de Granada
  Copyright (C) 2014  Jaime Torres Benavente

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//Variable para las configuraciones
var conf = require('../app');

//Variable para la base de datos mongodb
var MongoClient = require('mongodb').MongoClient;

//Variable para almacenar los datos
var datos= new Array();
var datos2= new Array();
var datos3= new Array();
var datos4= new Array();


var servidor= new Array();
var servidor2= new Array();
var servidor3= new Array();
var servidor4= new Array();

function conectarBD(plantilla,colec,categoria,dataset,v){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;

          var coleccion = db.collection(colec);

          if(plantilla==conf.config.mision.plantilla){
            datos[v]=new Array();
            servidor[v]= new Array();
          }else if(plantilla==conf.config.planEstrategico.plantilla){
            datos2[v]=new Array();
            servidor2[v]= new Array();
          }else if(plantilla==conf.config.gobierno.plantilla){
            datos3[v]=new Array();
            servidor3[v]= new Array();
          }else{
            datos4[v]=new Array();
            servidor4[v]= new Array();
          }

          var cursor = coleccion.find( { categoria: categoria } )
          cursor.each(function(err, item) {
                  if(item != null && item.dataset==dataset){
                    if(plantilla==conf.config.mision.plantilla)
                      datos[v].push(item);
                    else if(plantilla==conf.config.planEstrategico.plantilla)
                      datos2[v].push(item);
                    else if(plantilla==conf.config.gobierno.plantilla)
                      datos3[v].push(item);
                    else
                      datos4[v].push(item);
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos
                  }
          });

          var coleccion2 = db.collection(conf.config.datasets);

          var cursor2 = coleccion2.find()
          cursor2.each(function(err, item) {
                  if(item != null){
                    if(item.dataset==dataset){
                      if(plantilla==conf.config.mision.plantilla)
                        servidor[v].push(item);
                      else if(plantilla==conf.config.planEstrategico.plantilla)
                        servidor2[v].push(item);
                      else if(plantilla==conf.config.gobierno.plantilla)
                        servidor3[v].push(item);
                      else
                        servidor4[v].push(item);
                    }
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos
                  }else{
                    db.close();
                  }
          });

    });
}



// Gestión de la pagina de la mision

exports.mision = function(req, res){
  var mision=conf.config.mision;
  for (var i =0;i<(mision.dataset).length; i++) {
    conectarBD(mision.plantilla,mision.coleccion,mision.categoria,mision.dataset[i],i);
  }

  res.render(mision.plantilla, {
    seccion: mision.nombre ,
    datos: datos,
    servidores: servidor,
    tam: (mision.dataset).length,
    contenido: mision.contenido
  });
};


// Gestión de la pagina del paln estrategico

exports.planEstrategico = function(req, res){
  var planEst=conf.config.planEstrategico;
  for (var i =0;i<(planEst.dataset).length; i++) {
    conectarBD(planEst.plantilla,planEst.coleccion,planEst.categoria,planEst.dataset[i],i);
  }

  res.render(planEst.plantilla, {
    seccion: planEst.nombre ,
    datos: datos2,
    servidores: servidor2,
    tam: (planEst.dataset).length,
    contenido: planEst.contenido
  });
};

// Gestión de la pagina del gobierno

exports.gobierno = function(req, res){
  var gobierno=conf.config.gobierno;
  for (var i =0;i<(gobierno.dataset).length; i++) {
    conectarBD(gobierno.plantilla,gobierno.coleccion,gobierno.categoria,gobierno.dataset[i],i);
  }

  res.render(gobierno.plantilla, {
    seccion: gobierno.nombre ,
    datos: datos3,
    servidores: servidor3,
    tam: (gobierno.dataset).length,
    contenido: gobierno.contenido
  });
};


// Gestión de la pagina de resultados

exports.resultados = function(req, res){
  var resultados=conf.config.resultados;
  for (var i =0;i<(resultados.dataset).length; i++) {
    conectarBD(resultados.plantilla,resultados.coleccion,resultados.categoria,resultados.dataset[i],i);
  }

  res.render(resultados.plantilla, {
    seccion: resultados.nombre ,
    datos: datos4,
    servidores: servidor4,
    tam: (resultados.dataset).length,
    contenido: resultados.contenido
  });
};
