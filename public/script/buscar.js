/*
    UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
    Copyright (C) 2014 Mario Heredia Moreno
    Copyright (C) 2015 Germán Martínez Maldonado
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


$(function() {

	// Pasa de codificación Unicode a UTF-8 y quita acentos
	function convierteCadena(cadena) {
		cadena = cadena.replace("%C3%A1", "a");
		cadena = cadena.replace("%C3%A9", "e");
		cadena = cadena.replace("%C3%AD", "i");
		cadena = cadena.replace("%C3%B3", "o");
		cadena = cadena.replace("%C3%BA", "u");

		cadena = cadena.replace("%C3%B1", "ñ");

		return (cadena);
	}

	var contenido = $('.content_doku'),
		consulta = location.search,
		inicio = consulta.indexOf('='),
		fin = consulta.indexOf('&');

	consulta = consulta.substring(inicio + 1, fin);
	consulta = consulta.replace(/\+/g, " ");

	consulta = convierteCadena(consulta);

	var archivos = ["archivos/personal",
		"archivos/infoEconomica",
		"archivos/ofertaDemanda",
		"archivos/claustro",
		"archivos/estudiantes",
		"archivos/gobierno",
		"archivos/rendimiento",
		"archivos/normativaLegal"
	];

	var resultados = "";

	if (consulta.length > 3) {
		var numResultados = 0;

		$.each(archivos, function(index, nombre) {

			$.getJSON(nombre, function(data) {
					$.each(data.contenido, function(campo, contenido) {
						if (campo === "datos") {
							// Por cada campo de datos.
							$.each(valor, function(tabla, contenido) {
								// Si la consulta coincide con parte del título de la tabla.
								if (contenido.nombre.toLowerCase().indexOf(consulta) > -1) {
									resultados += "<li><a class='seccion' href='http://transparente.ugr.es/" + data.plantilla + ".html'>" + contenido.nombre + "</a></li>";
									numResultados++;
								}
							});
						}
						// Si la consulta coincide con parte de la descripción del conjunto de datos.
						else if (contenido.texto.toLowerCase().indexOf(consulta) > -1) {
							resultados += "<li><a class='seccion' href='http://transparente.ugr.es/" + data.plantilla + ".html#" + contenido.link + "'>" + contenido.encabezado + "</a></li>";
							numResultados++;
						}
					});
				})
				.done(function() {
					if (numResultados == 1) {
						contenido.html("<p>Se ha encontrado <strong><em>1</em></strong> coincidencia para <strong><em>" + consulta + "</em></strong>.</p>" + resultados);
					} else if (numResultados > 1) {
						contenido.html("<p>Se han encontrado <strong><em>" + numResultados + "</em></strong> coincidencias para <strong><em>" + consulta + "</em></strong>.</p>" + resultados);
					} else {
						contenido.html("<p>No se han encontrado coincidencias para <strong><em>" + consulta + "</em></strong>.</p>");

					}
				});
		});
	} else {
		contenido.html("<p>No se han encontrado coincidencias. Introduzca más de 3 caracteres.</p>");
	}

});
