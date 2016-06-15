// # Test de Navegabilidad
// Pruebas de navegabilidad de transparente


/*UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
Copyright (C) 2015 Germán Martínez Maldonado
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

// * **Chai:** Módulo de aserciones
// * **Async:** Librería para código asíncrono
// * **Zombie:** Módulo para tests de navegabilidad
// * **Supertest:** Peticiones Http

var assert = require('chai').assert;
var async = require('async');
var Browser = require('zombie');
var request = require('supertest');

// #### Dependencias locales

// * [**Configuración de tests**](../config.html): Datos de configuración de los tests
// * [**Configuración de servidor**](../../config/config.html): Puerto por defecto de transparente

var config = require('../config');

// ### Configuración de test
// * `process.env.ENV==="prod"`: Pruebas sobre el servidor externo en producción (dado por la url)
//   * url: web de transparente par realizar pruebas en producción
// * `process.env.ENV!="prod"`: Pruebas sobre servidor local
//   * `process.env.PORT:` Puerto del servidor local (por defecto el de configuración)
//   * `rocess.env.IP`: Dirección IP del servidor local (por defecto localhost)

var runLocalServer = false;
var url;
if (process.env.ENV === "prod") url = "http://transparente.ugr.es";
else {
	var port = process.env.PORT || require('../../config/config').puerto;
	var ip = process.env.IP || "127.0.0.1";

	url = "http://" + ip + ":" + port;
	runLocalServer = true;
}
var browser = new Browser({
	maxWait: 10000,
	waitFor: 6000
});

// ### Funciones Auxiliares
// * `clickAll(selector,done)`: Pincha todos los elementos que coinciden con el selector dado, ejecuta callback después de haber pinchado todos los elementos
function clickAll(selector, done) {
	var buttons = browser.queryAll(selector);
	async.each(buttons, function(item, cb) {
		browser.fire(item, 'click', cb);
	}, done);
}
// * `checkLink(link,done,status)`: Comprueba que el link proporcionado devuelve un código válido (menor de 400), si status está definido, se comprobará que el código coincide. Si el código devuelto es una redirección, se redireccionará antes de realizar las comprobaciones
function checkLink(link, done, status) {
	var dir;
	var url2;
	if (link[0] === "#") return done();
	if (link[0] === "/") {
		dir = link;
		url2 = url;
	} else {
		var arr = link.split('/');
		url2 = arr[0] + "//" + arr[2];
		dir = link.split(arr[2])[1];
		if (dir === "") dir = "/";
	}
	assert.ok(url2);
	assert.ok(dir);

	request(url2).get(dir)
		.end(function(err, res) {
			assert.notOk(err);
			if (res.status >= 300 && res.status < 400) {
				var loc = res.header.location;
				assert.ok(loc);
				return checkLink(loc, done, status);
			}
			if (status) assert.strictEqual(res.status, status);
			else assert.isBelow(res.status, 400, res.status + " on " + link);
			return done();
		});
}
// * `checkBreadcrumb(text)`: Comprueba el texto del elemento breadcrumb (rastro)
function checkBreadcrumb(text) {
	browser.assert.text('#breadcrumb > ul.rastro-breadcrumb > li.breadcrumb-li', text);
}
// * `checkAllLinks(selector, done, status)`: Ejecuta checkLink sobre todos los links coincidentes con el selector dado
function checkAllLinks(selector, done, status) {
	var links = browser.queryAll(selector);
	async.each(links, function(item, cb) {
		var url = item.getAttribute("href");
		assert.ok(url);
		checkLink(url, cb, status);
	}, done);
}
// * `checkTables(done)`: Función genérica de comprobación de tablas, comprobará que se han generado correctamente y los links de esta
function checkTables(done) {
	var tables = browser.queryAll("#contenido table.tabla-datos");
	async.each(tables, function(item, cb) {
		var rows = browser.queryAll("tr", item);
		assert.isAbove(rows.length, 1);
		var links = browser.queryAll("a", item);
		async.each(links, function(item, cb2) {
			var url = item.getAttribute("href");
			var url2 = item.getAttribute("rel");
			assert.ok(url);
			checkLink(url, function() {
				if (url2) checkLink(url2, cb2);
				else cb2();
			});
		}, cb);
	}, done);
}
// * `checkConnection(title)`: Función genérica de comprobación de conexión básica, comprobará el _status_ y el titulo (si no se define el titulo tomará un valor por defecto)
function checkConnection(title) {
	title = title || "UGR Transparente | Universidad de Granada";
	browser.assert.success();
	browser.assert.text('title', title);
	browser.assert.status(200);
}
// * `checkLayout(title)`: Función genérica de comprobación de layout de contenido central, comprobará titulo y elementos contenedores básicos
function checkLayout(title) {
	browser.assert.element('#pagina');
	browser.assert.element('h1#titulo_pagina');
	browser.assert.text('#titulo_pagina span', title);
	browser.assert.element('#pagina #contenido');
}

// ### Pruebas de Navegabilidad
// Pruebas de simulación de navegación
// * _before:_ Inicia el servidor
// * _after:_ Cierra el servidor
// * _timeout:_ 50 segundos
describe('Pruebas de Navegabilidad', function() {
	this.timeout(50000);
	var server;
	var app;
	if (runLocalServer) console.log("- Local Server -");
	before(function(done) {
		if (runLocalServer) {
			config.initServer(function(app2, server2) {
				server = server2;
				app = app2;
				return done();
			}, true);
		} else return done();
	});
	after(function() {
		if (runLocalServer) server.close();
	});

	// * **Layout & Menu**: Comprobación de Layout general y menú lateral
	//    * Menu: Comprueba el menú lateral generado y su funcionamiento al pinchar
	//    * Banners: Comprueba banners laterales generados
	//    * Header: Prueba el Header (layout, menú de búsqueda,...)
	//    * Footer: Comprueba el footer generado y links
	describe('Layout & Menu', function() {
		before(function(done) {
			browser.visit(url + '/', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Menu', function(done) {
			//Check number of elements
			browser.assert.element('#menus');
			browser.assert.element('#enlaces_secciones');
			browser.assert.elements('#menus .menu-link-tipo2', 6);
			browser.assert.elements('#menus .menu-link-tipo2-selected', 1);
			browser.assert.elements('#menus .mod-menu_secciones>li', 7);
			browser.assert.elements('#menus .menu-link-tipo1', 8);
			browser.assert.elements('#menus .desplegable', 3);
			//Links
			browser.assert.link('#menus a', 'Inicio', '/index.html');
			browser.assert.link('#menus a', 'Información Institucional', '/infoInstitucional.html');
			browser.assert.link('#menus a', 'Personal', '/personal.html');
			browser.assert.link('#menus a', 'Información Económica', '/infoEconomica.html');
			browser.assert.link('#menus a', 'Perfil del Contratante', '/perfilContratante.html');
			browser.assert.link('#menus a', 'Oferta y Demanda Académica', '/ofertaDemanda.html');
			browser.assert.link('#menus a', 'Claustro', '/claustro.html');
			browser.assert.link('#menus a', 'Estudiantes', '/estudiantes.html');
			browser.assert.link('#menus a', 'Gobierno', '/gobierno.html');
			browser.assert.link('#menus a', 'Rendimiento', '/rendimiento.html');
			browser.assert.link('#menus a', 'Normativa Legal', '/normativaLegal.html');
			browser.assert.link('#menus a', 'Solicitud de Información', '/solicitudInfo.html');
			//Clicking
			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');

			clickAll('#menus .desplegable', function(err) {
				assert.notOk(err);
				browser.assert.style('#menu_administracin', 'display', 'block');
				browser.assert.style('#menu_docencia', 'display', 'block');
				browser.assert.style('#menu_gestin-e-investigacin', 'display', 'block');
				clickAll('#menus .desplegable', function(err) {
					assert.notOk(err);
					browser.assert.style('#menu_administracin', 'display', 'none');
					browser.assert.style('#menu_docencia', 'display', 'none');
					browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
					done();
				});
			});
		});
		it('Banners', function(done) {
			browser.assert.element("#banners");
			browser.assert.element('#banners ul');
			browser.assert.elements('#banners ul li', {
				atLeast: 4
			});
			browser.assert.elements('#banners li a', {
				atLeast: 4
			});
			browser.assert.elements('#banners li a>p', {
				atLeast: 4
			});
			browser.assert.elements('#banners li a>strong', {
				atLeast: 4
			});
			checkAllLinks("#banners ul a", done);
		});
		it('Header', function(done) {
			browser.assert.element('#cabecera');
			browser.assert.link('#cabecera .enlace_ugr', 'Universidad de Granada', 'http://www.ugr.es/');
			browser.assert.link('#cabecera .enlace_stack', 'UGR Transparente', '/');
			browser.assert.link('#cabecera .enlace_eadministracion', 'Administración electrónica', 'http://www.ugr.es/pages/administracion');
			browser.assert.element('#cabecera #buscador-top');

			checkLink('http://www.ugr.es/', function() {
				checkLink('http://www.ugr.es/pages/administracion', function() {
					done();
				});
			});
		});
		it('Footer', function(done) {
			browser.assert.element('#pie');
			browser.assert.elements('#pie  .footer-link',6);
			browser.assert.link('#pie > a', "Mapa del sitio", "mapaWeb.html");
			browser.assert.link('#pie > a', "Este servidor es software libre", "https://github.com/oslugr/ugr-transparente-servidor");
			browser.assert.link('#pie > a', "Liberado bajo GPL v3.0", "http://www.gnu.org/licenses/gpl-3.0.html");
			browser.assert.link('#pie > a', "Contacto", "http://www.ugr.es/pages/contacto");
			browser.assert.link('#pie > a', "Ir a sugerencias", "https://github.com/oslugr/ugr-transparente-servidor/issues");

			browser.assert.element('#pie > p');
			browser.assert.link('#pie > p a', "© 2016", 'http://www.ugr.es/pages/creditos');
			browser.assert.link('#pie > p a', "Universidad de Granada", 'http://www.ugr.es');
			checkLink('http://www.ugr.es/pages/creditos', function() {
				checkLink('http://www.ugr.es/', function() {
					checkLink('http://www.w3.org/WAI/WCAG2AA-Conformance', function() {
						checkLink('https://github.com/oslugr/ugr-transparente-servidor', function() {
							checkLink('http://www.gnu.org/licenses/gpl-3.0.html', function() {
								checkLink('http://www.ugr.es/pages/contacto', function() {
									checkLink('https://github.com/oslugr/ugr-transparente-servidor/issues', done);
								});
							});
						});
					});
				});
			});
		});
	});
	// * **Index**: Comprobación del menú principal `/index.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Index Menu: Prueba del menú central del inicio
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Index', function() {
		before(function(done) {
			browser.visit(url + '/index.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.link('a.menu-link-tipo2-selected', 'Inicio', '/index.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Inicio');
		});
		it('Index Menu', function() {
			var elem;
			elem = browser.query('a > #en_infoInstitucional');
			browser.assert.text(elem, 'Información Institucional');
			browser.assert.attribute(elem.parentNode, 'href', '/infoInstitucional.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_personal');
			browser.assert.text(elem, 'Personal');
			browser.assert.attribute(elem.parentNode, 'href', '/personal.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_infoEconomica');
			browser.assert.text(elem, 'Información Económica');
			browser.assert.attribute(elem.parentNode, 'href', '/infoEconomica.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_ofertaDemanda');
			browser.assert.text(elem, 'Oferta y Demanda Académica');
			browser.assert.attribute(elem.parentNode, 'href', '/ofertaDemanda.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_claustro');
			browser.assert.text(elem, 'Claustro');
			browser.assert.attribute(elem.parentNode, 'href', '/claustro.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_estudiantes');
			browser.assert.text(elem, 'Estudiantes');
			browser.assert.attribute(elem.parentNode, 'href', '/estudiantes.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_gobierno');
			browser.assert.text(elem, 'Gobierno');
			browser.assert.attribute(elem.parentNode, 'href', '/gobierno.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_rendimiento');
			browser.assert.text(elem, 'Rendimiento');
			browser.assert.attribute(elem.parentNode, 'href', '/rendimiento.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');

			elem = browser.query('a > #en_normativaLegal');
			browser.assert.text(elem, 'Normativa Legal');
			browser.assert.attribute(elem.parentNode, 'href', '/normativaLegal.html');
			browser.assert.hasClass(elem.parentNode, 'enlace_index');
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Inicio");
		});
	});
	// * **Información Institucional**: Comprobación de la información institucional `/infoInstitucional.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Links: Prueba de los links del contenido principal
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Información Institucional', function() {
		before(function(done) {
			browser.visit(url + '/infoInstitucional.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.link('a.menu-link-tipo2-selected', 'Información Institucional', '/infoInstitucional.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Información Institucional');
		});
		it('Links', function(done) {
			browser.assert.elements('#contenido li a', 10);
			checkAllLinks('#contenido li a', done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Información Institucional");
		});
	});
	// * **Personal**: Comprobación de la información del personal `/personal.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Personal', function() {
		before(function(done) {
			browser.visit(url + '/personal.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Personal', '/personal.html');

			browser.assert.style('#menu_administracin', 'display', 'block');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Personal');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Administración / Personal");
		});
	});
	// * **Información Económica**: Comprobación de la información económica `/infoEconomica.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Información Económica', function() {
		before(function(done) {
			browser.visit(url + '/infoEconomica.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Información Económica', '/infoEconomica.html');

			browser.assert.style('#menu_administracin', 'display', 'block');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Información Económica');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Administración / Información Económica");
		});
	});
	// * **Perfil del Contratante**: Comprobación del perfil del contratante `/perfilContratante.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Perfil del Contratante', function() {
		before(function(done) {
			browser.visit(url + '/perfilContratante.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('.menu-link-tipo1-selected', 'Perfil del Contratante', '/perfilContratante.html');

			browser.assert.style('#menu_administracin', 'display', 'block');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function(done) {
			checkLayout('Perfil del Contratante');
			var elem = browser.query('#pagina strong');
			browser.assert.text(elem, 'Acceso al Perfil del Contratante');

			browser.assert.link('#pagina p > a', 'perfil del contratante', 'http://econtra.ugr.es/licitacion');
			checkLink("http://econtra.ugr.es/licitacion", done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Administración / Perfil del Contratante");
		});
	});
	// * **Oferta y Demanda Académica**: Comprobación de la información de oferta y demanda académica `/ofertaDemanda.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Oferta y Demanda Académica', function() {
		before(function(done) {
			browser.visit(url + '/ofertaDemanda.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Oferta y Demanda Académica', '/ofertaDemanda.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'block');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Oferta y Demanda Académica');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Docencia / Oferta y Demanda Académica");
		});
	});
	// * **Claustro**: Comprobación del claustro `/claustro.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Claustro', function() {
		before(function(done) {
			browser.visit(url + '/claustro.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Claustro', '/claustro.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'block');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Claustro');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Docencia / Claustro");
		});
	});
	// * **Estudiantes**: Comprobación de estudiantes `/estudiantes.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Estudiantes', function() {
		before(function(done) {
			browser.visit(url + '/estudiantes.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Estudiantes', '/estudiantes.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'block');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Estudiantes');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Docencia / Estudiantes");
		});
	});
	// * **Gobierno**: Comprobación de la información de gobierno `/gobierno.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Gobierno', function() {
		before(function(done) {
			browser.visit(url + '/gobierno.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Gobierno', '/gobierno.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'block');
		});
		it('Layout', function() {
			checkLayout('Gobierno');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Gestión e Investigación / Gobierno");
		});
	});
	// * **Rendimiento**: Comprobación de la información de rendimiento `/rendimiento.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Rendimiento', function() {
		before(function(done) {
			browser.visit(url + '/rendimiento.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.elements('a.menu-link-tipo1-selected', 1);
			browser.assert.link('a.menu-link-tipo1-selected', 'Rendimiento', '/rendimiento.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'block');
		});
		it('Layout', function() {
			checkLayout('Rendimiento');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Gestión e Investigación / Rendimiento");
		});
	});
	// * **Normativa Legal**: Comprobación de la normativa legal `/normativaLegal.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Tablas: Prueba genérica de las tablas generadas
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Normativa Legal', function() {
		before(function(done) {
			browser.visit(url + '/normativaLegal.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.link('a.menu-link-tipo2-selected', 'Normativa Legal', '/normativaLegal.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Normativa Legal');
		});
		it('Tablas', function(done) {
			checkTables(done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Normativa Legal");
		});
	});
	// * **Solicitud de Información**: Comprobación de menú de solicitud de información `/solicitudInfo.html`
	//    * Connection: Comprobación de conexión y título
	//    * Menu: Comprobación del estado del menú lateral
	//    * Layout: Comprobación básica del Layout general
	//    * Formulario: Prueba del acceso al formulario de solicitud
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe('Solicitud de Información', function() {
		before(function(done) {
			browser.visit(url + '/solicitudInfo.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 1);
			browser.assert.link('a.menu-link-tipo2-selected', 'Solicitud de Información', '/solicitudInfo.html');

			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Solicitud de Información');
		});
		it('Formulario', function(done) {
			browser.assert.link('#pagina a', 'Acceso al Formulario', 'https://sede.ugr.es/sede/catalogo-de-procedimientos/solicitud-generica.html');
			//https without certificate!
			//checkLink('https://sede.ugr.es/sede/catalogo-de-procedimientos/solicitud-generica.html', done);
			browser.assert.link('#pagina a', 'Ley 19/2013, de 9 de diciembre, de transparencia, acceso a la información pública y buen gobierno.', 'http://www.boe.es/boe/dias/2013/12/10/pdfs/BOE-A-2013-12887.pdf');
			checkLink('http://www.boe.es/boe/dias/2013/12/10/pdfs/BOE-A-2013-12887.pdf', done);
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Solicitud de Información");
		});
	});
	// * **Buscador**: Comprobación del buscador y resultados `/buscador.html`
	//    * Connection: Comprobación de conexión
	//    * Layout: Comprobación del layout especfico del buscador
	//    * Búsqueda: Prueba de búsqueda y resultados obtenidos
	//    * Links: Prueba de los links generados por el buscador
	//    * Menú de Rastro: Comprobación del menú de ratro (breadcrumb)
	describe.skip('Buscador', function() {
		beforeEach(function(done) {
			browser.visit(url + '/buscador.html', function(err) {

				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Layout', function() {
			browser.assert.element('#sq');
			browser.assert.element('#submit_buscar');
			browser.assert.element('#contenido p');
			browser.assert.element('#buscador');
			browser.assert.text('#buscador>h2', "Buscador del portal");
			browser.assert.elements('#contenido li>a.seccion', 0);
		});
		it('Búsqueda', function(done) {
			browser.fill('#sq', 'personal').pressButton('#submit_buscar', function(err) {
				//assert.notOk(err);
				setTimeout(function() {
					checkConnection();
					browser.assert.elements("#contenido li>a.seccion", {
						atLeast: 20
					});
					done();
				}, 5 * 5000);
			});
		});
		it('Links', function(done) {
			browser.visit(url + '/buscador.html?query=personal&submit.x=0&submit.y=0', function(err) {
				//assert.notOk(err);
				browser.assert.elements("#contenido li>a.seccion", {
					atLeast: 20
				});
				checkAllLinks("#contenido li>a.seccion", function(err) {
					assert.notOk(err);
					done();
				});
			});
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Buscador");
		});
	});
	// * **404 page**: Comprobación de la página de error 404 (probando con `/foo`)
	//    * Connection: Comprobación de conexión, titúlo y estado 404
	//    * Menu: Comprobación del menú lateral (nada seleccionado)
	//    * Layout: Comprobación básica del Layout general
	describe('404 page', function() {
		before(function(done) {
			browser.visit(url + '/foo', function(err) {
				done();
			});
		});
		it('Connection', function() {
			var title = "UGR Transparente | Universidad de Granada";
			browser.assert.text('title', title);
			browser.assert.status(404);
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 0);
			browser.assert.elements('a.menu-link-tipo1-selected', 0);
			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Página no encontrada (Error 404)');
		});
	});
	// * **Mapa Web**: Comprobación del mapa web (`/mapaWeb.html`)
	//    * Connection: Comprobación de conexión, titúlo y estado 404
	//    * Menu: Comprobación del menú lateral
	//    * Layout: Comprobación básica del Layout general y elementos específicos del mapa web
	describe('Mapa web', function() {
		before(function(done) {
			browser.visit(url + '/mapaWeb.html', function(err) {
				//assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('a.menu-link-tipo2-selected', 0);
			browser.assert.elements('a.menu-link-tipo1-selected', 0);
			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Mapa del sitio');
			browser.assert.elements('.seccion', 7);
			browser.assert.elements('.seccion2', 9);
			browser.assert.elements('.seccion3', 55);

			//TODO: check links?
		});
	});
});
