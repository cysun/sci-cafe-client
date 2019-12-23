import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Http } from '@angular/http';

import { RewardService } from '../../../services';
import { Reward, Event } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-singleRewards',
  templateUrl: './singleReward.component.html',
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
export class SingleRewardComponent implements OnInit {
  reward: Reward;
  events: Event[] = [];
  isAdmin: string;

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private route: ActivatedRoute,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getRewardById(this.routerInfo.snapshot.queryParams["id"]);
    this.getQualifiedEvents(this.routerInfo.snapshot.queryParams["id"]);
    this.isAdmin = localStorage.getItem("isAdmin");
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

  private getQualifiedEvents(id: number) {
    this.rewardService.getQualifiedEvents(id).subscribe(events => {
      this.events = events;
      console.log(events);
    });
  }

  private rejectRewardById(id: Number) {
    this.rewardService.rejectRewardById(id).subscribe(success => {
      window.location.reload();
    });

  }

  private approveRewardById(id: Number) {
    this.rewardService.approveRewardById(id).subscribe(
      success => {
        window.location.reload();
      }
    );
  }
}

