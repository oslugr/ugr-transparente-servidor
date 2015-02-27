
/*
Portal web transparente.ugr.es para publicar datos de la Universidad de Granada
Copyright (C) 2014  Mario Heredia Moreno

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//Variable para las configuraciones
var conf = require('../app');

// Gestión de la pagina de la solicitudes

exports.mapa = function(req, res){
    var secciones = ["Inicio", "Presentación", "Administración", "Docencia", "Gestión e Investigación", "Normativa Legal"];
    var secciones_enlaces = ["index.html", "presentacion.html", "#", "#", "#", "normativalegal.html"];

    var categorias_admin = ["Personal", "Información Económica", "Servicios", "Perfil del Contratante"];
    var categorias_admin_enlaces = ["personal.html", "infoEconomica.html", "servicios.html", "perfilContratante.html"];
    var categorias_docencia = ["Oferta y Demanda", "Claustro", "Estudiantes"];
    var categorias_docencia_enlaces = ["ofertaYdemanda.html", "claustro.html", "estudiantes.html"];
    var categorias_gestion = ["Misión", "Plan Estratégico", "Gobierno", "Estadísticas"];
    var categorias_gestion_enlaces = ["mision.html", "planEstrategico.html", "gobierno.html", "estadisticas.html"];

    var personal = conf.personal;
    var infoEco = conf.infoEconomica;
    var serv = conf.servicios;
    var ofYde = conf.ofertaDemanda;
    var claustro = conf.claustro;
    var estudiantes = conf.estudiantes;
    var mision = conf.mision;
    var plan = conf.planEstrategico;
    var gobierno = conf.gobierno;
    var estad = conf.estadisticas;
    var normativa = conf.normativaLegal;




    res.render('mapaweb', {
        titulo: 'Mapa del sitio',
        seccion : secciones,
        tam_seccion : secciones.length,
        seccion_enlaces : secciones_enlaces,

        categ_admin : categorias_admin,
        categ_admin_enlaces : categorias_admin_enlaces,
        tam_categorias_admin : categorias_admin.length,

        categ_doc : categorias_docencia,
        categ_doc_enlaces : categorias_docencia_enlaces,
        tam_categorias_doc : categorias_docencia.length,

        categ_gest : categorias_gestion,
        categ_gest_enlaces : categorias_gestion_enlaces,
        tam_categorias_gest : categorias_gestion.length,

        dataset_personal: personal.contenido,
        tam_dataset_personal: (personal.contenido).length,

        dataset_infoEco: infoEco.contenido,
        tam_dataset_infoEco: (infoEco.contenido).length,

        dataset_serv: serv.contenido,
        tam_dataset_serv: (serv.contenido).length,

        dataset_ofYde: ofYde.contenido,
        tam_dataset_ofYde: (ofYde.contenido).length,

        dataset_claustro: claustro.contenido,
        tam_dataset_claustro: (claustro.contenido).length,

        dataset_estudiantes: estudiantes.contenido,
        tam_dataset_estudiantes: (estudiantes.contenido).length,

        dataset_mision: mision.contenido,
        tam_dataset_mision: (mision.contenido).length,

        dataset_plan: plan.contenido,
        tam_dataset_plan: (plan.contenido).length,

        dataset_gobierno: gobierno.contenido,
        tam_dataset_gobierno: (gobierno.contenido).length,

        dataset_estad: estad.contenido,
        tam_dataset_estad: (estad.contenido).length,

        dataset_normativa: normativa.contenido,
        tam_dataset_normativa: (normativa.contenido).length

    });
};
