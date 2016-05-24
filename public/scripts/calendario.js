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


var gCalId = 'n0ncqp3ltptoujheevpt88l5sk@group.calendar.google.com';
var gApi = 'AIzaSyB8AuYY5vvEUw4UC2v3g8G7rShJFyTYfbM';

calendario(document).ready(function() {
	tmpView = 'list';
	calendario('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay list'
		},
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
		buttonText: {
			today: 'Hoy',
			month: 'Mes',
			week: 'Semana',
			day: 'Día',
			list: 'Listar'
		},
		listSections: 'smart',
		listRange: 30,
		listPage: 30,
		listTexts: {
			until: 'Hasta',
			past: 'Eventos pasados',
			today: 'Hoy',
			tomorrow: 'Mañana',
			thisWeek: 'Esta semana',
			nextWeek: 'Semana siguiente',
			thisMonth: 'Este mes',
			nextMonth: 'Mes siguiente',
			future: 'Eventos futuros'
		},
		firstDay: 1,
		firstHour: 6,
		maxTime: 24,
		minTime: 0,
		weekMode: 'variable',
		columnFormat: {
			month: 'ddd',
			week: 'ddd',
			day: 'dddd'
		},
		axisFormat: 'h:mm',
		allDayText: 'Todo el día',
		googleCalendarApiKey: gApi,
		events: {
			googleCalendarId: gCalId,
			className: 'gcal-event'
		},
		eventClick: function(calEvent, jsEvent, view) {
			/*
			alert('Event: ' + calEvent.title);
			alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			alert('View: ' + view.name);
			*/
			return false;
		}
	});
});