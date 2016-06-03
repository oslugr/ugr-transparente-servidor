// # Ruta Buscador
/*
Configuración de las rutas del buscador `/buscador`
*/

"use strict";
/*UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
  Copyright (C) 2016 Andrés Ortiz Corrales, Germán Martínez Maldonado

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

// ### Dependencias locales
// * [**Configuración**](../config/config.html): Configuración del servidoro
var config = require('../../config/config');
var buscador = require('../../config/config').archivosJson.buscador;

function buscar(cadena, done) {
	console.log("BUSQUEDA " + cadena);
	//TODO: Realizar búsqueda en elasticsearch
	//WARNING: hacer regexp si es necesario
	done(null, []);
}

// ### API

// **POST**

// * _body_: Cuerpo en _json_
/*
```json
{
"query": "Cadena de búsqueda"
}
```
*/
// * _response_: Respuesta en _json_
//   * Success: _json_ resultado de la búsqueda
/*
```json
{
    "data": "[Array de resultados]",
    "query": "Cadena de búsqueda del usuario",
    "status": "Código de estado 2xx"
}
```
*/
//   * Error: _json_ con información del error
/*
```json
{
error: {
    message: "Mensaje de error",
    query: "Cadena de búsqueda del usuario si hubiera",
    status: "Código de estado 4xx o 5xx""
    },
data: "[Array de resultados si hay]"
}
```
*/
// * _status_: Códigos de estado
//   * 200: Operación correcta
//   * 400: Petición inválida
//   * 500: Error interno del servidor



// ### Exports
// * `busqueda(url,app)`: Genera las rutas del buscador:
//   * `GET URL` Devuelve la página busqueda.html
//   * `POST URL` Realiza una búsqueda y devuelve el resultado

module.exports = function(url, app) {
	app.get(url, function(req, res) {
		res.render('buscador', {
			servidor: config.servidor,
			seccion: buscador.nombre,
			contenido: buscador.contenido
		});
	});

	app.post(url, function(req, response) {
		var q = req.body.query;
		if (!q) return response.status(400).json({
			error: {
				message: "Param query not found",
				query: null,
				status: 400
			},
			data: null
		});
		buscar(req.body.query, function(err, res) {
			if (err) response.status(500).json({
				error: {
					message: "Server error",
					query: q,
					status: 500
				},
				data: res
			});
			else response.status(200).json({
				data: res,
				query: q,
				status: 200
			});
		});
	});
};