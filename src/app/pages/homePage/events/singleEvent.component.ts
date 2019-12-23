import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { EventService } from '../../../services';
import { first } from 'rxjs/operators';
import { Event } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-singleEvents',
  templateUrl: './singleEvent.component.html',
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
export class SingleEventComponent implements OnInit {
  event: Event;
  isAdmin: String;

  constructor(
    public http: Http,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getEventById(this.routerInfo.snapshot.queryParams["id"]);
    this.isAdmin = localStorage.getItem("isAdmin");
  }

  private getEventById(id: number) {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      for (let tag of Array.from(event.tags.values())) {
        if (tag.id % 2 == 0 && tag.id % 3 == 0 && tag.id % 5 == 0) {
          tag.type = "label label-success"
        } else if ((tag.id % 2 == 0 && tag.id % 3 == 0) || (tag.id % 3 == 0 && tag.id % 5 == 0) || (tag.id % 2 == 0 && tag.id % 5 == 0)) {
          tag.type = "label label-info"
        } else if (tag.id % 2 == 0) {
          tag.type = "label label-primary"
        } else if (tag.id % 3 == 0) {
          tag.type = "label label-warning"
        } else {
          tag.type = "label label-danger"
        }
      }
    });
  }

  private approveById(id: Number) {
    this.eventService.approveEventById(id).subscribe(
      success => {
        window.location.reload();
      }
    );
  }

  private rejectById(id: Number) {
    this.eventService.rejectEventById(id).subscribe(success => {
      window.location.reload();
    });
  }

}

