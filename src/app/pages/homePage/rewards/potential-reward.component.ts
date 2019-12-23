import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { RewardService, EventService } from '../../../services';
import { Reward, Event } from '../../../models';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-potential-reward',
  templateUrl: './potential-reward.component.html',
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
export class PotentialRewardComponent implements OnInit {
  reward: Reward;
  events: Event[] = [];
  isAdmin: string;
  attendedEvents: Event[] = [];

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private eventService: EventService,
    private routerInfo: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getRewardById(this.routerInfo.snapshot.queryParams["id"]);
    this.getQualifiedEvents(this.routerInfo.snapshot.queryParams["id"]);
    this.isAdmin = localStorage.getItem("isAdmin");
    this.getAttendedEvents();
  }

  private getRewardById(id: number) {
    this.rewardService.getRewardById(id).subscribe(reward => {
      this.reward = reward;
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
    });
  }

  private getAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
      this.attendedEvents = events;
    });
  }

  private getQualifiedEvents(id: number) {
    this.rewardService.getQualifiedEvents(id).subscribe(events => {
      this.events = events;
      console.log(events);
    });
  }

  contains(attendedEvents: Event[], event: Event) {
    return attendedEvents.findIndex(item => item.id == event.id);
  }
}

