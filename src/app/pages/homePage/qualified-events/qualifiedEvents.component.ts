import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { RewardService, TagService, AlertService, EventService } from '../../../services';
import { Reward, Tag, Event, User } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qualifiedEvents',
  templateUrl: './qualifiedEvents.component.html',
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
export class QualifiedEventsComponent implements OnInit {
  reward: Reward;
  submitted = false;
  returnUrl: string;
  tags: Tag[] = [];
  events: Event[] = [];
  winners: User[] = [];
  public filterQuery = '';
  data: Event[] = [];
  name: string;
  isAdmin: string;
  id: number;
  constructor(
    public http: Http,
    private rewardService: RewardService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private tagService: TagService,
    private alertService: AlertService,
    private eventService: EventService,
  ) {

  }

  ngOnInit() {
    this.getRewardById(this.routerInfo.snapshot.queryParams["id"]);
    this.getQualifiedEvents(this.routerInfo.snapshot.queryParams["id"]);
    this.getWinners(this.routerInfo.snapshot.queryParams["id"]);
    this.loadAllEvents();
    this.name = localStorage.getItem("name");
    this.isAdmin = localStorage.getItem("isAdmin");
  }

  private getQualifiedEvents(id: number) {
    this.rewardService.getQualifiedEvents(id).subscribe(events => {
      this.events = events;
    });
  }

  saveId(id: number) {
    this.id = id;
  }

  private getWinners(id: number) {
    this.rewardService.getWinner(id).subscribe(users => {
      this.winners = users;
    });
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

  private loadAllEvents() {
    this.eventService.getAllApprovedEvents().subscribe(events => {
      this.data = events;
    });
  }

  addEventToRewardById(eid: number) {
    this.rewardService.addEventToRewardById(this.routerInfo.snapshot.queryParams["id"], eid).subscribe(success => {
      location.reload();
    });

  }

  deleteEventFromRewardById(eid: number) {
    this.rewardService.deleteEventFromRewardById(this.routerInfo.snapshot.queryParams["id"], eid).subscribe(success => {
      location.reload();
    });

  }

  scan() {
    this.router.navigate(['/home/reward/scan'], { queryParams: { rewardId: this.reward.id } })
  }

}

