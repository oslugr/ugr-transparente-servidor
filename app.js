/*
UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
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

var routes=require('./app/routes');
var config=require('./config/config');

// Crea aplicación web con Express
var app = express();




// Archivos de configuración de cada unas de las páginas


//will set all roots
//TODO:maybe use a middleware
routes(app);

// Variables de entorno
app.set('port', process.env.PORT || config.puerto);
app.set('ip', process.env.IP || "127.0.0.1");
app.set('env', process.env.ENV);


// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

// Favicon
app.use(favicon('./public/favicon/favicon.ico'));
// Logger de solicitudes HTTP
app.use(logger('dev'));
// Parseadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Manejador de enrutado
if (app.get('env') == "dev") {
  app.use(express.static('public'));
}
// Manejador de errores:
app.use(function(req, res, next) {
  res.status(404).render('error_404', {
    titulo: config.error.titulo,
    texto: config.error.texto
  });
});   
// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Express server listening on ' + app.get('ip') + ':' + app.get('port'));
});

module.exports = app;
