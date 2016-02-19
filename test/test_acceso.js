/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
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
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var assert = require('chai').assert;
var request = require('supertest');
var async = require('async');

var config = require('./config.js');

describe('Pruebas de acceso', function() {
	var server;
	var app;
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

	it("Acceso a páginas", function(done) {
		this.timeout(10000);
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
	it("Acceso a recursos", function(done) {
		//TODO: check all resources
		request(app).get('/imagenes/ugr.png').expect(200).end(function(err, res) {
			assert.notOk(err);
			done();
		});
	});
	it("Error", function(done) {
		request(app)
			.get("/foo")
			.expect(404)
			.end(function(err, res) {
				assert.notOk(err);
				done();
			});
	});

	it("Archivos de buscador", function(done) {
		this.timeout(5000);
		async.eachSeries(config.archivosBuscador, function(url, callback) {
			request(app).get(url)
				.expect(200)
				.expect('Content-Type', "application/json; charset=utf-8")
				.end(function(err, res) {
					assert.notOk(err);
					callback();
				});
		}, function() {
			done();
		});
	});
});



describe("Pruebas en producción", function() {
	var server;
	var app;
	before(function(done) {
		this.timeout(3000);
		config.initServer(function(app2, server2) {
			server = server2;
			app = app2;
			done();
		}, false);
	});
	after(function() {
		server.close();
	});

	it("Configuración de produccion", function(done) {
		request(app).get('/imagenes/ugr.png').expect(404).end(function(err, res) {
			assert.notOk(err);
			done();
		});
	});
});
