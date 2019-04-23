import {Component, OnInit, ViewEncapsulation} from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Event } from '../../../models';
import { AlertService,EventService,UserService, AuthenticationService } from '../../../services';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: [
  ]
})
export class MyEventsComponent implements OnInit {

  events: Event[] = [];
  isAdmin:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService:EventService,
    private alertService: AlertService,
  ) {

  }

  private loadAllEvent() {
    this.eventService.getOwnEvents().subscribe(events => {
        this.events = events;
    });
  }

  ngOnInit() {
    this.loadAllEvent();
  }


}
