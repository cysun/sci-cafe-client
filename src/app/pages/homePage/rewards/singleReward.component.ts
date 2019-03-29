import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { RewardService } from '../../../services';
import { first } from 'rxjs/operators';
import { Reward,User } from '../../../models';
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

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private route: ActivatedRoute,
    private router: Router,
    private routerInfo:ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.getRewardById(this.routerInfo.snapshot.queryParams["id"]);
  }

  private getRewardById(id:number) {
    this.rewardService.getRewardById(id).subscribe(reward => {
        this.reward = reward;
    });
  }

}

