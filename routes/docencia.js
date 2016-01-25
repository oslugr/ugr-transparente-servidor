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

// Gestión de la pagina de oferta y demanda academica
exports.ofertaDemanda = function(req, res) {
  var ofertaDemanda = conf.ofertaDemanda;

  res.render(ofertaDemanda.plantilla, {
    servidor: conf.config.servidor,
    seccion: ofertaDemanda.nombre,
    contenido: ofertaDemanda.contenido,
    datos: ofertaDemanda.datos
  });
};

// Gestión de la pagina de claustro
exports.claustro = function(req, res) {
  var claustro = conf.claustro;

  res.render(claustro.plantilla, {
    servidor: conf.config.servidor,
    seccion: claustro.nombre,
    contenido: claustro.contenido,
    datos: claustro.datos
  });
};

// Gestión de la pagina de estudiantes
exports.estudiantes = function(req, res) {
  var estudiantes = conf.estudiantes;

  res.render(estudiantes.plantilla, {
    servidor: conf.config.servidor,
    seccion: estudiantes.nombre,
    contenido: estudiantes.contenido,
    datos: estudiantes.datos
  });
};