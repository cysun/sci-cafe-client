import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { RewardService } from '../../../services';
import { first } from 'rxjs/operators';
import { User,Reward } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
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
export class RewardsComponent implements OnInit {
  rewards: Reward[] = [];

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllPrograms();
  }

  private loadAllPrograms() {
    this.rewardService.getAllApprovedRewards().subscribe(rewards => {
        this.rewards = rewards;
    });
  }

  onClick(id:number) {
    
  }
}

