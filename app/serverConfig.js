// # Configuración del servidor

/*
Configuración del servidor express, variables de entorno, middlewares y demás
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

// * **Serve Favicon:** Devuelve el favicon.ico
// * **Express:** Middleware _static_ de express para servir archivos estáticos
// * **EJS:** Motor de renderizado de templates
// * **EJS Layouts:** Módulo para poder crear layouts con EJS
// * **Html Minifier:** Módulo para minificar html
// * **Express Compression:** Módulo para comprimir las respuestas de express
var favicon = require('serve-favicon');
var expressStatic = require('express').static;
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var htmlMinify = require('html-minifier').minify;
var compress = require('compression');
//var morgan = require('morgan');

// #### Dependencias locales
// * [**Configuración**](./config/config.html): Configuración del servidor
var config = require('../config/config');


// ### Configuración de servidor
// Configura los middlewares y variables del servidor express
module.exports = function(app) {
	// #### Variables de entorno
	// * **PORT:** Puerto en el que ejecutar transparente
	// * **IP:** IP sobre la que ejecutar transparente (por defecto `127.0.0.1`)
	// * **ENV:** Entorno de ejecución (`PROD` o `DEV`)
	app.set('port', process.env.PORT || config.puerto);
	app.set('ip', process.env.IP || "127.0.0.1");
	app.set('env', process.env.ENV);

	// ### Middlewares
	// * Motor de renderizado (EJS)
	// * Configuración de motor ejs para minificar html resultante
	// * Carpeta views por defecto para las platillas
	// * layout por defecto `layouts/default`
	// * Compress para usar gzip

	//configuración e la minificación de html
	var minifyConfig = {
		removeAttributeQuotes: true,
		collapseWhitespace: true,
	};

	app.engine('ejs', function(filePath, options, callback) {
		ejs.__express(filePath, options, function(err, html) {
			if (err) return callback(err);
			callback(null, htmlMinify(html, minifyConfig));
		});
	});

	app.set('views', 'views');
	app.set('layout', 'layouts/default');
	app.use(expressLayouts);
	app.set('view engine', 'ejs');
	app.use(compress());
	//En entorno de producción activamos el cache de plantillas
	if (app.get('env') === "prod") app.enable('view cache');

	// **Favicon**: `public/favicon/favicon.ico`
	app.use(favicon('./public/favicon/favicon.ico'));
	//Logger de solicitudes HTTP
	//app.use(morgan('dev'));

	// Middleware de enrutado
	// En entorno de desarrollo, express enrutará los ficheros estáticos, en entorno de producción no
	if (app.get('env') === "dev") {
		app.use(expressStatic('./public'));
	}
};

// ### Exports
// * function(app): realiza la configuración de servidor sobre app de express