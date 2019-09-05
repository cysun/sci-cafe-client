import { Component, OnInit,ViewChild} from '@angular/core';
import {Http} from '@angular/http';

import { RewardService,TagService,AlertService,EventService} from '../../../services';
import { first } from 'rxjs/operators';
import { Reward,Tag,Event,User} from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  addTagForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  tag = new FormControl('', Validators.required);
  tags: Tag[] = [];
  events: Event[] = [];
  winners: User[] = [];
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Event[] = [];
  constructor(
    public http: Http,
    private rewardService: RewardService,
    private router: Router,
    private routerInfo:ActivatedRoute,
    private tagService: TagService,
    private alertService:AlertService,
    private eventService:EventService,
  ) { 

  }

  ngOnInit() {
    this.getRewardById(this.routerInfo.snapshot.queryParams["id"]);
    this.addTagForm = new FormGroup({
      tag:this.tag
    })
    this.loadAllTags();
    this.getQualifiedEvents(this.routerInfo.snapshot.queryParams["id"]);
    this.getWinners(this.routerInfo.snapshot.queryParams["id"]);
    this.loadAllEvents();
  }

  private getQualifiedEvents(id:number) {
    this.rewardService.getQualifiedEvents(id).subscribe(events=> {
        this.events = events;
        console.log(events);
    });
  }

  private getWinners(id:number) {
    this.rewardService.getWinner(id).subscribe(users=> {
        this.winners = users;
    });
  }

  private getRewardById(id:number) {
    this.rewardService.getRewardById(id).subscribe(reward => {
        this.reward = reward;
    });
  }

  private loadAllTags() {
    this.tagService.getAllTags().subscribe(tags => {
        this.tags = tags;
    });
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
        this.data = events;
    });
  }

  get tagForm() {return this.addTagForm.controls; }

  onAdd() {
    if (this.addTagForm.invalid) {
      return;
    }

    this.rewardService.addRewardTag(Number(this.reward.id),this.tag.value).pipe().subscribe(data=>{
      location.reload();
    },error => {
      this.alertService.error(error);
      this.submitted = false;
    });
  }

  addEventToRewardById(eid:number) {
    console.log("xxxxx");
    this.rewardService.addEventToRewardById(this.routerInfo.snapshot.queryParams["id"],eid).subscribe();
    location.reload();
  }

  scan() {
    this.router.navigate(['/home/reward/scan'],{ queryParams: {rewardId: this.reward.id}})
  }
}

