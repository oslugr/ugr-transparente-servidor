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


var servidor= new Array();
var servidor2= new Array();
var servidor3= new Array();


function conectarBD(plantilla,colec,categoria,dataset,v){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;

          var coleccion = db.collection(colec);

          if(plantilla==conf.config.personal.plantilla){
            datos[v]=new Array();
            servidor[v]= new Array();
          }else if(plantilla==conf.config.infoEco.plantilla){
            datos2[v]=new Array();
            servidor2[v]= new Array();
          }else{
            datos3[v]=new Array();
            servidor3[v]= new Array();
          }

          var cursor = coleccion.find( { categoria: categoria } )
          cursor.each(function(err, item) {
                  if(item != null && item.dataset==dataset){
                    if(plantilla==conf.config.personal.plantilla)
                      datos[v].push(item);
                    else if(plantilla==conf.config.infoEco.plantilla)
                      datos2[v].push(item);
                    else
                      datos3[v].push(item);
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }
          });

          var coleccion2 = db.collection(conf.config.datasets);
          
          var cursor2 = coleccion2.find()
          cursor2.each(function(err, item) {
                  if(item != null){
                    if(item.dataset==dataset){
                      if(plantilla==conf.config.personal.plantilla)
                        servidor[v].push(item);
                      else if(plantilla==conf.config.infoEco.plantilla)
                      servidor2[v].push(item);
                      else
                        servidor3[v].push(item);
                    }
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }else{
                    db.close();
                  }
          });

    });
}


// Gestión de la pagina de personal

exports.personal = function(req, res){
  var personal=conf.config.personal;
  for (var i =0;i<(personal.dataset).length; i++) {
    conectarBD(personal.plantilla,personal.coleccion,personal.categoria,personal.dataset[i],i);
  }

  res.render(personal.plantilla, { 
    seccion: personal.nombre ,
    datos: datos,
    servidores: servidor,
    tam: (personal.dataset).length,
    contenido: personal.contenido
  });
};

// Gestión de la pagina de informacion economica

exports.infoEco = function(req, res){
  var infoEco=conf.config.infoEco;
  for (var i =0;i<(infoEco.dataset).length; i++) {
    conectarBD(infoEco.plantilla,infoEco.coleccion,infoEco.categoria,infoEco.dataset[i],i);
  }

  res.render(infoEco.plantilla, { 
    seccion: infoEco.nombre ,
    datos: datos2,
    servidores: servidor2,
    tam: (infoEco.dataset).length,
    contenido: infoEco.contenido
  });
};

// Gestión de la página de servicios

exports.servicios = function(req, res){
  var servicios=conf.config.servicios;
  for (var i =0;i<(servicios.dataset).length; i++) {
    conectarBD(servicios.plantilla,servicios.coleccion,servicios.categoria,servicios.dataset[i],i);
  }

  res.render(servicios.plantilla, { 
    seccion: servicios.nombre ,
    datos: datos3,
    servidores: servidor3,
    tam: (servicios.dataset).length,
    contenido: servicios.contenido
  });
};