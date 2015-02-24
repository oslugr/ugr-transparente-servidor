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

// Gestión de la pagina de personal
exports.personal = function(req, res){
  var personal = conf.personal;

  res.render(personal.plantilla, {
    servidor: conf.config.servidor,
    seccion: personal.nombre,
    contenido: personal.contenido,
    tam: (personal.contenido).length,
    datos: personal.datos,
    num_datos: (personal.datos).length,
  });
};

// Gestión de la pagina de informacion economica
exports.infoEco = function(req, res){
  var infoEco = conf.infoEco;

  res.render(infoEco.plantilla, {
    servidor: conf.config.servidor,
    seccion: infoEco.nombre,
    contenido: infoEco.contenido,
    tam: (infoEco.contenido).length,
    datos: infoEco.datos,
    num_datos: (infoEco.datos).length,
  });
};

// Gestión de la página de servicios
exports.servicios = function(req, res){
  var servicios = conf.servicios;

  res.render(servicios.plantilla, {
    servidor: conf.config.servidor,
    seccion: servicios.nombre,
    contenido: servicios.contenido,
    tam: (servicios.contenido).length,
    datos: servicios.datos,
    num_datos: (servicios.datos).length,
  });
};

// Gestión de la página de perfil del contratante
exports.perfil = function(req, res){
  res.render('perfilContratante', {
    seccion: 'Perfil del Contratante'
  });
};
