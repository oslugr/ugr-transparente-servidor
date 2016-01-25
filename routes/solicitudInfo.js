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
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


//Variable para las configuraciones
var conf = require('../app');

// Gestión de la pagina de la solicitudes

exports.solicitudInfo = function(req, res) {

  res.render('solicitudInfo', {
    seccion: 'Solicitud de Información'
  });
};