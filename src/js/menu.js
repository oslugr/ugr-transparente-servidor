window.mostrar_menu = function(nombre) {
    var menu = document.getElementById(nombre);

    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else
        menu.style.display = "none";
};
