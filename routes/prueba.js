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

//Rellenamos el vector con los enlaces leidos del fichero de configuracion
//Cada posicion del vector es un enlace con su nombre, su dirección y su id para el CSS
var enlaces = new Array();

function leerEnlaces() {
  for (i in conf.config.index.enlaces) {
    enlaces.push([config.index.enlaces[i].nombre, config.index.enlaces[i].href, config.index.enlaces[i].id]);
  }
}

//Pagina de inicio
exports.index = function(req, res) {
  if (enlaces.length == 0)
    leerEnlaces();
  res.render('index', {
    seccion: conf.config.index.nombre,
    enlaces: enlaces
  });
};
