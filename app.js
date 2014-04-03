
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var seccionesUgr = require('./routes/seccionesUgr');
var infoEconomica = require('./routes/infoEconomica');
var alumnos = require('./routes/alumnos');
var http = require('http');
var path = require('path');

var app = express();

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
    res.status(404).render('404_error', {titulo: "Page not found (Error 404)", texto: "Lo siento, la página no existe o está temporalmente inaccesible"});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/index.html', index.index);
app.get('/seccionesugr.html',seccionesUgr.ugr);
app.get('/infoEconomica.html',infoEconomica.seccionEconomica);
app.get('/alumnos.html',alumnos.alumnos);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
