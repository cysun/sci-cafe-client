import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,UserService,EventService } from '../../services';
import { first } from 'rxjs/operators';
import { Event } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
  selectedFiles: FileList;
  currentFileUpload: File;
  editEvent: Event;

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
  image = new FormControl ('', []);

  constructor(
    public http: Http,
    private eventService: EventService,
    private alertService: AlertService,
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
      status:this.status,
      image:this.image
    });
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
        this.data = events;
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

  onClick(id:number) {
    
  }

  onEdit(id:number) {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.addEventForm.invalid) {
        return;
    }
  
    this.eventService.editEvent(this.addEventForm.value,this.currentFileUpload,id)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Edit an event successful', true);
                this.clearForm();
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
  }

  openEditModal(event,id:number) {
    this.eventService.getEventById(id).subscribe(event=>{
      this.editEvent = event;
      this.name.setValue(event.name);
      this.location.setValue(event.location);
      this.eventDate.setValue("xx");
      this.startTime.setValue(event.startTime);
      this.endTime.setValue(event.endTime);
      this.description.setValue(event.description);
    });
    
    document.querySelector('#' + event).classList.add('md-show');
  }

  clearForm() {
    this.name.setValue("");
    this.location.setValue("");
    this.eventDate.setValue("");
    this.startTime.setValue("");
    this.endTime.setValue("");
    this.description.setValue("");
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

