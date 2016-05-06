// # Ruta Menú Principal
/*
Configuración de la ruta del menú principal (`/` y `/index`)
*/

"use strict";
/*UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
  Copyright (C) 2014 Jaime Torres Benavente, Óscar Zafra Megías
  Copyright (C) 2015 Mario Heredia Moreno, Germán Martínez Maldonado
  Copyright (C) 2016 Andrés Ortiz Corrales

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
  along with this program. If not, see <http://www.gnu.org/licenses/>.*/

// ### Dependencias locales
// * [**Configuración**](../config/config.html): Configuración del servidor
var config = require('../../config/config');

//Rellenamos el vector con los enlaces leidos del fichero de configuracion
//Cada posicion del vector es un enlace con su nombre, su dirección y su id para el CSS
var enlaces = [];

function leerEnlaces() {
	var l = config.archivosJson.index.enlaces.length;
	for (var i = 0; i < l; i++) {
		var enlace = config.archivosJson.index.enlaces[i];
		enlaces.push({
			"nombre": enlace.nombre,
			"link": enlace.href,
			"id": enlace.id
		});
	}
}

// ### Exports
// * `index(req,res)`: callback para renderizar inicio
exports.index = function(req, res) {
	if (enlaces.length === 0)
		leerEnlaces();
	res.render('index', {
		seccion: config.archivosJson.index.nombre,
		enlaces: enlaces
	});
};
