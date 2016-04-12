/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2014 Mario Heredia Moreno, Jaime Torres Benavente
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

tabla(document).ready(function() {
    // Select all the a tag with name equal to modal
    tabla('a[class=view]').click(function(e) {
        // Cancel the link behavior
        e.preventDefault();

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

        drawTable(tabla(this).attr("rel")); //use tabla.csv.toArrays(data)  to parse it as array
    });

    // If close button is clicked
    tabla('#close').click(function(e) {
        tabla('#mask, .window').hide();
        //tabla('#mask, .window').HTML("");
    });

    // If mask is clicked
    tabla('#mask').click(function() {
        tabla(this).hide();
        tabla('.window').hide();
        //    tabla(this).HTML("");
        //    tabla('.window').HTML("");
    });
});

google.load('visualization', '1', {
	packages: ['table']
});

function drawTable(url) {
    $('#tabla').empty();
    d3.text(url, "text/plain; charset=ISO-8859-1", function(data) {
        var content = d3.csv.parseRows(data);
        var columns = content.shift();
        
        var tableData = new google.visualization.DataTable();
        
        columns.map(function(item){
            tableData.addColumn('string', item);
        });
        tableData.addRows(content);
        //Using only D3js
        /*d3.select('#tabla')
            .data(columns)
            .enter()
            .tableData.addColumnn()

        var table = d3.select("#tabla")
            .append("table"),
            thead = table.append("thead"),
            tbody = table.append("tbody");

        thead.append('tr')
            .selectAll('th')
            .data(columns)
            .enter()
            .append('th')
            .text(function(d) {
                return d;
            });

        var rows = tbody.selectAll('tr')
            .data(content)
            .enter()
            .append('tr');

        var cells = rows.selectAll('td')
            .data(function(d) {
                return d;
            }).enter()
            .append("td")
            .text(function(d) {
                return d;
            });*/
            
            var table = new google.visualization.Table(document.getElementById('tabla'));
            table.draw(tableData, {showRowNumber: true, width: '100%', height: '100%'});
    });
}




/*

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
}*/
