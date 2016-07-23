// # Configuración de tests
// Datos de configuración de los tests y funciones auxiliares

"use strict";
/*UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
  Copyright (C) 2015 Germán Martínez Maldonado
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

// ### Dependencias
// * **Express:** Framework web
var express = require('express');

// ### exports
// * direcciones: Urls locales a comprobar
// * archivosBuscador: Lista de archivos del buscador (jsons)
// * archivosEstaticos: Lista de archivos estáticos a probar
// * initServer(done,dev): functión para levantar un servidor de prueba
//   * Si dev==true, se levantará en modo desarrollo, producción en otro caso
module.exports = {
	direcciones: [
		'/',
		'/index.html',
		'/infoInstitucional.html',
		'/personal.html',
		'/infoEconomica.html',
		'/perfilContratante.html',
		'/claustro.html',
		'/estudiantes.html',
		'/gobierno.html',
		'/rendimiento.html',
		'/normativaLegal.html',
		'/solicitudInfo.html',
		'/mapaWeb.html',
		'/buscador.html',
		'/calendario.html',
		'/calendarioSolo.html',
		'/ofertaDemanda.html'
	],
	archivosBuscador: [ // Direcciones del buscador
		'/archivos/personal',
		'/archivos/infoEconomica',
		'/archivos/ofertaDemanda',
		'/archivos/claustro',
		'/archivos/estudiantes',
		'/archivos/gobierno',
		'/archivos/rendimiento',
		'/archivos/normativaLegal'
	],
	archivosEstaticos: [ // Archivos estáticos a probar
		'/favicon/favicon.ico',
		'/css/builds/bundle.css',
		'/scripts/builds/bundle.js',
		'/img/transp.gif',
		'/img/general/cabecera.png',
		'/imagenes/link.png',
		'/graph/perfil_pdi_extranjero.png'
	],
	initServer: function(done, dev) { // Función para iniciar el servidor express
		if (dev === true) process.env.ENV = "dev";
		else process.env.ENV = "prod";
		var app = express();
		var serverConfig = require('../app/serverConfig');
		var routes = require('../app/routes');
		serverConfig(app);
		routes(app);

		var server = app.listen(app.get('port'), app.get('ip'), function() {
			done(app, server);
		});
	}
};