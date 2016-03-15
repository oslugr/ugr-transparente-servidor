var Browser = require('zombie');
var assert = require('chai').assert;
var config = require('./config');
var async = require('async');

Browser.localhost('localhost', 3000);

function clickAll(browser,selector, done) {
	var buttons = browser.queryAll(selector);
	async.each(buttons, function(item, cb) {
		browser.fire(item, 'click', cb);
	}, done);
}

describe.only('Pruebas de Navegabilidad', function() {
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
				done();
			});
		});

		it('Connection', function() {
			browser.assert.success();
			browser.assert.text('title', 'UGR Transparente | Universidad de Granada');
			browser.assert.status(200);
		});
		it('Menu', function(done) {
			this.timeout(5000);
			//Check number of elements
			browser.assert.element('#enlaces_secciones');
			browser.assert.elements('.item-first_level', 7);
			browser.assert.elements('.item-second_level', 8);

			//Check menus are hide
			browser.assert.style('#menu_administración', 'display', 'none');
			browser.assert.style('#menu_docencia', 'display', 'none');
			browser.assert.style('#menu_gestion', 'display', 'none');


			clickAll(browser,'.grupos', function(err) {
				assert.notOk(err);
				browser.assert.style('#menu_administración', 'display', 'block');
				browser.assert.style('#menu_docencia', 'display', 'block');
				browser.assert.style('#menu_gestion', 'display', 'block');
				clickAll(browser,'.grupos', function(err) {
					assert.notOk(err);
					browser.assert.style('#menu_administración', 'display', 'none');
					browser.assert.style('#menu_docencia', 'display', 'none');
					browser.assert.style('#menu_gestion', 'display', 'none');
					done();
				});
			});
		});
		it.skip('Index Menu', function(done) {


		});
	});
});
