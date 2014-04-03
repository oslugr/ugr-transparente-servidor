/*
  Portal web transparente.ugr.es para publicar datos de la Universidad de Granada
  Copyright (C) 2014  Jaime Torres Benavente

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 
/*
   Variables globales para configurar transparente.ugr.es
*/


// ************ Base de datos ************

//Dirección de la base de datos
exports.BD='mongodb://localhost:27017/transparente';


// ************ index ************

//Nombre de la sección
exports.sec1='Inicio';

//Nombre, href y id para cada enlace
exports.enlaces=[['Ugr','/seccionesugr.html','en_ugr'],['Información económica','infoEconomica.html','en_economica'],['Alumnos','alumnos.html','en_alumnos']];

//Texto del index
exports.texto="El portal de Transparencia de la Universidad de Granada es un esfuerzo por publicar y facilitar el acceso a sus datos";


// ************ Secciones de la UGR ************

//Nombre de la sección
exports.sec2='UGR';


// ************ Información Económica de la UGR ************

//Nombre de la sección
exports.sec3='Información Económica'


// ************ Alumnos ************

//nombre de la Seccion
exports.sec4='Alumnos'