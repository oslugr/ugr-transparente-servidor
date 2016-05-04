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
var routesList = require('./routes/routesConfig').routes;
var routesBusqueda = require('./routes/routesConfig').routesBusqueda;
// * **Configuración**: Configuración del servidor
var config = require('../config/config');

// * **Configuración de rutas específicas**
//   * [**Index**](./routes/index.html): Ruta a página principal
var index = require('./routes/index');
//   * [**Mapa Web**](./routes/mapaWeb.html): Ruta a mapa web
var mapaWeb = require('./routes/mapaWeb');
//   * [**Calendario**](./routes/calendario.html): Ruta a calendario
var calendario = require('./routes/calendario');
//   * [**Calendario Solo**](./routes/calendarioSolo.html): Ruta a calendario Solo (_Legacy_)
var calendarioSolo = require('./routes/calendarioSolo');

// ### Configuración de Rutas
module.exports = function(app) {
	// función: Configura una ruta
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
    // * Inicio: / y /index.html
    app.get('/', index.index);
    app.get('/index.html', index.index);

    // * Mapa del sitio: /mapaWeb.html
    app.get('/mapaWeb.html', mapaWeb.mapaWeb);
    // * Calendario: /calendario.html y calendarioSolo.html
    app.get('/calendario.html', calendario.index);
    app.get('/calendarioSolo.html', calendarioSolo.index);


    // #### Rutas del buscador
    function setRouteArchivos(routeConf) {
        return function(req, res) {
            res.json(routeConf.datos);
        };
    }
    for (i = 0; i < routesBusqueda.length; i++) {
        app.get('/archivos' + routesBusqueda[i].url, setRouteArchivos(routesBusqueda[i]));
    }

    // #### Manejador de errores
    // Devuelve un 404 wn caso de no enrutar correctamente
    app.use(function(req, res, next) {
        res.status(404).render('error_404', {
            seccion: config.error.titulo,
            texto: config.error.texto
        });
    });
};

// **Exports:** function(app)
