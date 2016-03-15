var Browser = require('zombie');
var assert = require('chai').assert;
var config = require('./config');

Browser.localhost('localhost', 3000);

describe('Pruebas de Navegabilidad', function() {
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

		it('Connection', function(done) {
			this.timeout(3000);
			browser.visit('/', function(err) {
				assert.notOk(err);
				browser.assert.success();
				browser.assert.text('title', 'UGR Transparente | Universidad de Granada');
				done();
			});
		});
		it.skip('Menu', function(done) {



		});
		it.skip('Index Menu', function(done) {


		});
	});
});