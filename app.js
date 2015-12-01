/*
UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
Copyright (C) 2014 Jaime Torres Benavente, Óscar Zafra Megías
Copyright (C) 2015 Mario Heredia Moreno, Germán Martínez Maldonado

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


// Dependencias
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var debug = require('debug')('ugr-transparente-servidor:server');
var favicon = require('serve-favicon');
var http = require('http');
var logger = require('morgan');
var path = require('path');

global.root = path.resolve(__dirname);

// Rutas
var index = require(root + '/routes/index');
var infoInstitucional = require(root + '/routes/infoInstitucional');
var administracion = require(root + '/routes/administracion');
var docencia = require(root + '/routes/docencia');
var gestionInvestigacion = require(root + '/routes/gestionInvestigacion');
var normativaLegal = require(root + '/routes/normativaLegal');
var solicitudInfo = require(root + '/routes/solicitudInfo');
var map = require(root + '/routes/mapaweb');
var buscador = require(root + '/routes/buscador');
var prueba = require(root + '/routes/prueba');

// Librerías
var cargar = require(root + '/lib/cargar');
// Prueba de escritura de JSON recuperado de API
//var escribir = require(__dirname+'/lib/putJSON');
//escribir();

// Crea aplicación web con Express
var app = express();

// Carga y exporta el archivo de configuración de la aplicación
config = cargar(root + '/config/config.json');
module.exports.config = config;

// Archivos de configuración de cada unas de las páginas
module.exports.personal = cargar(root + '/config/personal.json');
module.exports.infoEconomica = cargar(root + '/config/infoEconomica.json');
module.exports.servicios = cargar(root + '/config/servicios.json');
module.exports.ofertaDemanda = cargar(root + '/config/ofertaDemanda.json');
module.exports.claustro = cargar(root + '/config/claustro.json');
module.exports.estudiantes = cargar(root + '/config/estudiantes.json');
module.exports.mision = cargar(root + '/config/mision.json');
module.exports.planEstrategico = cargar(root + '/config/planEstrategico.json');
module.exports.gobierno = cargar(root + '/config/gobierno.json');
module.exports.rendimiento = cargar(root + '/config/rendimiento.json');
module.exports.normativaLegal = cargar(root + '/config/normativaLegal.json');
module.exports.prueba = cargar(root + '/config/prueba.json');

// Inicio
app.get('/', index.index);
app.get('/index.html', index.index);
// Información institucional
app.get('/infoInstitucional.html', infoInstitucional.infoInstitucional);
// Administracion
app.get('/personal.html', administracion.personal);
app.get('/infoEconomica.html', administracion.infoEconomica);
app.get('/servicios.html', administracion.servicios);
app.get('/perfilContratante.html', administracion.perfil);
// Docencia
app.get('/ofertaDemanda.html', docencia.ofertaDemanda);
app.get('/claustro.html', docencia.claustro);
app.get('/estudiantes.html', docencia.estudiantes);
// Gestion e Investigación
app.get('/mision.html', gestionInvestigacion.mision);
app.get('/planEstrategico.html', gestionInvestigacion.planEstrategico);
app.get('/gobierno.html', gestionInvestigacion.gobierno);
app.get('/rendimiento.html', gestionInvestigacion.rendimiento);
// Normativa Legal
app.get('/normativaLegal.html', normativaLegal.normativaLegal);
// Solicitudes de Información
app.get('/solicitudInfo.html', solicitudInfo.solicitudInfo);
// Mapa del sitio
//app.get('/mapaweb.html', map.mapa);
// Buscador
app.get('/buscador.html', buscador.buscador);
// Prueba para nueva visualización de tablas
app.get('/prueba.html', prueba.personal);

// Archivos de datos
app.get('/archivos/personal', function(req, res) {
  res.send(cargar(root + '/config/personal.json'));
});
app.get('/archivos/informacion-economica', function(req, res) {
  res.send(cargar(root + '/config/infoEconomica.json'));
});
app.get('/archivos/servicios', function(req, res) {
  res.send(cargar(root + '/config/servicios.json'));
});
app.get('/archivos/oferta-demanda', function(req, res) {
  res.send(cargar(root + '/config/ofertaDemanda.json'));
});
app.get('/archivos/claustro', function(req, res) {
  res.send(cargar(root + '/config/claustro.json'));
});
app.get('/archivos/estudiantes', function(req, res) {
  res.send(cargar(root + '/config/estudiantes.json'));
});
app.get('/archivos/mision', function(req, res) {
  res.send(cargar(root + '/config/mision.json'));
});
app.get('/archivos/plan-estrategico', function(req, res) {
  res.send(cargar(root + '/config/planEstrategico.json'));
});
app.get('/archivos/gobierno', function(req, res) {
  res.send(cargar(root + '/config/gobierno.json'));
});
app.get('/archivos/rendimiento', function(req, res) {
  res.send(cargar(root + '/config/rendimiento.json'));
});
app.get('/archivos/normativa-legal', function(req, res) {
  res.send(cargar(root + '/config/normativaLegal.json'));
});

// Variables de entorno (puerto de escucha y dirección IP)
app.set('port', process.env.PORT);
app.set('ip', process.env.IP);
// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

// Favicon
app.use(favicon(root + '/public/favicon/favicon.ico'));
// Logger de solicitudes HTTP
app.use(logger('dev'));
// Parseadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Manejador de enrutado
app.use(express.static(path.join(__dirname, 'public')));
// Manejador de errores:
app.use(function(req, res, next) {
  res.status(404).render('404_error', {
    titulo: config.error.titulo,
    texto: config.error.texto
  });
});

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Express server listening on ' + app.get('ip') + ':' + app.get('port'));
});

module.exports = app;
