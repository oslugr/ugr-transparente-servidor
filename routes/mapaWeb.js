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

  var secciones
  var secciones = ["Inicio", "Información Institucional", "Administración", "Docencia", "Gestión e Investigación", "Normativa Legal"];
  var administracion = ["Personal", "Información Económica", "Perfil del Contratante"];
  var docencia = ["Oferta y Demanda", "Claustro", "Estudiantes"];
  var gestionInvestigacion = ["Misión", "Plan Estratégico", "Gobierno", "rendimientoísticas"];

  var enlacesSecciones = ["index.html", "infoInstitucional.html", "", "", "", "normativaLegal.html"];
  var enlacesAdministracion = ["personal.html", "infoEconomicanomica.html", "perfilContratante.html"];
  var enlacesDocencia = ["ofertaDemanda.html", "claustro.html", "estudiantes.html"];
  var enlacesGestionInvestigacion = ["gobierno.html", "rendimiento.html"];

  var personal = conf.personal.contenido;
  var infoEconomica = conf.infoEconomica.contenido;
  var ofertaDemanda = conf.ofertaDemanda.contenido;
  var claustro = conf.claustro.contenido;
  var estudiantes = conf.estudiantes.contenido;
  var gobierno = conf.gobierno.contenido;
  var rendimiento = conf.rendimiento.contenido;
  var normativaLegal = conf.normativaLegal.contenido;

  res.render('mapaWeb', {
    titulo: 'Mapa del sitio',
    secciones: [{
      nombre: "Administración",
      subsecciones: [{
        nombre: "Personal"
      }]
    }]
  });
}
