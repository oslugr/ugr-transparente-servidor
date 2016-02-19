var express = require('express');


module.exports = {
	archivosJSON: [
		"personal.json",
		"infoEconomica.json",
		"ofertaDemanda.json",
		"claustro.json",
		"estudiantes.json",
		"gobierno.json",
		"rendimiento.json",
		"normativaLegal.json",
		"index.json",
		"infoInstitucional.json"
	],
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
	archivosBuscador: [
		'/archivos/personal',
		'/archivos/infoEconomica',
		'/archivos/ofertaDemanda',
		'/archivos/claustro',
		'/archivos/estudiantes',
		'/archivos/gobierno',
		'/archivos/rendimiento',
		'/archivos/normativaLegal'
	],
	initServer: function(done, dev) {
		if (dev === true) process.env.ENV = "dev";
		else process.env.ENV="prod";
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
