var express = require('express');

// Configuración de los tests
module.exports = {
	direcciones: [ // Direcciones a probar
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
		'/css/style.css',
		'/css/style2.css',
		'/script/buscar.js',
		'/script/calendario.js',
		'/script/generar_tabla.js',
		'/img/transp.gif',
		'/imagenes/osl.jpg',
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

		server = app.listen(app.get('port'), app.get('ip'), function() {
			done(app, server);
		});
	}
};
