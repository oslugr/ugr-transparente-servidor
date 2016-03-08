function mostrar_menu(nombre){
    var menu=document.getElementById(nombre);

    if(menu.style.display == "none"){
        menu.style.display = "block";
    }else
        menu.style.display = "none";
}
