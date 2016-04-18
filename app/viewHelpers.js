function getSuperSection(seccion){
    var res="";
    if(seccion==="Personal" || seccion==="Información Económica" || seccion=="Perfil del Contratante") res="Administración";
    else if (seccion==="Oferta y Demanda Académica" || seccion==="Claustro" || seccion==="Estudiantes") res="Docencia";
    else if (seccion==="Gobierno" || seccion==="Rendimiento") res="Gestión e Investigación";
    return res;
}

function slugify(text) {
		return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
	}

module.exports={
    breadcrumbText: function(seccion){
        var s=getSuperSection(seccion);
        if(s) return s+" / "+seccion;
        else return seccion;
    },
    firstLevelItem: function(title,link,selected){
        var liClass="tipo2 item-first_level";
        if(selected===title) liClass="selected tipo2-selected item-first_level";
        return "<li class=\""+liClass+"\"><a href=\""+link+"\">"+title+"</a></li>";
    },
    firstLevelMenu: function(title,selected){
        var sel=getSuperSection(selected);
        var itemClass="tipo2 item-first_level";
        var submenuDisplay="display:none"; //display:none;
        var slug=slugify(title);
        if(sel===title){
    		itemClass="selected tipo2-selected item-first_level";
    		submenuDisplay="display:block";
        }
        
        var li="<li class=\""+itemClass+"\">";
        var onclick="<a onclick=\"mostrar_menu('menu_"+slug+"')\" class=\"grupos\">"+title+"</a>";
        var ul="<ul id=\"menu_"+slug+"\" style=\""+submenuDisplay+"\">";
        
        return li+onclick+ul;
    },
    firstLevelMenuEnd: function(){
        return "</ul></li>";
    },
    secondLevelItem: function(title,link,selected){
        var item_class="tipo1";
        if(selected===title) item_class="tipo1-selected";
        var li="<li class=\""+item_class+" item-second_level id_5944 tipo1-parent_5284 mainmenu_item1 mainmenu_itemid_5944 mainmenu_itemname_titulacionesenextincin mainmenu_nchar_26 mainmenu_nchar10_30 last-child\">";
        var a="<a href=\""+link+"\">"+title+"</a>";
        return li+a+"</li>";        
    }
};
