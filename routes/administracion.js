/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2014 Jaime Torres Benavente, Óscar Zafra Megías
	Copyright (C) 2015 Mario Heredia Moreno, Germán Martínez Maldonado

	This file is part of UGR Transparente.

	UGR Transparente is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	UGR Transparente is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
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
    datos: personal.datos,
  });
};

// Gestión de la pagina de informacion economica
exports.infoEconomica = function(req, res){
  var infoEconomica = conf.infoEconomica;

  res.render(infoEconomica.plantilla, {
    servidor: conf.config.servidor,
    seccion: infoEconomica.nombre,
    contenido: infoEconomica.contenido,
    datos: infoEconomica.datos,
  });
};

// Gestión de la página de servicios
exports.servicios = function(req, res){
  var servicios = conf.servicios;

  res.render(servicios.plantilla, {
    servidor: conf.config.servidor,
    seccion: servicios.nombre,
    contenido: servicios.contenido,
    datos: servicios.datos,
  });
};

// Gestión de la página de perfil del contratante
exports.perfil = function(req, res){
  res.render('perfilContratante', {
    seccion: 'Perfil del Contratante'
  });
};
