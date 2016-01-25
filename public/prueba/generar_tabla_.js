/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2014 Mario Heredia Moreno, Jaime Torres Benavente
  Copyright (C) 2015 Germán Martínez Maldonado

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


$(document).ready(function() {
  //select all the a tag with name equal to modal
  $('a[class=view]').click(function(e) {
    //Cancel the link behavior
    e.preventDefault();
    //Get the A tag
    var id = $(this).attr('href');

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set height and width to mask to fill up the whole screen
    $('#mask').css({
      'width': maskWidth,
      'height': maskHeight
    });

    //transition effect
    $('#mask').fadeIn(10);
    $('#mask').fadeTo("slow", 0.8);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(id).css('top', winH / 2 - $(id).height() / 2);
    $(id).css('left', winW / 2 - $(id).width() / 2);

    //transition effect
    $(id).fadeIn(5000);

    var nombre = $(this).attr('name');

    $('#titulo_tabla').html(nombre);

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        xhr.overrideMimeType('text/html; charset=ISO-8859-1');
      }
    });

    // Carga la API de Google para visualización de tablas
    google.load("visualization", "1.1", {
      packages: ["table"]
    });

    // Llama al callback de visualización cuando la librería de la API de Google es cargada
    google.setOnLoadCallback(drawChart);
  });

  //if close button is clicked
  $('#close').click(function(e) {
    $('#mask, .window').hide();
    $('#mask, .window').HTML("");
  });

  //if mask is clicked
  $('#mask').click(function() {
    $(this).hide();
    $('.window').hide();
    $(this).HTML("");
    $('.window').HTML("");
  });
});

function drawChart() {
  // Petición JSONP para obtener los datos de la tabla
  var jsonData = $.ajax({
    type: "GET",
    url: $(this).attr("rel"),
    dataType: "text",
  }).done(function(results) {
    var datatable = new google.visualization.DataTable();
    var table = new google.visualization.Table(document.getElementById('tabla'));

    var datos = (Papa.parse(results)).data;

    if (_.size(datos) >= 3) {
      var numColumnas = _.size(datos[0]);
      var numFilas = _.size(datos) - 2;
      var i = 0;
      var j = 0;

      var titulos = datos[0];

      _.each(titulos, function(valor) {
        if (_.isNaN(parseInt(datos[1][i]))) {
          datatable.addColumn('string', valor);
        } else {
          datatable.addColumn('number', valor);
        }
        i++;
      });

      datatable.addRows(numFilas);

      for (i = 0; i < numFilas; i++) {
        for (j = 0; j < numColumnas; j++) {
          if (_.isNaN(parseInt(datos[i + 1][j]))) {
            datatable.setCell(i, j, datos[i + 1][j]);
          } else {
            datatable.setCell(i, j, parseInt(datos[i + 1][j]));
          }
        }
      }
    }

    table.draw(datatable, {
      showRowNumber: true,
      width: '100%',
      height: '100%'
    });
  });
}