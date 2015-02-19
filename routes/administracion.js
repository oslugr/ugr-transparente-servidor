/*
  Portal web transparente.ugr.es para publicar datos de la Universidad de Granada
  Copyright (C) 2014  Jaime Torres Benavente
                2015  German Martinez Maldonado

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

// Variable para usar las funciones de la librería Underscore
var _ = require('underscore');

// Función para recuperar los datos del JSON
function getDatos(){
  return conf.configCKAN.personal.datos;
}

// Función para obtener el tamaño del dataset recuperado del JSON
function getTamDatos(datos){
  return _.size(datos);
}

// Función para obtener la dirección del servidor con los datos
function getServidor(){
  return conf.configCKAN.personal.servidor;
}

// Gestión de la pagina de personal
exports.personal = function(req, res){
  var personal=conf.config.personal;

  var datos = getDatos();
  var num_datos = getTamDatos(datos);
  var servidor = getServidor();

  res.render(personal.plantilla, {
    seccion: personal.nombre ,
    datos: datos,
    num_datos: num_datos,
    servidor: servidor,
    tam: (personal.dataset).length,
    contenido: personal.contenido,
  });
};

// Gestión de la pagina de informacion economica
exports.infoEco = function(req, res){
  var infoEco=conf.config.infoEco;

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

  res.render(servicios.plantilla, {
    seccion: servicios.nombre ,
    datos: datos3,
    servidores: servidor3,
    tam: (servicios.dataset).length,
    contenido: servicios.contenido
  });
};

// Gestión de la página de perfil del contratante
exports.perfil = function(req, res){
    res.render('perfilContratante', {
        seccion: 'Perfil del Contratante'
    });
};
