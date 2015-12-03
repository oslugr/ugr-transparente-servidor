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

$(document).ready(function() {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day'
    },
    googleCalendarApiKey: gApi,
    events: {
      googleCalendarId: gCalId,
      className: 'gcal-event'
    }
  })
});
