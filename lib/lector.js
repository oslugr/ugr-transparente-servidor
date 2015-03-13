var cargar = function (archivo){
	// Cargamos el modulo para operaciones de entrada/salida con ficheros
	var fs = require("fs");
	// Parseamos el archivo JSON recibido por parametro convirtiendolo en un objeto JS
	var config = JSON.parse(fs.readFileSync(archivo));

	return config;
};

module.exports = cargar;
