/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2015 Germán Martínez Maldonado

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


var buscar = function (archivo){
  // Variable con el resultado de la comprobación
  var existe;
	// Cargamos el modulo para operaciones de entrada/salida con ficheros
	var fs = require("fs");

  // Si el archivo existe se devuelve true, si no existe se produce una excepción y se devuelve false
  try{
    existe = fs.statSync(archivo).isFile();
  }
  catch(e){
    existe = false;
  }

	return existe;
};

module.exports = buscar;
