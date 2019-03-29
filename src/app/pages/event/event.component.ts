import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,UserService,EventService } from '../../services';
import { first } from 'rxjs/operators';
import { User,Event } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Event[] = [];

  addEventForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  name = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  eventDate = new FormControl ('', Validators.required);
  startTime = new FormControl ('', Validators.required);
  endTime = new FormControl ('', Validators.required);
  status = new FormControl (0, []);

  constructor(
    public http: Http,
    private userService: UserService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllEvents();
    this.addEventForm = new FormGroup({
      name:this.name,
      location:this.location,
      description:this.description,
      eventDate:this.eventDate,
      startTime:this.startTime,
      endTime:this.endTime,
      status:this.status
    });
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
        this.data = events;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.addEventForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addEventForm.invalid) {
        return;
    }

    console.log(this.addEventForm.value);

    this.eventService.addEvent(this.addEventForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Add an event successful', true);
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
}
  

  onDelete(id:number) {
    this.eventService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  onClick(id:number) {
    
  }
}

