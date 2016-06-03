// # Rutas

/*
Configuración de las rutas de transparente.ugr.es, añadirá las rutas genéricas y las rutas especificas
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


// ### Dependencias locales

// * [**Rutas configurables**](./routes/routesConfig.html): Rutas genéricas de transparente.ugr
// * [**Configuración**](./config/config.html): Configuración del servidor
// * **Configuración de rutas específicas**
//   * [**Index**](./routes/index.html): Ruta a página principal
//   * [**Mapa Web**](./routes/mapaWeb.html): Ruta a mapa web
var routesList = require('./routes/routesConfig').routes;
var routesBusqueda = require('./routes/routesConfig').routesBusqueda;
var config = require('../config/config');

var index = require('./routes/index');
var mapaWeb = require('./routes/mapaWeb');
var calendario = require('./routes/calendario');
var calendarioSolo = require('./routes/calendarioSolo');
var buscador = require('./routes/buscador');

// ### Configuración de Rutas
// Asigna todas las rutas de transparente.ugr
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
	// Configuración de rutas genéricas
	for (var i = 0; i < routesList.length; i++) {
		app.get(routesList[i].url, setRoute(routesList[i]));
	}

	// #### Otras Rutas
	// * Inicio: `/` y `/index.html`
	// * Mapa del sitio: `/mapaWeb.html`
	// * Calendario: `/calendario.html` y `/calendarioSolo.html`
	app.get('/', index.index);
	app.get('/index.html', index.index);
	app.get('/mapaWeb.html', mapaWeb.mapaWeb);
	app.get('/calendario.html', calendario.index);
	app.get('/calendarioSolo.html', calendarioSolo.index);

	// #### Rutas del buscador
	// Rutas a los recursos json que usa el buscador
	buscador('/buscador.html', app);

	function setRouteArchivos(routeConf) {
		return function(req, res) {
			res.json(routeConf.datos);
		};
	}
	for (i = 0; i < routesBusqueda.length; i++) {
		app.get('/archivos' + routesBusqueda[i].url, setRouteArchivos(routesBusqueda[i]));
	}

	// #### Manejador de errores
	// Devuelve un 404 en caso de no enrutar correctamente
	app.use(function(req, res, next) {
		res.status(404).render('error_404', {
			seccion: config.error.titulo,
			texto: config.error.texto
		});
	});
};

// ### Exports
// * `function(app)`: asigna las rutas a la app de express