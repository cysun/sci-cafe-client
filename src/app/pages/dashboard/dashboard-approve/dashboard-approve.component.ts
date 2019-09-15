import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';

import 'peity/jquery.peity.min';

import { Router, ActivatedRoute } from '@angular/router';

import { Event,Reward,Progress} from '../../../models/index.js';
import { AlertService,EventService,UserService, AuthenticationService,RewardService} from '../../../services/index.js';

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

  events: Event[] = [];
  rewards: Reward[] = [];
  isAdmin:string;
  attendedEvents:Event[] = [];
  progresses: Progress[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService:EventService,
    private rewardService:RewardService,
    private alertService: AlertService,
  ) {

  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
        this.events = events;
    });
  }

  private loadAllProgresses() {
    this.userService.getProgresses().subscribe(progresses => {
        this.progresses = progresses;
        console.log(progresses)
    });
  }

  private getAllAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
      this.attendedEvents = events;
  });
  }

  private loadAllRewards() {
    this.rewardService.getAllRewards().subscribe(rewards => {
        this.rewards = rewards;
    });
  }

  private rejectById(id:Number) {
    this.eventService.rejectEventById(id).subscribe();
    window.location.reload();
  }

  private approveById(id:Number) {
    this.eventService.approveEventById(id).subscribe();
    window.location.reload();
  }

  private rejectRewardById(id:Number) {
    this.rewardService.rejectRewardById(id).subscribe();
    window.location.reload();
  }

  private approveRewardById(id:Number) {
    this.rewardService.approveRewardById(id).subscribe();
    window.location.reload();
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.isAdmin) {
      this.loadAllEvents();
      this.loadAllRewards();
      this.getAllAttendedEvents();
      this.loadAllProgresses();
    }

  }


}
