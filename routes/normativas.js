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
var servidor= new Array();


function conectarBD(plantilla,colec,categoria,dataset,v){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;

          var coleccion = db.collection(colec);

          if(plantilla==conf.config.normativa.plantilla){
            datos[v]=new Array();
            servidor[v]= new Array();
          }

          var cursor = coleccion.find( { categoria: categoria } )
          cursor.each(function(err, item) {
            if(item != null && item.dataset==dataset){
              datos[v].push(item);
              // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
            }
          });

          var coleccion2 = db.collection(conf.config.datasets);
          
          var cursor2 = coleccion2.find()
          cursor2.each(function(err, item) {
            if(item != null){
              if(item.dataset==dataset){
                servidor[v].push(item);
              }
                // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
            }else{
              db.close();
            }
          });

    });
}


// Gestión de la pagina de normativas
exports.normativa = function(req, res){
  var normativa=conf.config.normativa;
  for (var i =0;i<(normativa.dataset).length; i++) {
    conectarBD(normativa.plantilla,normativa.coleccion,normativa.categoria,normativa.dataset[i],i);
  }

  res.render(normativa.plantilla, { 
    seccion: normativa.nombre ,
    datos: datos,
    servidores: servidor,
    tam: (normativa.dataset).length,
    contenido: normativa.contenido
  });
};