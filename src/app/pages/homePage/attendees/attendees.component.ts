import { Component, OnInit,ViewChild} from '@angular/core';
import {Http} from '@angular/http';

import { EventService } from '../../../services';
import { first } from 'rxjs/operators';
import { Event } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';

@Component({
  selector: 'app-attendeess',
  templateUrl: './attendees.component.html',
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
export class AttendeesComponent implements OnInit {
  event: Event;
  constructor(
    public http: Http,
    private eventService: EventService,
    private router: Router,
    private routerInfo:ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.getEventById(this.routerInfo.snapshot.queryParams["id"]);

  }

  private getEventById(id:number) {
    this.eventService.getEventById(id).subscribe(event => {
        this.event = event;
    });
  }

  scan() {
    this.router.navigate(['/home/event/scan'],{ queryParams: {eventId: this.event.id}})
  }
}

