import {Component, OnInit, ViewEncapsulation} from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Event } from '../../../models';
import { AlertService,EventService,UserService, AuthenticationService } from '../../../services';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Http} from '@angular/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: [
  ]
})
export class MyEventsComponent implements OnInit {

  events: Event[] = [];
  isAdmin:boolean = false;

  selectedFiles: FileList;
  currentFileUpload: File;

  addEventForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  name = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  eventDate = new FormControl ('', Validators.required);
  startTime = new FormControl ('', Validators.required);
  endTime = new FormControl ('', Validators.required);
  image = new FormControl ('', []);

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService:EventService,
    public http: Http,
    private alertService: AlertService,
  ) {

  }

  private loadAllEvent() {
    this.eventService.getOwnEvents().subscribe(events => {
        this.events = events;
    });
  }

  ngOnInit() {
    this.loadAllEvent();
    this.addEventForm = new FormGroup({
      name:this.name,
      location:this.location,
      description:this.description,
      eventDate:this.eventDate,
      startTime:this.startTime,
      endTime:this.endTime,
      image:this.image
    });
  }

  
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
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

    this.eventService.addEvent(this.addEventForm.value,this.currentFileUpload)
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

}
