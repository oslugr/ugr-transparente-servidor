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


var servidor= new Array();
var servidor2= new Array();


function conectarBD(plantilla,colec,categoria,dataset,v){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;

          var coleccion = db.collection(colec);

          if(plantilla==conf.config.leytransparencia.plantilla){
            datos[v]=new Array();
            servidor[v]= new Array();
          }else{
            datos2[v]=new Array();
            servidor2[v]= new Array();
          }

          var cursor = coleccion.find( { categoria: categoria } )
          cursor.each(function(err, item) {
                  if(item != null && item.dataset==dataset){
                    if(plantilla==conf.config.leytransparencia.plantilla)
                      datos[v].push(item);
                    else
                      datos2[v].push(item);
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }
          });

          var coleccion2 = db.collection(conf.config.datasets);
          
          var cursor2 = coleccion2.find()
          cursor2.each(function(err, item) {
                  if(item != null){
                    if(item.dataset==dataset){
                      if(plantilla==conf.config.leytransparencia.plantilla)
                        servidor[v].push(item);
                      else
                        servidor2[v].push(item);
                    }
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }else{
                    db.close();
                  }
          });

    });
}


// Gestión de la pagina de personal

exports.leytransparencia = function(req, res){
  var leytransparencia=conf.config.leytransparencia;
  for (var i =0;i<(leytransparencia.dataset).length; i++) {
    conectarBD(leytransparencia.plantilla,leytransparencia.coleccion,leytransparencia.categoria,leytransparencia.dataset[i],i);
  }

  res.render(leytransparencia.plantilla, { 
    seccion: leytransparencia.nombre ,
    datos: datos,
    servidores: servidor,
    tam: (leytransparencia.dataset).length,
    contenido: leytransparencia.contenido,
    texto: leytransparencia.texto
  });
};