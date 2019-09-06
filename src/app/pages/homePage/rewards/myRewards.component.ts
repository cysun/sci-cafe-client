import {Component, OnInit, ViewEncapsulation} from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Reward } from '../../../models';
import { AlertService,RewardService,UserService, AuthenticationService } from '../../../services';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Http} from '@angular/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-myRewards',
  templateUrl: './myRewards.component.html',
  styleUrls: [
  ]
})
export class MyRewardsComponent implements OnInit {

  rewards: Reward[] = [];
  isAdmin:boolean = false;
  editReward: Reward;

  selectedFiles: FileList;
  currentFileUpload: File;

  addRewardForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  criteria = new FormControl('', Validators.required);
  status = new FormControl (0, []);

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private rewardService:RewardService,
    public http: Http,
    private alertService: AlertService,
  ) {

  }

  private loadAllReward() {
    this.rewardService.getOwnRewards().subscribe(rewards => {
        this.rewards = rewards;
    });
  }

  ngOnInit() {
    this.loadAllReward();
    this.addRewardForm = new FormGroup({
      name:this.name,
      description:this.description,
      criteria:this.criteria,
      status:this.status,
    });
  }
  
  openMyModal(reward) {
    document.querySelector('#' + reward).classList.add('md-show');
  }

  closeMyModal(reward) {
    ((reward.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.addRewardForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addRewardForm.invalid) {
        return;
    }

    console.log(this.addRewardForm.value);

    this.rewardService.addReward(this.addRewardForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Add an reward successful', true);
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
}
  

  onDelete(id:number) {
    this.rewardService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  blured = false
  focused = false

  created(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  openEditModal(event,id:number) {
    this.rewardService.getRewardById(id).subscribe(reward=>{
      this.editReward = reward;
      this.name.setValue(reward.name);
      this.description.setValue(reward.description);
      this.criteria.setValue(reward.criteria);
    });
    
    document.querySelector('#' + event).classList.add('md-show');
  }

  clearForm() {
    this.name.setValue("");
    this.criteria.setValue("");
    this.description.setValue("");
  }

  onEdit(id:number) {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.addRewardForm.invalid) {
        return;
    }
  
    this.rewardService.editReward(this.addRewardForm.value,id)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Edit a reward successful', true);
                this.clearForm();
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
  }
}
