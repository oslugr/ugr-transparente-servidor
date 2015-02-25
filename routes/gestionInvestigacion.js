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

// Gestión de la pagina de la mision
exports.mision = function(req, res){
  var mision = conf.mision;

  res.render(mision.plantilla, {
    servidor: conf.config.servidor,
    seccion: mision.nombre,
    contenido: mision.contenido,
    datos: mision.datos,
  });
};

// Gestión de la pagina del paln estrategico
exports.planEstrategico = function(req, res){
  var planEstrategico = conf.planEstrategico;

  res.render(planEstrategico.plantilla, {
    servidor: conf.config.servidor,
    seccion: planEstrategico.nombre,
    contenido: planEstrategico.contenido,
    datos: planEstrategico.datos,
  });
};

// Gestión de la pagina del gobierno
exports.gobierno = function(req, res){
  var gobierno = conf.gobierno;

  res.render(gobierno.plantilla, {
    servidor: conf.config.servidor,
    seccion: gobierno.nombre,
    contenido: gobierno.contenido,
    datos: gobierno.datos,
  });
};

// Gestión de la pagina de resultados
exports.estadisticas = function(req, res){
  var estadisticas = conf.estadisticas;

  res.render(estadisticas.plantilla, {
    servidor: conf.config.servidor,
    seccion: estadisticas.nombre,
    contenido: estadisticas.contenido,
    datos: estadisticas.datos,
  });
};
