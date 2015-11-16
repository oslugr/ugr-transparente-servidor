/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2014 Mario Heredia Moreno, Jaime Torres Benavente

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
    $(id).fadeIn(2000);

    var nombre = $(this).attr('name');

    $('#titulo_tabla').html(nombre);

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        xhr.overrideMimeType('text/html; charset=ISO-8859-1');
      }
    });

    $.ajax({
      type: "GET",
      url: $(this).attr("rel"),
      dataType: "text",
      success: function(data) {
        drawTable($.csv.toArrays(data));
      }
    });

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


google.load('visualization', '1', {
  packages: ['table']
});


function isNumber(cell) {
  var i = 0;
  var cont = true;

  if (cell.charAt(0) == '-') {
    i++;
  }

  if (cell.charAt(0) == '0') {
    if (cell.charAt(1) != ',' && cell.charAt(1) != '') {
      cont = false;
    }
  }

  while (cont && i < cell.length) {
    switch (cell.charAt(i)) {
      case '0':
        i++;
        break;
      case '1':
        i++;
        break;
      case '2':
        i++;
        break;
      case '3':
        i++;
        break;
      case '4':
        i++;
        break;
      case '5':
        i++;
        break;
      case '6':
        i++;
        break;
      case '7':
        i++;
        break;
      case '8':
        i++;
        break;
      case '9':
        i++;
        break;
      case ',':
        i++;
        break;
      default:
        cont = false;
    }
  }

  return cont;
}


function drawTable(csv) {
  var data = new google.visualization.DataTable();
  var i, j, a;

  for (i = 0; i < csv[0].length; i++) {
    data.addColumn('string', csv[0][i]);
  }

  data.addRows(csv.length - 1);

  for (i = 1; i < csv.length; i++) {
    for (j = 0; j < csv[0].length; j++) {
      if (isNumber(csv[i][j])) {
        data.setCell(i - 1, j, csv[i][j], csv[i][j], {
          style: 'text-align: right'
        });
      } else {
        data.setCell(i - 1, j, csv[i][j]);
      }
    }
  }


  var table = new google.visualization.Table(document.getElementById('tabla'));
  table.draw(data, {
    allowHtml: true,
    showRowNumber: true
  });
}