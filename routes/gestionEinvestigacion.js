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



// Gestión de la pagina de la mision

exports.mision = function(req, res){
  var mision=conf.config.mision;
  res.render(mision.plantilla, { seccion: mision.nombre , texto: mision.texto});
};


// Gestión de la pagina del paln estrategico

exports.planEstrategico = function(req, res){
  var planEst=conf.config.planEstrategico;
  res.render(planEst.plantilla, { seccion: planEst.nombre , texto: planEst.texto});
};

// Gestión de la pagina del gobierno

exports.gobierno = function(req, res){
  var gobierno=conf.config.gobierno;
  res.render(gobierno.plantilla, { seccion: gobierno.nombre , texto: gobierno.texto});
};


// Gestión de la pagina de resultados

exports.resultados = function(req, res){
  var resultados=conf.config.resultados;
  res.render(resultados.plantilla, { seccion: resultados.nombre , texto: resultados.texto});
};