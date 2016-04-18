"use strict";
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
var mapaWeb = require('./routes/mapaWeb');
var calendario = require('./routes/calendario');
var calendarioSolo = require('./routes/calendarioSolo');


var config = require('../config/config');


//Rutas configurables
var routesList = require('./routes/routesConfig').routes;
var routesBusqueda = require('./routes/routesConfig').routesBusqueda;

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
	for (var i = 0; i < routesList.length; i++) {
		app.get(routesList[i].url, setRoute(routesList[i]));
	}

	//LEGACY Routes
	// Inicio
	app.get('/', index.index);
	app.get('/index.html', index.index);

	// Mapa del sitio
	app.get('/mapaWeb.html', mapaWeb.mapaWeb);
	// Calendario
	app.get('/calendario.html', calendario.index);
	app.get('/calendarioSolo.html', calendarioSolo.index);


	// Archivos de datos
	function setRouteArchivos(routeConf) {
		return function(req, res) {
			res.json(routeConf.datos);
		};
	}
	for (i = 0; i < routesBusqueda.length; i++) {
		app.get('/archivos' + routesBusqueda[i].url, setRouteArchivos(routesBusqueda[i]));
	}

	// Manejador de errores:
	app.use(function(req, res, next) {
		res.status(404).render('error_404', {
			titulo: config.error.titulo,
			texto: config.error.texto
		});
	});
};
