function getSuperSection(seccion) {
    var res = "";
    if (seccion === "Personal" || seccion === "Información Económica" || seccion == "Perfil del Contratante") res = "Administración";
    else if (seccion === "Oferta y Demanda Académica" || seccion === "Claustro" || seccion === "Estudiantes") res = "Docencia";
    else if (seccion === "Gobierno" || seccion === "Rendimiento") res = "Gestión e Investigación";
    return res;
}

function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

function tabla1(item,servidor){
    var html="<table class=\"inline\">";
    html+="<colgroup><col span=\"1\" style=\"width: 90%;\"><col span=\"1\" style=\"width: 10%;\"></colgroup>";
    
    html+="<tbody>";
    html+="<tr><th class=\"centeralign\">Descripción</th><th class=\"centeralign\">Datos en Opendata</th><th class=\"centeralign\">Ver</th><th class=\"centeralign\">Descargar</th></tr>";
    
    for(var it in item.datos){
        var elem=item.datos[it];
        var tab="<tr>";
        //descripcion
        tab+="<td class=\"centeralign par\">"+elem.nombre+"</td>"; 
        //opendata
        tab+="<td class=\"centeralign impar\">";
        var link=servidor+"/dataset/"+elem.id_dataset+"/resource/"+elem.url; 
        tab+="<a href=\""+link+"\" target=\"_blank\">";
        tab+="<img src=\"/imagenes/link.png\" alt=\"link\" class=\"link\">";
        tab+="</a></td>";
        //link
        tab+="<td class=\"centeralign par\">";
        link=servidor+"/dataset/"+elem.descarga;
        tab+="<a href=\"#dialog\" rel=\""+link+"\" name=\""+elem.nombre+"\"class=\"view\">";
        tab+="<img src=\"/imagenes/view.png\" alt=\"view\" class=\"view\">";
        tab+="</a></td>";
        //descarga
        tab+="<td class=\"centeralign impar\">";
        link=servidor+"/dataset/"+elem.descarga;
        tab+="<a href=\""+link+"\">";
        tab+="<img src=\"/imagenes/save.png\" alt=\"save\" class=\"save\">";
        tab+="</a></td>";
        tab+="</tr>";
        html+=tab;
    }  
    
    html+="</tbody></table>";
    return html;
}
function tabla2(item,sevidor){
    var html="<table class=\"inline\">";
    html+="<colgroup><col span=\"1\" style=\"width: 90%;\"><col span=\"1\" style=\"width: 10%;\"></colgroup>";
    
    html+="<tbody>";
    html+="<tr><th class=\"centeralign\">Descripción</th><th class=\"centeralign\">Enlace</th></tr>";
    for(var it in item.datos){
        var elem=item.datos[it];
        var tab="<tr>";
        //descripcion
        tab+="<td class=\"centeralign par\">"+elem.nombre+"</td>"; 
        //enlace
        tab+="<td class=\"centeralign impar\">";
        tab+="<a href=\""+elem.url+"\" target=\"_blank\">";
        tab+="<img src=\"/imagenes/link2.png\" alt=\"link\" class=\"link\">";
        tab+="</a></td>";
        tab+="</tr>";
        html+=tab;
    }
    html+="</tbody></table>";
    return html;
}
function tabla3(item,servidor){
    var html="<table class=\"inline\">";
    html+="<colgroup><col span=\"1\" style=\"width: 90%;\"><col span=\"1\" style=\"width: 10%;\"></colgroup>";
    
    html+="<tbody>";
    
    html+="<tr><th class=\"centeralign\">Descripción</th><th class=\"centeralign\">Ver</th><th class=\"centeralign\">Descargar</th></tr>";
    for(var it in item.datos){
        var elem=item.datos[it];
        var tab="<tr>";
        //descripcion
        tab+="<td class=\"centeralign par\">"+elem.nombre+"</td>"; 
        //link
        tab+="<td class=\"centeralign impar\">";
        var link="/doc/"+elem.url;
        tab+="<a href=\""+link+"\" target=\"_blank\">";
        tab+="<img src=\"/imagenes/pdf.png\" alt=\"view\" class=\"view\">";
        tab+="</a></td>";
        
        //descarga
        tab+="<td class=\"centeralign par\">";
        link="/doc/"+elem.url;
        tab+="<a href=\""+link+"\" download>";
        tab+="<img src=\"/imagenes/flecha.png\" alt=\"save\" class=\"save\">";
        tab+="</a></td>";
        
        tab+="</tr>";
        html+=tab;
    }
    html+="</tbody></table>";
    return html;
}
function tabla4(item,servidor){
    var html="<table class=\"inline\">";
    html+="<colgroup><col span=\"1\" style=\"width: 90%;\"><col span=\"1\" style=\"width: 10%;\"></colgroup>";
    
    html+="<tbody>";
    
    html+="<tr><th class=\"centeralign\">Descripción</th><th class=\"centeralign\">Ver</th><th class=\"centeralign\">Descargar</th></tr>";
    for(var it in item.datos){
        var elem=item.datos[it];
        var tab="<tr>";
        //descripcion
        tab+="<td class=\"centeralign par\">"+elem.nombre+"</td>"; 
        //link
        tab+="<td class=\"centeralign\">";
        tab+="<a href=\"/graph/"+elem.url+"\" data-lightbox=\"image-1\" data-title=\""+elem.nombre+"\">";
        tab+="<img src=\"/imagenes/grafico.png\" alt=\"view\" class=\"view\">";
        tab+="</a></td>";
        //descargar
        tab+="<td class=\"centeralign par\">";
        tab+="<a href=\"/graph/"+elem.url+"\" download>";
        tab+="<img src=\"/imagenes/flecha.png\" alt=\"save\" class=\"save\">";
        tab+="</a></td>";
        
        
        tab+="</tr>";
        html+=tab;
    }
    html+="</tbody></table>";
    return html;
}


module.exports = {
    breadcrumbText: function(seccion) {
        var s = getSuperSection(seccion);
        if (s) return s + " / " + seccion;
        else return seccion;
    },
    firstLevelItem: function(title, link, selected) {
        var liClass = "tipo2 item-first_level";
        if (selected === title) liClass = "selected tipo2-selected item-first_level";
        return "<li class=\"" + liClass + "\"><a href=\"" + link + "\">" + title + "</a></li>";
    },
    firstLevelMenu: function(title, selected) {
        var sel = getSuperSection(selected);
        var itemClass = "tipo2 item-first_level";
        var submenuDisplay = "display:none"; //display:none;
        var slug = slugify(title);
        if (sel === title) {
            itemClass = "selected tipo2-selected item-first_level";
            submenuDisplay = "display:block";
        }

        var li = "<li class=\"" + itemClass + "\">";
        var onclick = "<a onclick=\"mostrar_menu('menu_" + slug + "')\" class=\"grupos\">" + title + "</a>";
        var ul = "<ul id=\"menu_" + slug + "\" style=\"" + submenuDisplay + "\">";

        return li + onclick + ul;
    },
    firstLevelMenuEnd: function() {
        return "</ul></li>";
    },
    secondLevelItem: function(title, link, selected) {
        var item_class = "tipo1";
        if (selected === title) item_class = "tipo1-selected";
        var li = "<li class=\"" + item_class + " item-second_level id_5944 tipo1-parent_5284 mainmenu_item1 mainmenu_itemid_5944 mainmenu_itemname_titulacionesenextincin mainmenu_nchar_26 mainmenu_nchar10_30 last-child\">";
        var a = "<a href=\"" + link + "\">" + title + "</a>";
        return li + a + "</li>";
    },
    contentIndex: function(contenido) {
        var secciones = {};
        var indexHtml = "<ul class=\"enlaces\">";
        for (var i = 0; i < contenido.length; i++) {
            c = contenido[i];
            if (c.seccion === "") secciones[c.encabezado] = c;
            else {
                if (!secciones[c.seccion]) secciones[c.seccion] = [];
                secciones[c.seccion].push(c);
            }
        }
        for (var seccion in secciones) {
            var item = secciones[seccion];
            var l = "<li class=\"level1\">";
            l += "<div class=\"li\">";
            if (item.seccion === "") {
                var a = "<a class=\"enlaces-cabecera\" href=\"#" + item.link + "\">" + item.encabezado + "</a>";
                l += a;
                l += "</div></li>";
            } else {
                var sec = "<a class=\"enlaces-cabecera\">" + seccion + "</a>";
                l += sec;
                l += "</div></li>";
                l += "<ul class=\"enlaces\">";
                for (var it in item) {
                    var l2 = "<li class=\"level2\">";
                    var elem = item[it];
                    l2 += "<div class=\"li\">";
                    l2 += "<a class=\"enlaces-cabecera\" href=\"#" + elem.link + "\">" + elem.encabezado + "</a>";
                    l2 += "</div></li>";
                    l += l2;
                }
                l += "</ul>";
            }
            
            indexHtml += l;
        }
        indexHtml+="</ul>";
        return indexHtml;
    },
    tablasPrincipales: function(contenido,servidor){
        var html="";
        for(var elem in contenido){
            var item=contenido[elem];
            html+="<h1><a id=\""+item.link+"\" name=\"__doku_encabezado_de_primer_nivel\">"+item.encabezado+"</a></h1>";     
            html+="<div class=\"level1\">";
            html+="<p>"+item.texto+"</p>";
            switch(item.tipo){
                case 1:
                    html+=tabla1(item,servidor);
                    break;
                case 2:
                    html+=tabla2(item,servidor);
                    break;
                case 3:
                    html+=tabla3(item,servidor);
                    break;
                case 4:
                    html+=tabla4(item,servidor);
                    break;    
            }
            html+="</div>";
        }
        return html;
    }
};
