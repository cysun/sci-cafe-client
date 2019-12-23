import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ProgramService, EventService, NewsService } from '../../../services';
import { Event, Program, News } from '../../../models';
import { Router } from '@angular/router';
var moment = require('moment');
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import '../js/slick.min.js';
import {
  CalendarEvent,
} from 'angular-calendar';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../css/slick.css',
    '../css/animate.css',
    '../css/nice-select.css',
    '../css/jquery.nice-number.min.css',
    '../css/magnific-popup.css',
    '../css/bootstrap.min.css',
    '../css/font-awesome.min.css',
    '../css/default.css',
    '../css/style.css',
    '../css/responsive.css',
  ]
})

export class HomeComponent implements OnInit {
  events: Event[] = [];
  programs: Program[] = [];
  topNews: News[] = [];
  view: string = 'month';

  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[];

  submitted = false;
  returnUrl: string;

  constructor(
    public http: Http,
    private programService: ProgramService,
    private eventService: EventService,
    private newService: NewsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadAllApprovedEvents();
    this.loadAllPrograms();
    this.loadTopNews();
    console.log(this.topNews);
    console.log(this.events);
  }

  private loadAllApprovedEvents() {
    this.eventService.getAllApprovedEvents().subscribe(events => {
      if (events != null) {
        this.calendarEvents = events.map((event: Event) => {
          return {
            title: event.name + '  ' + event.startTime + '~' + event.endTime,
            start: moment(event.eventDate).toDate(),
            color: colors.blue,
            meta: {
              event
            }
          }
        })
      }
    });

  }

  private loadTopNews() {
    this.newService.getAllTopNews().subscribe(news => {
      this.topNews = news;
    });
  }

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }


  private loadAllPrograms() {
    this.programService.getAllPrograms().subscribe(programs => {
      if (programs.length > 3)
        this.programs = programs.slice(0, 3);
      else
        this.programs = programs;
      console.log(programs);
    });
  }

  eventClicked(calendarEvent: CalendarEvent<{ event: Event }>): void {
    this.router.navigate(['/home/events/detail'], { queryParams: { id: calendarEvent.meta.event.id } });
  }
}

