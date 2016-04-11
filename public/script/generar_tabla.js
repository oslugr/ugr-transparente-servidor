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
        
    /*    tabla.ajaxSetup({
            'beforeSend': function(xhr) {
                xhr.overrideMimeType('text/html; charset=ISO-8859-1');
            }
        });
        var url=tabla(this).attr("rel");
        tabla.ajax({
            type: "GET",
            url: tabla(this).attr("rel"),
            dataType: "text",
            success: function(data) {
                drawTable(data,url); //use tabla.csv.toArrays(data)  to parse it as array
            }
        });*/

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

function drawTable(url) {
    $('#tabla').empty();
    d3.text(url,"text/plain; charset=ISO-8859-1", function(data) {
        console.log(data);
                    var parsedCSV = d3.csv.parseRows(data);
                    var container = d3.select("#tabla")
                        .append("table")

                        .selectAll("tr")
                            .data(parsedCSV).enter()
                            .append("tr")

                        .selectAll("td")
                            .data(function(d) { return d; }).enter()
                            .append("td")
                            .text(function(d) { return d; });
                });
}
