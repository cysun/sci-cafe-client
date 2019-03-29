import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { EventService } from '../../../services';
import { first } from 'rxjs/operators';
import { User,Event } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
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
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(
    public http: Http,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllEvents();
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
        this.events = events;
    });
  }

  onClick(id:number) {
    
  }
}

