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

exports.mapa = function(req, res){
    var secciones = ["Inicio", "Presentación", "Administración", "Docencia", "Gestión e Investigación", "Normativa Legal"];
    var secciones_enlaces = ["index.html", "presentacion.html", "", "", "", "normativaLegal.html"];

    var categorias_admin = ["Personal", "Información Económica", "Servicios", "Perfil del Contratante"];
    var categorias_admin_enlaces = ["personal.html", "infoEconomica.html", "servicios.html", "perfilContratante.html"];
    var categorias_docencia = ["Oferta y Demanda", "Claustro", "Estudiantes"];
    var categorias_docencia_enlaces = ["ofertaDemanda.html", "claustro.html", "estudiantes.html"];
    var categorias_gestion = ["Misión", "Plan Estratégico", "Gobierno", "Estadísticas"];
    var categorias_gestion_enlaces = ["mision.html", "planEstrategico.html", "gobierno.html", "estadisticas.html"];

    var personal = conf.personal.contenido;
    var infoEco = conf.infoEconomica.contenido;
    var serv = conf.servicios.contenido;
    var ofYde = conf.ofertaDemanda.contenido;
    var claustro = conf.claustro.contenido;
    var estudiantes = conf.estudiantes.contenido;
    var mision = conf.mision.contenido;
    var plan = conf.planEstrategico.contenido;
    var gobierno = conf.gobierno.contenido;
    var estad = conf.estadisticas.contenido;
    var normativa = conf.normativaLegal.contenido;




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

        dataset_personal: personal,
        tam_dataset_personal: personal.length,

        dataset_infoEco: infoEco,
        tam_dataset_infoEco: infoEco.length,

        dataset_serv: serv,
        tam_dataset_serv: serv.length,

        dataset_ofYde: ofYde,
        tam_dataset_ofYde: ofYde.length,

        dataset_claustro: claustro,
        tam_dataset_claustro: claustro.length,

        dataset_estudiantes: estudiantes,
        tam_dataset_estudiantes: estudiantes.length,

        dataset_mision: mision,
        tam_dataset_mision: mision.length,

        dataset_plan: plan,
        tam_dataset_plan: plan.length,

        dataset_gobierno: gobierno,
        tam_dataset_gobierno: gobierno.length,

        dataset_estad: estad,
        tam_dataset_estad: estad.length,

        dataset_normativa: normativa,
        tam_dataset_normativa: normativa.length

    });
};
