// # Main App

/*
Ejecutable principal de transparente.ugr.es
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


// ### Dependencias
// * **Express:** Framework web
var express = require('express');
var app = express();

// #### Dependencias Locales
// * [**Server Config**](./serverConfig.html): Configuración del servidor
var serverConfig = require('./app/serverConfig');
// * [**Routes**](./routes.html): Rutas del servidor
var routes = require('./app/routes');

serverConfig(app);
routes(app);

// Se levanta la aplicación en el puerto e ip determinados
var server = app.listen(app.get('port'), app.get('ip'), function() {
	console.log("UGR - Transparente " + process.env.npm_package_version);
	console.log('Express server listening on ' + app.get('ip') + ':' + app.get('port'));
});

// **Exports:** server
module.exports = server;
