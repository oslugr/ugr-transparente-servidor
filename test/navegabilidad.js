var Browser = require('zombie');
var assert = require('chai').assert;
var config = require('./config');
var async = require('async');

Browser.localhost('localhost', 3000);

/*function clickAll(browser, selector, done) {
	var buttons = browser.queryAll(selector);
	async.each(buttons, function(item, cb) {
		browser.fire(item, 'click', cb);
	}, done);
}

describe.skip('Pruebas de Navegabilidad', function() {
	var server;
	var app;
	var browser;
	before(function(done) {
		this.timeout(3000);
		config.initServer(function(app2, server2) {
			server = server2;
			app = app2;
			done();
		}, true);
	});
	after(function() {
		server.close();
	});
	describe('Index & Layout', function() {
		browser = new Browser();

		beforeEach(function(done) {
			this.timeout(4000);
			browser.visit('/', function(err) {
				assert.notOk(err);
				browser.assert.success();
				done();
			});
		});

		it('Menu', function(done) {
			this.timeout(5000);
			//Check number of elements
			browser.assert.element('#menus');
			browser.assert.element('#enlaces_secciones');
			browser.assert.elements('#menus .item-first_level', 7);
			browser.assert.elements('#menus .item-second_level', 8);
			browser.assert.elements('#menus a.grupos',3);
			//Links
			browser.assert.link('#menus a','Inicio','/index.html');
			browser.assert.link('#menus a','Información Institucional','/infoInstitucional.html');
			browser.assert.link('#menus a','Personal','/personal.html');
			browser.assert.link('#menus a','Información Económica','/infoEconomica.html');
			browser.assert.link('#menus a','Perfil del Contratante','/perfilContratante.html');
			browser.assert.link('#menus a','Oferta y Demanda Académica','/ofertaDemanda.html');
			browser.assert.link('#menus a','Claustro','/claustro.html');
			browser.assert.link('#menus a','Estudiantes','/estudiantes.html');
			browser.assert.link('#menus a','Gobierno','/gobierno.html');
			browser.assert.link('#menus a','Rendimiento','/rendimiento.html');
			browser.assert.link('#menus a','Normativa Legal','/normativaLegal.html');
			browser.assert.link('#menus a','Solicitud de Información','/solicitudInfo.html');
			//Clicking
			browser.assert.style('#menu_administración', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestion', 'display', 'none');


			clickAll(browser, '.grupos', function(err) {
				assert.notOk(err);
				browser.assert.style('#menu_administración', 'display', 'block');
				browser.assert.style('#menu_docencia', 'display', 'block');
				browser.assert.style('#menu_gestion', 'display', 'block');
				clickAll(browser, '.grupos', function(err) {
					assert.notOk(err);
					browser.assert.style('#menu_administración', 'display', 'none');
					browser.assert.style('#menu_docencia', 'display', 'none');
					browser.assert.style('#menu_gestion', 'display', 'none');
					done();
				});
			});
		});
		it.skip('Banners',function(){
			throw(new Error("Not Implemented"));
		});
		it.skip('Header',function(){
			throw(new Error("Not Implemented"));
		});
		it.skip('Footer',function(){
			throw(new Error("Not Implemented"));
		});
	});

	describe('Index', function() {
		browser = new Browser();

		beforeEach(function(done) {
			this.timeout(4000);
			browser.visit('/', function(err) {
				assert.notOk(err);
				browser.assert.success();
				done();
			});
		});

		it('Connection', function(done) {
			browser.assert.success();
			browser.assert.text('title', 'UGR Transparente | Universidad de Granada');
			browser.assert.status(200);
			browser.visit('/index.html', function(err) {
				assert.notOk(err);
				browser.assert.success();
				browser.assert.text('title', 'UGR Transparente | Universidad de Granada');
				browser.assert.status(200);
				done();
			});
		});

		it('Menu', function() {
			browser.assert.elements('.tipo2-selected', 1);
			browser.assert.link('.tipo2-selected > a', 'Inicio', '/index.html');

			browser.assert.style('#menu_administración', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestion', 'display', 'none');

		});
		it('Index Layout',function(){
			browser.assert.element('#pagina');
			browser.assert.element('h1#titulo_pagina');
			browser.assert.text('#titulo_pagina span','Inicio');
			browser.assert.element('#pagina #contenido');
		});
		it('Index Menu', function() {
			var elem;
			elem=browser.query('a > #en_infoInstitucional');
			browser.assert.text(elem,'Información Institucional');
			browser.assert.attribute(elem.parentNode,'href','/infoInstitucional.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_personal');
			browser.assert.text(elem,'Personal');
			browser.assert.attribute(elem.parentNode,'href','/personal.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_infoEconomica');
			browser.assert.text(elem,'Información Económica');
			browser.assert.attribute(elem.parentNode,'href','/infoEconomica.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_ofertaDemanda');
			browser.assert.text(elem,'Oferta y Demanda Académica');
			browser.assert.attribute(elem.parentNode,'href','/ofertaDemanda.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_claustro');
			browser.assert.text(elem,'Claustro');
			browser.assert.attribute(elem.parentNode,'href','/claustro.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_estudiantes');
			browser.assert.text(elem,'Estudiantes');
			browser.assert.attribute(elem.parentNode,'href','/estudiantes.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_gobierno');
			browser.assert.text(elem,'Gobierno');
			browser.assert.attribute(elem.parentNode,'href','/gobierno.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_rendimiento');
			browser.assert.text(elem,'Rendimiento');
			browser.assert.attribute(elem.parentNode,'href','/rendimiento.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
			
			elem=browser.query('a > #en_normativaLegal');
			browser.assert.text(elem,'Normativa Legal');
			browser.assert.attribute(elem.parentNode,'href','/normativaLegal.html');
			browser.assert.hasClass(elem.parentNode,'enlaces_index');
		});

	});
});*/
