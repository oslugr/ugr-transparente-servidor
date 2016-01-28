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


//Variable para las configuraciones
var conf = require('../app');

exports.mapaWeb = function(req, res) {
  res.render('mapaWeb', {
    seccion: 'Mapa del sitio',
    secciones: [{
      nombre: "Inicio",
      enlace: "index.html",
      subsecciones: []
    }, {
      nombre: "Información Institucional",
      enlace: "infoInstitucional.html",
      subsecciones: []
    }, {
      nombre: "Administración",
      enlace: "",
      subsecciones: [{
        nombre: "Personal",
        enlace: "personal.html",
        contenido: conf.personal.contenido
      }, {
        nombre: "Información Económica",
        enlace: "infoEconomica.html",
        contenido: conf.infoEconomica.contenido
      }, {
        nombre: "Perfil del Contratante",
        enlace: "perfilContratante.html",
        contenido: ""
      }]
    }, {
      nombre: "Docencia",
      enlace: "",
      subsecciones: [{
        nombre: "Oferta y Demanda Académica",
        enlace: "ofertaDemanda.html",
        contenido: conf.ofertaDemanda.contenido
      }, {
        nombre: "Claustro",
        enlace: "claustro.html",
        contenido: conf.claustro.contenido
      }, {
        nombre: "Estudiantes",
        enlace: "estudiantes.html",
        contenido: conf.estudiantes.contenido
      }]
    }, {
      nombre: "Gestión e Investigación",
      enlace: "",
      subsecciones: [{
        nombre: "Gobierno",
        enlace: "gobierno.html",
        contenido: conf.gobierno.contenido
      }, {
        nombre: "Rendimiento",
        enlace: "rendimiento.html",
        contenido: conf.rendimiento.contenido
      }]
    }, {
      nombre: "Normativa Legal",
      enlace: "",
      subsecciones: [{
        nombre: "Normativa Legal",
        enlace: "normativaLegal.html",
        contenido: conf.normativaLegal.contenido
      }]
    }, {
      nombre: "Solicitud de Información",
      enlace: "solicitudInfo.html",
      subsecciones: []
    }]
  });
};
