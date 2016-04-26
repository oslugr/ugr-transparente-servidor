// # Test de Acceso

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
// * **Supertest:** Peticiones Http
// * **Async:** Librería para código asíncrono
var assert = require('chai').assert;
var request = require('supertest');
var async = require('async');

// Archivo de configuración de tests
var config = require('./config.js');

// ### Pruebas de Acceso
// Acceso a las diversas páginas y recursos del servidor local
// * _before:_ Inicia el servidor
// * _after:_ Cierra el servidor
// * _timeout:_ 12 segundos
describe('Pruebas de acceso', function() {
	this.timeout(12000);
	var server;
	var app;
	before(function(done) {
		config.initServer(function(app2, server2) {
			server = server2;
			app = app2;
			done();
		}, true);
	});

	after(function() {
		server.close();
	});

	// #### Test Unitarios

	// * Acceso a todas las páginas del servidor, deben devolver código 200 y Html
	it("Acceso a páginas", function(done) {
		async.eachSeries(config.direcciones, function(url, callback) {
			request(app).get(url)
				.expect(200)
				.expect('Content-Type', "text/html; charset=utf-8")
				.end(function(err, res) {
					assert.notOk(err);
					callback();
				});
		}, function() {
			done();
		});
	});

	// * Acceso a diversos recursos estáticos, debe devolver código 200
	it("Acceso a recursos", function(done) {
		async.eachSeries(config.archivosEstaticos, function(url, callback) {
			request(app).get(url).expect(200).end(function(err, res) {
				assert.notOk(err);
				callback();
			});
		}, function() {
			done();
		});
	});

	// * Comprueba un acceso a página inexistente ('/foo'), espera código 404
	it("404 page", function(done) {
		request(app)
			.get("/foo")
			.expect(404)
			.end(function(err, res) {
				assert.notOk(err);
				done();
			});
	});

	// * Comprueba las direcciones a los datos del buscador, espera un JSON y código 200
	it("Archivos de buscador", function(done) {
		async.eachSeries(config.archivosBuscador, function(url, callback) {
			request(app).get(url)
				.expect(200)
				.expect('Content-Type', "application/json; charset=utf-8")
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res.body);
					assert.ok(res.body.nombre);
					callback();
				});
		}, function() {
			done();
		});
	});
});

// ### Pruebas en Producción
// Pruebas de acceso con configuración de producción
// * _before:_ Inicia el servidor en producción
// * _after:_ Cierra el servidor
// * _timeout:_ 12 segundos
describe("Pruebas en producción", function() {
	this.timeout(12000);
	var server;
	var app;
	before(function(done) {
		config.initServer(function(app2, server2) {
			server = server2;
			app = app2;
			done();
		}, false);
	});
	after(function() {
		server.close();
	});

	// * Acceso a archivos estáticos en producción debe devolver 404
	// > Los recursos no se sirven por express, sino por servidor externo, en local no se debe poder acceder a ellos
	it("Archivos estáticos en producción", function(done) {
		async.eachSeries(config.archivosEstaticos, function(url, callback) {
			request(app).get(url).expect(404).end(function(err, res) {
				assert.notOk(err);
				callback();
			});
		}, function() {
			done();
		});
	});

	// * Acceso a todas las páginas del servidor, deben devolver código 200 y un archivo Html
	it("Acceso a páginas", function(done) {
		async.eachSeries(config.direcciones, function(url, callback) {
			request(app).get(url)
				.expect(200)
				.expect('Content-Type', "text/html; charset=utf-8")
				.end(function(err, res) {
					assert.notOk(err);
					callback();
				});
		}, function() {
			done();
		});
	});
});

// ### Pruebas de Servidor
// Prueba de acceso a servidor principal (`app.js`)
// * _timeout:_ 3 segundos
describe("Pruebas de servidor", function() {
	this.timeout(3000);
	// * Ejecución de servidor y acceso a dirección principal (`/`)
	it('Ejecución de servidor', function(done) {
		var server = require('../app');
		assert.ok(server);
		setTimeout(function() {
			request(server).get('/').expect(200).end(function(err, res) {
				assert.notOk(err);
				assert.ok(res);
				server.close();
				done();
			});
		}, 700);
	});
});