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


// Rutas especificas
var index = require('./routes/index');

var solicitudInfo = require('./routes/solicitudInfo');
var mapaWeb = require('./routes/mapaWeb');
var buscador = require('./routes/buscador');
var calendario = require('./routes/calendario');
var calendarioSolo = require('./routes/calendarioSolo');
var administracion = require('./routes/administracion');


var config = require('../config/config');
var jsons = config.archivosJson;


//Ejemplo de Rutas configurables

var routesConfig = [{
	url: "/personal.html",
	plantilla: "personal",
	datos: jsons.personal
}, {
	url: "/infoEconomica.html",
	plantilla: "infoEconomica",
	datos: jsons.infoEconomica
}, {
	url: "/ofertaDemanda.html",
	plantilla: "ofertaDemanda",
	datos: jsons.ofertaDemanda
}, {
	url: "/claustro.html",
	plantilla: "claustro",
	datos: jsons.claustro
}, {
	url: "/estudiantes.html",
	plantilla: "estudiantes",
	datos: jsons.estudiantes
}, {
	url: "/gobierno.html",
	plantilla: "gobierno",
	datos: jsons.gobierno
}, {
	url: "/rendimiento.html",
	plantilla: "rendimiento",
	datos: jsons.rendimiento
}, {
	url: "/normativaLegal.html",
	plantilla: "normativaLegal",
	datos: jsons.normativaLegal
}, {
	url: "/infoInstitucional.html",
	plantilla: "infoInstitucional",
	datos: jsons.infoInstitucional
}];

var routesArchivos = [{
	url: '/personal',
	datos: jsons.personal
}, {
	url: '/infoEconomica',
	datos: jsons.infoEconomica
}, {
	url: '/ofertaDemanda',
	datos: jsons.ofertaDemanda
}, {
	url: '/claustro',
	datos: jsons.claustro
}, {
	url: '/estudiantes',
	datos: jsons.estudiantes
}, {
	url: '/gobierno',
	datos: jsons.gobierno
}, {
	url: '/rendimiento',
	datos: jsons.rendimiento
}, {
	url: '/normativaLegal',
	datos: jsons.normativaLegal
}];

module.exports = function(app) {

	function setRoute(routeConf) {
		return function(req, res) {
			res.render(routeConf.plantilla, {
				servidor: config.servidor,
				seccion: routeConf.datos.nombre,
				contenido: routeConf.datos.contenido,
			});
		};
	}
	for (var i = 0; i < routesConfig.length; i++) {
		app.get(routesConfig[i].url, setRoute(routesConfig[i]));
	}


	//LEGACY Routes
	// Inicio
	app.get('/', index.index);
	app.get('/index.html', index.index);


	// Solicitudes de Información
	app.get('/solicitudInfo.html', solicitudInfo.solicitudInfo);
	// Mapa del sitio
	app.get('/mapaWeb.html', mapaWeb.mapaWeb);
	// Buscador
	app.get('/buscador.html', buscador.buscador);
	// Calendario
	app.get('/calendario.html', calendario.index);
	app.get('/calendarioSolo.html', calendarioSolo.index);

	app.get('/perfilContratante.html', administracion.perfil);




	// Archivos de datos
	function setRouteArchivos(routeConf) {
		return function(req, res) {
			res.json(routeConf.datos);
		};
	}
	for (i = 0; i < routesArchivos.length; i++) {
		app.get('/archivos' + routesArchivos[i].url, setRouteArchivos(routesArchivos[i]));
	}

	// Manejador de errores:
	app.use(function(req, res, next) {
		res.status(404).render('error_404', {
			titulo: config.error.titulo,
			texto: config.error.texto
		});
	});
};