import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';

import '../../../../../node_modules/peity/jquery.peity.min.js';

import { Event, Reward, Progress } from '../../../models';
import { EventService, UserService, AuthenticationService, RewardService } from '../../../services';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.css',
    '../../../../assets/icon/svg-animated/svg-weather.css',
    '../../../../assets/charts/radial/radial.css',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardDefaultComponent implements OnInit {

  events: Event[] = [];
  isAdmin: string;
  progresses: Progress[] = [];

  constructor(
    private userService: UserService,
    private eventService: EventService,
  ) {

  }

  private loadAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
      this.events = events;
      for (let event of this.events) {
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
      }
    });
  }

  private loadAllProgresses() {
    this.userService.getProgresses().subscribe(progresses => {
      this.progresses = progresses;
      for (let progress of this.progresses) {
        let reward = progress.reward;
        for (let tag of Array.from(reward.tags.values())) {
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
      }
    });
  }



  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.isAdmin) {
      this.loadAttendedEvents();
      this.loadAllProgresses();
    }

  }


}
