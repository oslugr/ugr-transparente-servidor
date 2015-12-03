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
var gApi = 'AIzaSyBFCmtCtxpOYfY1vQdFCaKvUDmifwRgFjI';

$(document).ready(function() {

  $('#calendar').fullCalendar({
    // header: {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'month,basicWeek,basicDay'
    // },

    events: {
      googleCalendarId: gCalId,
    },

    // defaultDate: '2015-12-12',

    // editable: true,
    // eventLimit: true, // allow "more" link when too many events

    // events: [
    // 	{
    // 		title: 'All Day Event',
    // 		start: '2015-12-01'
    // 	},
    // 	{
    // 		title: 'Long Event',
    // 		start: '2015-12-07',
    // 		end: '2015-12-10'
    // 	},
    // 	{
    // 		id: 999,
    // 		title: 'Repeating Event',
    // 		start: '2015-12-09T16:00:00'
    // 	},
    // 	{
    // 		id: 999,
    // 		title: 'Repeating Event',
    // 		start: '2015-12-16T16:00:00'
    // 	},
    // 	{
    // 		title: 'Conference',
    // 		start: '2015-12-11',
    // 		end: '2015-12-13'
    // 	},
    // 	{
    // 		title: 'Meeting',
    // 		start: '2015-12-12T10:30:00',
    // 		end: '2015-12-12T12:30:00'
    // 	},
    // 	{
    // 		title: 'Lunch',
    // 		start: '2015-12-12T12:00:00'
    // 	},
    // 	{
    // 		title: 'Meeting',
    // 		start: '2015-12-12T14:30:00'
    // 	},
    // 	{
    // 		title: 'Happy Hour',
    // 		start: '2015-12-12T17:30:00'
    // 	},
    // 	{
    // 		title: 'Dinner',
    // 		start: '2015-12-12T20:00:00'
    // 	},
    // 	{
    // 		title: 'Birthday Party',
    // 		start: '2015-12-13T07:00:00'
    // 	},
    // 	{
    // 		title: 'Click for Google',
    // 		url: 'http://google.com/',
    // 		start: '2015-12-28'
    // 	}
    // ]
  });

});
