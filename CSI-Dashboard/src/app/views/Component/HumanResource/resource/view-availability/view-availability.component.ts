import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityComponent implements OnInit {

  dateCourante: Date = new Date();
  evenements: CalendarEvent[] = []; // Vous pouvez définir vos propres événements ici

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  constructor() { }

  ngOnInit(): void {
  }

}
