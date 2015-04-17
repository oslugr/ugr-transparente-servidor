
$(function(){
    //$('.content_doku').hide();
    var contenido = $('.content_doku'), //Aquí insertaremos los resultados
        query = location.search, //Se obtiene la consulta
        ini_consulta = query.indexOf('='),
        fin_consulta = query.indexOf('&');

    //Se depura, dejando lo necesario para la posterior búsqueda
    query = query.substring(ini_consulta + 1, fin_consulta);
    query = query.replace(/\+/g, " ");
    query = query.replace("%C3%A1", "á");
    query = query.replace("%C3%A9", "é");
    query = query.replace("%C3%AD", "í");
    query = query.replace("%C3%B3", "ó");
    query = query.replace("%C3%BA", "ú");
    query = query.replace("%C3%B1", "ñ");
    query = query.toLowerCase();

    var archivos =["archivos/claustro"];
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


    var insertar="";

    if(query.length > 3) //El filtro será válido para una entrada de longitud coherente
    {
        var items = [];
        var i;
        var link;
        for(i = 0; i < archivos.length; i++)
        {
            $.getJSON(archivos[i], function(data){
                $.each(data, function(key, val){
                    link = data.plantilla;
                    if(key == "datos")
                    {
                        $.each(val, function(tabla, valor){
                            var cadena = valor.nombre.toLowerCase();
                            if(cadena.indexOf(query) > -1)
                            {
                                contenido.append("<li><a class='seccion' href='http://transparente.ugr.es/" + data.plantilla + ".html'>" + valor.nombre + "</a></li>");
                                items.push(valor.nombre);
                                console.log(valor.nombre);
                                console.log(link);
                            }

                        });
                    }
                });

            });
        }
        //contenido.html("<p>" + items.length + " Resultados.</p>");
    }
    else
    {
        contenido.html("<p>0 Resultados. Introduzca más de 3 caracteres</p>");
    }


});
