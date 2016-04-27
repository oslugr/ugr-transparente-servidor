var assert = require('chai').assert;
var config = require('../config');
var async = require('async');
var Browser = require('zombie');
var request = require('supertest');

var runLocalServer = false;
if (process.env.ENV === "prod") url = "http://transparente.ugr.es/";
else {
	var port = process.env.PORT || require('../../config/config').puerto;
	var ip = process.env.IP || "127.0.0.1";

	var url = "http://" + ip + ":" + port;
	runLocalServer = true;
}

var browser = new Browser();

function clickAll(selector, done) {
	var buttons = browser.queryAll(selector);
	async.each(buttons, function(item, cb) {
		browser.fire(item, 'click', cb);
	}, done);
}

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

function checkBreadcrumb(text) {
	browser.assert.text('#rastro-idiomas ul#rastro_breadcrumb li > span.first', text);
}

function checkAllLinks(selector, done, status) {
	var links = browser.queryAll(selector);
	async.each(links, function(item, cb) {
		var url = item.getAttribute("href");
		assert.ok(url);
		checkLink(url, cb, status);
	}, done);
}

function checkTables(done) {
	var tables = browser.queryAll("#contenido div.level1 table");
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

function checkConnection(title) {
	title = title || "UGR Transparente | Universidad de Granada";
	browser.assert.success();
	browser.assert.text('title', title);
	browser.assert.status(200);
}

function checkLayout(title) {
	browser.assert.element('#pagina');
	browser.assert.element('h1#titulo_pagina');
	browser.assert.text('#titulo_pagina span', title);
	browser.assert.element('#pagina #contenido');
}

describe('Pruebas de Navegabilidad', function() {
	this.timeout(80000);
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
	describe('Layout & Menu', function() {
		before(function(done) {
			browser.visit(url + '/', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Menu', function(done) {
			//Check number of elements
			browser.assert.element('#menus');
			browser.assert.element('#enlaces_secciones');
			browser.assert.elements('#menus .item-first_level', 7);
			browser.assert.elements('#menus .item-second_level', 8);
			browser.assert.elements('#menus a.grupos', 3);
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

			clickAll('.grupos', function(err) {
				assert.notOk(err);
				browser.assert.style('#menu_administracin', 'display', 'block');
				browser.assert.style('#menu_docencia', 'display', 'block');
				browser.assert.style('#menu_gestin-e-investigacin', 'display', 'block');
				clickAll('.grupos', function(err) {
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
			browser.assert.link('#cabecera #enlace_ugr', 'Universidad de Granada', 'http://www.ugr.es/');
			browser.assert.link('#cabecera #enlace_stack', 'UGR Transparente', '/');
			browser.assert.link('#cabecera #enlace_eadministracion', 'Administración electrónica', 'http://www.ugr.es/pages/administracion');
			browser.assert.element('#cabecera #buscador');

			checkLink('http://www.ugr.es/', function() {
				checkLink('http://www.ugr.es/pages/administracion', function() {
					done();
				});
			});
		});
		it('Footer', function(done) {
			var elem;
			browser.assert.element('#pie');

			elem = browser.query('#pie > #WAI');

			browser.assert.attribute(elem, 'href', 'http://www.w3.org/WAI/WCAG2AA-Conformance');
			browser.assert.element('#pie > #WAI > img#wcag2aa');
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

	describe('Index', function() {
		before(function(done) {
			browser.visit(url + '/', function(err) {
				assert.notOk(err);
				done();
			});
		});

		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.link('.tipo2-selected > a', 'Inicio', '/index.html');

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
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_personal');
			browser.assert.text(elem, 'Personal');
			browser.assert.attribute(elem.parentNode, 'href', '/personal.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_infoEconomica');
			browser.assert.text(elem, 'Información Económica');
			browser.assert.attribute(elem.parentNode, 'href', '/infoEconomica.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_ofertaDemanda');
			browser.assert.text(elem, 'Oferta y Demanda Académica');
			browser.assert.attribute(elem.parentNode, 'href', '/ofertaDemanda.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_claustro');
			browser.assert.text(elem, 'Claustro');
			browser.assert.attribute(elem.parentNode, 'href', '/claustro.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_estudiantes');
			browser.assert.text(elem, 'Estudiantes');
			browser.assert.attribute(elem.parentNode, 'href', '/estudiantes.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_gobierno');
			browser.assert.text(elem, 'Gobierno');
			browser.assert.attribute(elem.parentNode, 'href', '/gobierno.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_rendimiento');
			browser.assert.text(elem, 'Rendimiento');
			browser.assert.attribute(elem.parentNode, 'href', '/rendimiento.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');

			elem = browser.query('a > #en_normativaLegal');
			browser.assert.text(elem, 'Normativa Legal');
			browser.assert.attribute(elem.parentNode, 'href', '/normativaLegal.html');
			browser.assert.hasClass(elem.parentNode, 'enlaces_index');
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Inicio");
		});
	});
	describe('Información Institucional', function() {
		before(function(done) {
			browser.visit(url + '/infoInstitucional.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.link('.tipo2-selected > a', 'Información Institucional', '/infoInstitucional.html');

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
	describe('Personal', function() {
		before(function(done) {
			browser.visit(url + '/personal.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Personal', '/personal.html');

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
	describe('Información Económica', function() {
		before(function(done) {
			browser.visit(url + '/infoEconomica.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Información Económica', '/infoEconomica.html');

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
	describe('Perfil del Contratante', function() {
		before(function(done) {
			browser.visit(url + '/perfilContratante.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Perfil del Contratante', '/perfilContratante.html');

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
	describe('Oferta y Demanda Académica', function() {
		before(function(done) {
			browser.visit(url + '/ofertaDemanda.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Oferta y Demanda Académica', '/ofertaDemanda.html');

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
	describe('Claustro', function() {
		before(function(done) {
			browser.visit(url + '/claustro.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Claustro', '/claustro.html');

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
	describe('Estudiantes', function() {
		before(function(done) {
			browser.visit(url + '/estudiantes.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Estudiantes', '/estudiantes.html');

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
	describe('Gobierno', function() {
		before(function(done) {
			browser.visit(url + '/gobierno.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Gobierno', '/gobierno.html');

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
	describe('Rendimiento', function() {
		this.timeout(100000);
		before(function(done) {
			browser.visit(url + '/rendimiento.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.elements('.tipo1-selected', 1);
			browser.assert.link('.tipo1-selected > a', 'Rendimiento', '/rendimiento.html');

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
	describe('Normativa Legal', function() {
		before(function(done) {
			browser.visit(url + '/normativaLegal.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.link('.tipo2-selected > a', 'Normativa Legal', '/normativaLegal.html');

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
	describe('Solicitud de Información', function() {
		before(function(done) {
			browser.visit(url + '/solicitudInfo.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.link('.tipo2-selected > a', 'Solicitud de Información', '/solicitudInfo.html');

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
	describe('Buscador', function() {
		before(function(done) {
			browser.visit(url + '/buscador.html', function(err) {
				assert.notOk(err);
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
		});
		it('Búsqueda', function(done) {
			browser.fill('#sq', 'personal').pressButton('#submit_buscar', function(err) {
				assert.notOk(err);
				setTimeout(function() {
					checkConnection();
					browser.assert.elements("#contenido li>a.seccion", {
						atLeast: 10
					});
					done();
				}, 5 * 1000);
			});
		});
		it.skip('Links',function(done){
			return done(new Error("not implemented"));
		});
		it('Menú de Rastro', function() {
			checkBreadcrumb("Buscador");
		});
	});
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
			browser.assert.elements('.tipo2-selected', 0);
			browser.assert.elements('.tipo1-selected', 0);
			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it('Layout', function() {
			checkLayout('Página no encontrada (Error 404)');
		});
	});

	describe('Mapa web', function() {
		before(function(done) {
			browser.visit(url + '/mapaWeb.html', function(err) {
				assert.notOk(err);
				done();
			});
		});
		it('Connection', function() {
			checkConnection();
		});
		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 0);
			browser.assert.elements('.tipo1-selected', 0);
			browser.assert.style('#menu_administracin', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestin-e-investigacin', 'display', 'none');
		});
		it.skip('Layout', function() {
			return new Error("Not implmented");
		});
	});
});
