import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,RewardService } from '../../services';
import { first } from 'rxjs/operators';
import { User,Reward } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Reward[] = [];

  addRewardForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  criteria = new FormControl('', Validators.required);
  status = new FormControl (0, []);
  imageUrl = new FormControl ('../../../assets/images/news/default.jpg', []);

  constructor(
    public http: Http,
    private rewardService:RewardService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllRewards();
    this.addRewardForm = new FormGroup({
      name:this.name,
      description:this.description,
      criteria:this.criteria,
      status:this.status,
    });
  }

  private loadAllRewards() {
    this.rewardService.getAllRewards().subscribe(rewards => {
        this.data = rewards;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
                this.alertService.success('Ad a reward successful', true);
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

  onClick(id:number) {
    
  }
}

