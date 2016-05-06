// # Test de Archivos
// Comprobación de archivos y recursos del servidor y formato

/*UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
  Copyright (C) 2015 Germán Martínez Maldonado
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
	along with this program. If not, see <http://www.gnu.org/licenses/>.*/


// ### Dependencias
// * **Chai:** Módulo de aserciones
var assert = require('chai').assert;

// #### Dependencias Locales

// * [**Configuración de tests**](./config.html): Datos de configuración de los tests
// * [**Configuración de servidor**](../config/config.html): Archivos json del servidor
var config = require('./config');
var jsons = require('../config/config').archivosJson;

// ### Pruebas de Configuración
// Comprobación de los archivos de configuración
describe('Archivos de configuración', function() {
	// * **Archivo de configuración:** omprobación de los valores del archivo de configuración
	it("Archivo de configuración", function() {
		var config2 = require('../config/config');
		assert.ok(config2);
		assert.ok(config2.puerto);
		assert.ok(config2.servidor);
		for (var i in config2) assert.ok(config2[i]);
	});
	// * **Formato de archivos de datos:** Comprobación de formato de archivos de datos
	it("Formato de archivos de datos", function() {
		for (var i in jsons) {
			var obj = jsons[i];
			assert.property(obj, "nombre");
			if (i === "index") assert.property(obj, "enlaces");
			else assert.property(jsons[i], "contenido");
		}
	});
});
