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

//Variable para almacenar las tablas 
var tablas = new Array();

//Variable para almacenar los datos
var datos= new Array();

function conectarBD(collection,tipo){
    MongoClient.connect(conf.config.BD, function(err,db){
          if(err) throw err;
          
          datos=new Array();

          var coleccion = db.collection(collection);
   
          var cursor = coleccion.find({"tipo":tipo});
          cursor.each(function(err, item) {
                  if(item != null){
                    datos.push(item);
                  // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y obtenemos los datos 
                  }else{

                    db.close();

                  }
          });
    });
}


// Gestión de la pagina de personal

exports.personal = function(req, res){
  conectarBD("personal","informacion salarial");
  var personal=conf.config.personal;
  res.render(personal.plantilla, { seccion: personal.nombre ,datos: datos, tam_datos:datos.lenth, encabezado1: personal.contenido[0].encabezado, texto1: personal.contenido[0].texto, encabezado2: personal.contenido[1].encabezado, texto2: personal.contenido[1].texto});
};

// Gestión de la pagina de informacion economica

exports.infoEco = function(req, res){
  var infoEco=conf.config.infoEco;
  res.render(infoEco.plantilla, { seccion: infoEco.nombre , texto: infoEco.texto});
};