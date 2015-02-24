var cargarConfig = function (conf){
	//Cargamos las configuraciones
	var fs = require("fs");
	/* parseamos nuestro json y lo convertimos a tipo objetos de JS */
	var config = JSON.parse(fs.readFileSync(conf));
	return config;
};

module.exports = cargarConfig;
