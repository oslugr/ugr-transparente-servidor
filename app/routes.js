/*
UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
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
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


// Rutas
var index = require('./routes/index');
var infoInstitucional = require('./routes/infoInstitucional');
var administracion = require('./routes/administracion');
var docencia = require('./routes/docencia');
var gestionInvestigacion = require('./routes/gestionInvestigacion');
var normativaLegal = require('./routes/normativaLegal');
var solicitudInfo = require('./routes/solicitudInfo');
var mapaWeb = require('./routes/mapaWeb');
var buscador = require('./routes/buscador');
var calendario = require('./routes/calendario');
var calendarioSolo = require('./routes/calendarioSolo');

var config = require('../config/config');

// Routes de las urls de transparente
module.exports = function(app) {
	// Inicio
	app.get('/', index.index);
	app.get('/index.html', index.index);
	// Información institucional
	app.get('/infoInstitucional.html', infoInstitucional.infoInstitucional);
	// Administracion
	app.get('/personal.html', administracion.personal);
	app.get('/infoEconomica.html', administracion.infoEconomica);
	app.get('/perfilContratante.html', administracion.perfil);
	// Docencia
	app.get('/ofertaDemanda.html', docencia.ofertaDemanda);
	app.get('/claustro.html', docencia.claustro);
	app.get('/estudiantes.html', docencia.estudiantes);
	// Gestion e Investigación
	app.get('/gobierno.html', gestionInvestigacion.gobierno);
	app.get('/rendimiento.html', gestionInvestigacion.rendimiento);
	// Normativa Legal
	app.get('/normativaLegal.html', normativaLegal.normativaLegal);
	// Solicitudes de Información
	app.get('/solicitudInfo.html', solicitudInfo.solicitudInfo);
	// Mapa del sitio
	app.get('/mapaWeb.html', mapaWeb.mapaWeb);
	// Buscador
	app.get('/buscador.html', buscador.buscador);
	// Calendario
	app.get('/calendario.html', calendario.index);
	app.get('/calendarioSolo.html', calendarioSolo.index);

	// Archivos de datos
	app.get('/archivos/personal', function(req, res) {
		res.send(config.personal);
	});
	app.get('/archivos/infoEconomica', function(req, res) {
		res.send(config.infoEconomica);
	});
	app.get('/archivos/ofertaDemanda', function(req, res) {
		res.send(config.ofertaDemanda);
	});
	app.get('/archivos/claustro', function(req, res) {
		res.send(config.claustro);
	});
	app.get('/archivos/estudiantes', function(req, res) {
		res.send(config.estudiantes);
	});
	app.get('/archivos/gobierno', function(req, res) {
		res.send(config.gobierno);
	});
	app.get('/archivos/rendimiento', function(req, res) {
		res.send(config.rendimiento);
	});
	app.get('/archivos/normativaLegal', function(req, res) {
		res.send(config.normativaLegal);
	});

	// Manejador de errores:
	app.use(function(req, res, next) {
		res.status(404).render('error_404', {
			titulo: config.error.titulo,
			texto: config.error.texto
		});
	});
};