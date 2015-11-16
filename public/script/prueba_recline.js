/*
	UGR Transparente. Sitio Web de la Universidad de Granada de acceso a Datos Abiertos.
	Copyright (C) 2015 Germán Martínez Maldonado

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
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


$(document).ready(function() {

  var resource = '5a47a757-8670-4880-8fa0-446d054adf70';
  var source = 'http://opendata.ugr.es/dataset/6b39c91f-f6f3-4f09-a7ce-19329b4d9b40/resource/' + resource;

  var dataset = new recline.Model.Dataset({
    url: source,
    backend: 'ckan'
  });

  dataset.fetch().done(function(dataset) {
    data = dataset.records.toJSON()
    console.log(data[0]);
  });

});