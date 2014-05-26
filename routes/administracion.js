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

//Variable para almacenar los datos
var datos2= new Array();

var servidor;
var servidor2

function conectarBD(colec,categoria,dataset,v){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;

          var coleccion = db.collection(colec);
          
          if(v==1)
            datos= new Array();
          else
            datos2= new Array();
   
          var cursor = coleccion.find( { categoria: categoria } )
          cursor.each(function(err, item) {
                  if(item != null && item.dataset==dataset){
                    if(v==1){
                      datos.push(item);
                    }else{
                      datos2.push(item);
                    }
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }
          });

          var coleccion2 = db.collection(conf.config.datasets);
          
          var cursor2 = coleccion2.find()
          cursor2.each(function(err, item) {
                  if(item != null){
                    if(item.dataset==dataset){
                      if(v==1)
                      servidor=item;
                      else
                        servidor2=item;

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
  conectarBD(personal.coleccion,personal.categoria,personal.dataset[0],1);
  conectarBD(personal.coleccion,personal.categoria,personal.dataset[1],2);
  res.render(personal.plantilla, { 
    seccion: personal.nombre ,
    datos: datos,
    datos2: datos2,
    dataset: servidor,
    dataset2:servidor2, 
    encabezado1: personal.contenido[0].encabezado, 
    texto1: personal.contenido[0].texto, 
    encabezado2: personal.contenido[1].encabezado, 
    texto2: personal.contenido[1].texto
  });
};

// Gestión de la pagina de informacion economica

exports.infoEco = function(req, res){
  var infoEco=conf.config.infoEco;
  res.render(infoEco.plantilla, { seccion: infoEco.nombre , texto: infoEco.texto});
};