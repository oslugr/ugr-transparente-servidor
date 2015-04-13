var cargar = function (archivo){
	// Cargamos el modulo para operaciones de entrada/salida con ficheros
	var fs = require("fs");
	var config = null;

	try{
		// Parseamos el archivo JSON recibido por parametro convirtiendolo en un objeto JS
		config = JSON.parse(fs.readFileSync(archivo));
	}
	catch(e){
		console.log("Error: no existe el archivo "+archivo);
		console.log(e);
	}

	return config;
};

module.exports = cargar;
