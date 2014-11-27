#! /bin/bash

nohup nodejs app.js &
sleep 2
curl localhost/
curl localhost/index.html
curl localhost/presentacion.html
curl localhost/personal.html
curl localhost/servicios.html
curl localhost/infoEconomica.html
curl localhost/ofertaYdemanda.html
curl localhost/claustro.html
curl localhost/estudiantes.html
curl localhost/mision.html
curl localhost/planEstrategico.html
curl localhost/gobierno.html
curl localhost/estadisticas.html
curl localhost/normativalegal.html
