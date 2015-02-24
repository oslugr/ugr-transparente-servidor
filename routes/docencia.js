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

// Gestión de la pagina de oferta y demanda academica
exports.ofertaYdemanda = function(req, res){
  var ofertaYdemanda = conf.ofertaYdemanda;

  res.render(ofertaYdemanda.plantilla, {
    servidor: conf.config.servidor,
    seccion: ofertaYdemanda.nombre,
    contenido: ofertaYdemanda.contenido,
    datos: ofertaYdemanda.datos
  });
};

// Gestión de la pagina de claustro
exports.claustro = function(req, res){
  var claustro = conf.claustro;

  res.render(claustro.plantilla, {
    servidor: conf.config.servidor,
    seccion: claustro.nombre,
    contenido: claustro.contenido,
    datos: claustro.datos
  });
};

// Gestión de la pagina de alumnos
exports.alumnos = function(req, res){
  var alumnos = conf.alumnos;

  res.render(alumnos.plantilla, {
    servidor: conf.config.servidor,
    seccion: alumnos.nombre,
    contenido: alumnos.contenido,
    datos: alumnos.datos
  });
};
