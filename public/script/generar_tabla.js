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

tabla(document).ready(function() {
	// Select all the a tag with name equal to modal
	tabla('a[class=view]').click(function(e) {
		// Cancel the link behavior
		e.preventDefault();
		// Get the A tag

		var id = tabla(this).attr('href');

		// Get the screen height and width
		var maskHeight = tabla(document).height();
		var maskWidth = tabla(window).width();

		// Set height and width to mask to fill up the whole screen
		tabla('#mask').css({
			'width': maskWidth,
			'height': maskHeight
		});

		// Transition effect
		tabla('#mask').fadeIn(10);
		tabla('#mask').fadeTo("slow", 0.8);

		// Get the window height and width
		var winH = tabla(window).height();
		var winW = tabla(window).width();

		// Set the popup window to center
		tabla(id).css('top', winH / 2 - tabla(id).height() / 2);
		tabla(id).css('left', winW / 2 - tabla(id).width() / 2);

		// Transition effect
		tabla(id).fadeIn(2000);

		var nombre = tabla(this).attr('name');

		tabla('#titulo_tabla').html(nombre);

		tabla.ajaxSetup({
			'beforeSend': function(xhr) {
				xhr.overrideMimeType('text/html; charset=ISO-8859-1');
			}
		});

		tabla.ajax({
			type: "GET",
			url: tabla(this).attr("rel"),
			dataType: "text",
			success: function(data) {
				drawTable(tabla.csv.toArrays(data));
			}
		});

	});

	// If close button is clicked
	tabla('#close').click(function(e) {
		tabla('#mask, .window').hide();
		tabla('#mask, .window').HTML("");
	});

	// If mask is clicked
	tabla('#mask').click(function() {
		tabla(this).hide();
		tabla('.window').hide();
		tabla(this).HTML("");
		tabla('.window').HTML("");
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
		if (cell.charAt(1) != ',' && cell.charAt(1) !== '') {
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
	var table = new google.visualization.Table(document.getElementById('tabla'));
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

	table.draw(data, {
		allowHtml: true,
		showRowNumber: true
	});
}
