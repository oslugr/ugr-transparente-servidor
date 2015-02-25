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

// Gestión de la pagina de normativas
exports.normativaLegal = function(req, res){
  var normativa = conf.normativa;

  res.render(normativa.plantilla, {
    servidor: conf.config.servidor,
    seccion: normativa.nombre,
    contenido: normativa.contenido,
    datos: normativa.datos,
  });
};
