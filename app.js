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


/**
* Module dependencies.
*/
var express = require('express');
var index = require(__dirname+'/routes/index');
var presentacion = require(__dirname+'/routes/presentacion');
var administracion = require(__dirname+'/routes/administracion');
var docencia = require(__dirname+'/routes/docencia');
var gestionInvestigacion = require(__dirname+'/routes/gestionInvestigacion');
var normativaLegal = require(__dirname+'/routes/normativaLegal');
var testSolicitudes = require(__dirname+'/routes/testSolicitudes');
var map = require(__dirname+'/routes/mapaweb');

var http = require('http');
var path = require('path');

var app = express();

// Cargamos la configuracion del archivo json y la exportamos para poder usarla en toda la aplicacion
var cargar = require(__dirname+'/lib/lector');
config=cargar(__dirname+'/config/config.json');
module.exports.config = config;

// Archivos de configuración de cada unas de las páginas
module.exports.personal = cargar(__dirname+'/config/personal.json');
module.exports.infoEconomica = cargar(__dirname+'/config/infoEconomica.json');
module.exports.servicios = cargar(__dirname+'/config/servicios.json');
module.exports.ofertaDemanda = cargar(__dirname+'/config/ofertaDemanda.json');
module.exports.claustro = cargar(__dirname+'/config/claustro.json');
module.exports.estudiantes = cargar(__dirname+'/config/estudiantes.json');
module.exports.mision = cargar(__dirname+'/config/mision.json');
module.exports.planEstrategico = cargar(__dirname+'/config/planEstrategico.json');
module.exports.gobierno = cargar(__dirname+'/config/gobierno.json');
module.exports.estadisticas = cargar(__dirname+'/config/estadisticas.json');
module.exports.normativaLegal = cargar(__dirname+'/config/normativaLegal.json');

// All environments
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || config.puerto);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.set('views', path.join(__dirname, 'views'));

// Buscar si esto es lo que habría que tocar para que se puedan previsualizar PDFs igual que las tablas
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.status(404).render('404_error', {titulo: config.error.titulo, texto: config.error.texto});
});

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Inicio
app.get('/', index.index);
app.get('/index.html', index.index);

// Presentacion
app.get('/presentacion.html', presentacion.presentacion);

// Administracion
app.get('/personal.html',administracion.personal);
app.get('/infoEconomica.html',administracion.infoEconomica);
app.get('/servicios.html',administracion.servicios);
app.get('/perfilContratante.html',administracion.perfil);

// Docencia
app.get('/ofertaDemanda.html',docencia.ofertaDemanda);
app.get('/claustro.html',docencia.claustro);
app.get('/estudiantes.html',docencia.estudiantes);

// Gestion e investigación
app.get('/mision.html',gestionInvestigacion.mision);
app.get('/planEstrategico.html',gestionInvestigacion.planEstrategico);
app.get('/gobierno.html',gestionInvestigacion.gobierno);
app.get('/estadisticas.html',gestionInvestigacion.estadisticas);

// Normativa Legal
app.get('/normativaLegal.html',normativaLegal.normativaLegal);

// Solicitudes
app.get('/testSolicitudes.html', testSolicitudes.testSolicitudes);
//Mapa del sitio
app.get('/mapaweb.html', map.mapa);

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on ' + app.get('ip') + ':' + app.get('port'));
});

module.exports = app;
