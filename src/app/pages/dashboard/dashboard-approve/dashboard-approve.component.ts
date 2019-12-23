import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';

import 'peity/jquery.peity.min';

import { Router, ActivatedRoute } from '@angular/router';

import { Event, Reward, Progress } from '../../../models/index.js';
import { AlertService, EventService, UserService, AuthenticationService, RewardService } from '../../../services/index.js';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-approve',
  templateUrl: './dashboard-approve.component.html',
  styleUrls: [
    './dashboard-approve.component.css',
    '../../../../assets/icon/svg-animated/svg-weather.css',
    '../../../../assets/charts/radial/radial.css',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardApproveComponent implements OnInit {
  @ViewChild('ctdTabset') ctdTabset;

  events: Event[] = [];
  rewards: Reward[] = [];
  isAdmin: string;
  attendedEvents: Event[] = [];
  progresses: Progress[] = [];

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private rewardService: RewardService,

  ) {

  }

  private loadAllEvents() {
    this.eventService.getAllPendingEvents().subscribe(events => {
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

  private loadAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
      this.attendedEvents = events
    });
  }

  private loadAllProgresses() {
    this.userService.getProgresses().subscribe(progresses => {
      this.progresses = progresses;
    });
  }

  private loadAllRewards() {
    this.rewardService.getAllPendingRewards().subscribe(rewards => {
      this.rewards = rewards
      for (let reward of this.rewards) {
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

  private rejectById(id: Number) {
    this.eventService.rejectEventById(id).subscribe(success => {
      window.location.reload();
    });

  }

  private approveById(id: Number) {
    this.eventService.approveEventById(id).subscribe(
      success => {
        window.location.reload();
      }
    );
  }

  private rejectRewardById(id: Number) {
    this.rewardService.rejectRewardById(id).subscribe(
      success => {
        window.location.reload();
      }
    );
  }

  private approveRewardById(id: Number) {
    this.rewardService.approveRewardById(id).subscribe(
      success => {
        window.location.reload();
      }
    );
  }

  ngOnInit() {
    this.loadAllEvents();
    this.loadAllRewards();
    console.log(this.rewards);
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.isAdmin) {
      this.loadAttendedEvents();
      this.loadAllProgresses();
    }

  }


}
