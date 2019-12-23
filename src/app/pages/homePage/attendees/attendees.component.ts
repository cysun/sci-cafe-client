import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { EventService, TagService, AlertService } from '../../../services';
import { Event, Tag } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendeess',
  templateUrl: './attendees.component.html',
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
export class AttendeesComponent implements OnInit {
  event: Event;
  addTagForm: FormGroup;
  submitted = false;
  returnUrl: string;
  tag = new FormControl('', Validators.required);
  tags: Tag[] = [];
  name: string;
  isAdmin: string;
  constructor(
    public http: Http,
    private eventService: EventService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private tagService: TagService,
  ) {

  }

  ngOnInit() {
    this.getEventById(this.routerInfo.snapshot.queryParams["id"]);
    // this.addTagForm = new FormGroup({
    //   tag:this.tag
    // });
    this.name = localStorage.getItem("name");
    this.isAdmin = localStorage.getItem("isAdmin");
  }



  private getEventById(id: number) {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      for (let tag of Array.from(event.tags.values())) {
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

  // private loadAllTags() {
  //   this.tagService.getAllTags().subscribe(tags => {
  //       this.tags = tags;
  //   });
  // }

  // get tagForm() {return this.addTagForm.controls; }

  // private deleteTag (eventId:number,tagId:number) {
  //   this.eventService.deleteTag(eventId,tagId).pipe().subscribe(data=>{
  //     location.reload();
  //   },error => {
  //     this.alertService.error(error);
  //     this.submitted = false;
  //   });
  // }

  // onAdd() {
  //   if (this.addTagForm.invalid) {
  //     return;
  //   }

  //   this.eventService.addEventTag(Number(this.event.id),this.tag.value).pipe().subscribe(data=>{
  //     location.reload();
  //   },error => {
  //     this.alertService.error(error);
  //     this.submitted = false;
  //   });
  // }

  scan() {
    this.router.navigate(['/home/event/scan'], { queryParams: { eventId: this.event.id } })
  }
}

