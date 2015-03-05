/**
* Module dependencies.
*/
var express = require('express');
var index = require(__dirname+'/routes/index');
var presentacion = require(__dirname+'/routes/presentacion');
var administracion = require(__dirname+'/routes/administracion');
var docencia = require(__dirname+'/routes/docencia');
var gestionInvestigacion = require(__dirname+'/routes/gestionInvestigacion');
var normativaLegal = require(__dirname+'/routes/normativaLegal');
var testSolicitudes = require(__dirname+'/routes/testSolicitudes');
var map = require(__dirname+'/routes/mapaweb');

var http = require('http');
var path = require('path');

var app = express();

// Cargamos la configuracion del archivo json y la exportamos para poder usarla en toda la aplicacion
var cargar = require(__dirname+'/lib/lector');
config=cargar(__dirname+'/config/config.json');
module.exports.config = config;

// Archivos de configuración de cada unas de las páginas
module.exports.personal = cargar(__dirname+'/config/personal.json');
module.exports.infoEconomica = cargar(__dirname+'/config/infoEconomica.json');
module.exports.servicios = cargar(__dirname+'/config/servicios.json');
module.exports.ofertaDemanda = cargar(__dirname+'/config/ofertaDemanda.json');
module.exports.claustro = cargar(__dirname+'/config/claustro.json');
module.exports.estudiantes = cargar(__dirname+'/config/estudiantes.json');
module.exports.mision = cargar(__dirname+'/config/mision.json');
module.exports.planEstrategico = cargar(__dirname+'/config/planEstrategico.json');
module.exports.gobierno = cargar(__dirname+'/config/gobierno.json');
module.exports.estadisticas = cargar(__dirname+'/config/estadisticas.json');
module.exports.normativaLegal = cargar(__dirname+'/config/normativaLegal.json');

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.status(404).render('404_error', {titulo: config.error.titulo, texto: config.error.texto});
});

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Inicio
app.get('/', index.index);
app.get('/index.html', index.index);

// Presentacion
app.get('/presentacion.html', presentacion.presentacion);

// Administracion
app.get('/personal.html',administracion.personal);
app.get('/infoEconomica.html',administracion.infoEconomica);
app.get('/servicios.html',administracion.servicios);
app.get('/perfilContratante.html',administracion.perfil);

// Docencia
app.get('/ofertaDemanda.html',docencia.ofertaDemanda);
app.get('/claustro.html',docencia.claustro);
app.get('/estudiantes.html',docencia.estudiantes);

// Gestion e investigación
app.get('/mision.html',gestionInvestigacion.mision);
app.get('/planEstrategico.html',gestionInvestigacion.planEstrategico);
app.get('/gobierno.html',gestionInvestigacion.gobierno);
app.get('/estadisticas.html',gestionInvestigacion.estadisticas);

// Normativa Legal
app.get('/normativaLegal.html',normativaLegal.normativaLegal);

// Solicitudes
app.get('/testSolicitudes.html', testSolicitudes.testSolicitudes);
//Mapa del sitio
app.get('/mapaweb.html', map.mapa);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
