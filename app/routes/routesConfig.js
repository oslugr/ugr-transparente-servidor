"use strict";
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

var jsons = require('../../config/config').archivosJson;

module.exports = {
	routes: [{
		url: "/personal.html",
		plantilla: "personal",
		datos: jsons.personal
	}, {
		url: "/infoEconomica.html",
		plantilla: "infoEconomica",
		datos: jsons.infoEconomica
	}, {
		url: "/ofertaDemanda.html",
		plantilla: "ofertaDemanda",
		datos: jsons.ofertaDemanda
	}, {
		url: "/claustro.html",
		plantilla: "claustro",
		datos: jsons.claustro
	}, {
		url: "/estudiantes.html",
		plantilla: "estudiantes",
		datos: jsons.estudiantes
	}, {
		url: "/gobierno.html",
		plantilla: "gobierno",
		datos: jsons.gobierno
	}, {
		url: "/rendimiento.html",
		plantilla: "rendimiento",
		datos: jsons.rendimiento
	}, {
		url: "/normativaLegal.html",
		plantilla: "normativaLegal",
		datos: jsons.normativaLegal
	}, {
		url: "/infoInstitucional.html",
		plantilla: "infoInstitucional",
		datos: jsons.infoInstitucional
	}, {
		url: "/perfilContratante.html",
		plantilla: "perfilContratante",
		datos: jsons.perfilContratante
	}, {
		url: "/solicitudInfo.html",
		plantilla: "solicitudInfo",
		datos: jsons.solicitudInfo
	}, {
		url: "/buscador.html",
		plantilla: "buscador",
		datos: jsons.buscador
	}],
	routesBusqueda: [{
		url: '/personal',
		datos: jsons.personal
	}, {
		url: '/infoEconomica',
		datos: jsons.infoEconomica
	}, {
		url: '/ofertaDemanda',
		datos: jsons.ofertaDemanda
	}, {
		url: '/claustro',
		datos: jsons.claustro
	}, {
		url: '/estudiantes',
		datos: jsons.estudiantes
	}, {
		url: '/gobierno',
		datos: jsons.gobierno
	}, {
		url: '/rendimiento',
		datos: jsons.rendimiento
	}, {
		url: '/normativaLegal',
		datos: jsons.normativaLegal
	}]
};