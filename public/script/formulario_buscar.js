/*
    UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
    Copyright (C) 2014 Mario Heredia Moreno

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

  function transformarCaracteres(cadena) {
    cadena = cadena.replace("%C3%A1", "á");
    cadena = cadena.replace("%C3%A9", "é");
    cadena = cadena.replace("%C3%AD", "í");
    cadena = cadena.replace("%C3%B3", "ó");
    cadena = cadena.replace("%C3%BA", "ú");
    cadena = cadena.replace("%C3%B1", "ñ");

    return (cadena);
  }

  function quitarAcentos(cadena) {
    cadena = cadena.replace("á", "a");
    cadena = cadena.replace("é", "e");
    cadena = cadena.replace("í", "i");
    cadena = cadena.replace("ó", "o");
    cadena = cadena.replace("ú", "u");

    return (cadena);
  }

  var contenido = $('.content_doku'), //Lugar donde resultadosemos los resultados
    query = location.search, //Se obtiene la consulta
    ini_consulta = query.indexOf('='),
    fin_consulta = query.indexOf('&');

  //Se depura, dejando lo necesario para la posterior búsqueda
  query = query.substring(ini_consulta + 1, fin_consulta);
  query = query.replace(/\+/g, " ");

  query = transformarCaracteres(query);

  query = query.toLowerCase();

  var query_aux = query;
  query_aux = quitarAcentos(query_aux);

  var archivos = ["archivos/claustro"];
  archivos.push("archivos/estadisticas");
  archivos.push("archivos/estudiantes");
  archivos.push("archivos/gobierno");
  archivos.push("archivos/informacion-economica");
  archivos.push("archivos/mision");
  archivos.push("archivos/normativa-legal");
  archivos.push("archivos/oferta-demanda");
  archivos.push("archivos/personal");
  archivos.push("archivos/plan-estrategico");
  archivos.push("archivos/servicios");


  var resultados = "";
  var titulo, texto;

  //El filtro será válido para una entrada de longitud "coherente"
  if (query.length > 3) {
    var i, n_resultados = 0;
    for (i = 0; i < archivos.length; i++) {
      $.getJSON(archivos[i], function(data) {
          $.each(data, function(key, val) {
            if (key == "contenido") {
              $.each(val, function(campo, valor) {
                texto = valor.texto.toLowerCase();
                texto = quitarAcentos(texto);
                //Si la consulta coincide con parte de la descripción del conjunto de datos...
                if (texto.indexOf(query_aux) > -1) {
                  resultados += "<li><a class='seccion' href='http://transparente.ugr.es/" + data.plantilla + ".html#" + valor.link + "'>" + valor.encabezado + "</a></li>";
                  n_resultados++;
                }
              });
            }
            if (key == "datos") {
              //Por cada campo de datos...
              $.each(val, function(tabla, valor) {
                titulo = valor.nombre.toLowerCase();
                titulo = quitarAcentos(titulo);
                //Si la consulta coincide con parte del título de la tabla...
                if (titulo.indexOf(query_aux) > -1) {
                  resultados += "<li><a class='seccion' href='http://transparente.ugr.es/" + data.plantilla + ".html'>" + valor.nombre + "</a></li>";
                  n_resultados++;
                }

              });
            }
          });

        })
        .done(function() {
          if (n_resultados == 1) {
            contenido.html("<p>Se ha encontrado <strong><em>1</em></strong> coincidencia para <strong><em>" + query + "</em></strong>.</p>" + resultados);
          } else if (n_resultados > 1) {
            contenido.html("<p>Se han encontrado <strong><em>" + n_resultados + "</em></strong> coincidencias para <strong><em>" + query + "</em></strong>.</p>" + resultados);
          } else {
            contenido.html("<p>No se han encontrado coincidencias para <strong><em>" + query + "</em></strong>.</p>");

          }
        });
    }
  } else {
    contenido.html("<p>No se han encontrado coincidencias. Introduzca más de 3 caracteres</p>");
  }


});
