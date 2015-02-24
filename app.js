/**
* Module dependencies.
*/

var express = require('express');
var index = require('./routes/index');
var pres = require('./routes/presentacion');
var docencia = require('./routes/docencia');
var administracion = require('./routes/administracion');
var gei = require('./routes/gestionEinvestigacion');
var norma = require('./routes/normativas');
var sol = require('./routes/testdesolicitudes');

var http = require('http');
var path = require('path');

var app = express();

// Cargamos la configuracion del archivo json y la exportamos para poder usarla en toda la aplicacion
var cargarConfig = require('./script/jsonReader');
config=cargarConfig("./config/config.json");
module.exports.config = config;

// Archivos de configuración de cada unas de las páginas
module.exports.personal = cargarConfig("./config/personal.json");
module.exports.infoEco = cargarConfig("./config/infoEco.json");

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index
app.get('/', index.index);
app.get('/index.html', index.index);

//presentacion
app.get('/presentacion.html', pres.presentacion);

//administracion

app.get('/personal.html',administracion.personal);
app.get('/infoEconomica.html',administracion.infoEco);
app.get('/servicios.html',administracion.servicios);
app.get('/perfilContratante.html',administracion.perfil);

//docencia
app.get('/ofertaYdemanda.html',docencia.ofertaYdemanda);
app.get('/claustro.html',docencia.claustro);
app.get('/estudiantes.html',docencia.alumnos);

//Gestion e investigación
app.get('/mision.html',gei.mision);
app.get('/planEstrategico.html',gei.planEstrategico);
app.get('/gobierno.html',gei.gobierno);
app.get('/estadisticas.html',gei.resultados);

//Normativas
app.get('/normativalegal.html',norma.normativa);

//Solicitudes
app.get('/testdesolicitudes.html', sol.solicitudes);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
