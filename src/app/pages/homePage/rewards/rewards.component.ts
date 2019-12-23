import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { RewardService, TagService } from '../../../services';
import { first } from 'rxjs/operators';
import { Tag, Reward } from '../../../models';
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
  allRewards: Reward[] = [];
  allTags: Tag[] = [];
  selectedTags = new Set<Tag>();

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.loadAllRewards();
    this.loadAllTags();
  }

  private loadAllRewards() {
    this.rewardService.getAllApprovedRewards().subscribe(rewards => {
      this.allRewards = rewards;
      this.rewards = rewards;
      for (let reward of this.rewards) {
        reward.tagIds = new Set<number>()
        for (let tag of Array.from(reward.tags.values())) {
          reward.tagIds.add(tag.id);
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

  private loadAllTags() {
    this.tagService.getAllTags().subscribe(tags => {
      this.allTags = tags;
      for (let tag of this.allTags) {
        tag.type = "label label-default"
      }
    });
  }

  onClick(tag: Tag) {
    if (tag.type === "label label-default") {
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
      this.selectedTags.add(tag);
      this.loadRewards();
    } else {
      tag.type = "label label-default";
      this.selectedTags.delete(tag);
      this.loadRewards();
    }
  }

  private loadRewards() {
    if (this.selectedTags.size == 0) {
      this.rewards = this.allRewards
    } else {
      this.rewards = [];
      for (let reward of this.allRewards) {
        for (let tag of Array.from(this.selectedTags)) {
          if (reward.tagIds.has(tag.id)) {
            if (this.rewards.indexOf(reward) == -1) {
              this.rewards.push(reward);
            }
          }
        }
      }
    }
  }
}

