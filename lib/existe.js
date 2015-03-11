var buscar = function (archivo){
  // Variable con el resultado de la comprobación
  var existe;
	// Cargamos el modulo para operaciones de entrada/salida con ficheros
	var fs = require("fs");

  // Si el archivo existe se devuelve true, si no existe se produce una excepción y se devuelve false
  try{
    existe = fs.statSync(archivo).isFile();
  }
  catch(e){
    existe = false;
  }

	return existe;
};

module.exports = buscar;
