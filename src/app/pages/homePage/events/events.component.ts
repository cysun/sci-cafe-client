import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { EventService, TagService } from '../../../services';
import { Event, Tag } from '../../../models';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
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
export class EventsComponent implements OnInit {
  events: Event[] = [];
  allEvents: Event[] = [];
  allTags: Tag[] = [];
  selectedTags = new Set<Tag>();


  constructor(
    public http: Http,
    private eventService: EventService,
    private tagService: TagService,
  ) {

  }

  ngOnInit() {
    this.loadAllApprovedEvents();
    this.loadAllTags();
  }

  private loadAllApprovedEvents() {
    this.eventService.getAllApprovedEvents().subscribe(events => {
      this.allEvents = events;
      this.events = events;
      for (let event of this.events) {
        event.tagIds = new Set<number>()
        for (let tag of Array.from(event.tags.values())) {
          event.tagIds.add(tag.id);
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
      this.loadEvents();
    } else {
      tag.type = "label label-default";
      this.selectedTags.delete(tag);
      this.loadEvents();
    }
  }

  private loadEvents() {
    if (this.selectedTags.size == 0) {
      this.events = this.allEvents
    } else {
      this.events = [];
      for (let event of this.allEvents) {
        for (let tag of Array.from(this.selectedTags)) {
          if (event.tagIds.has(tag.id)) {
            if (this.events.indexOf(event) == -1) {
              this.events.push(event);
            }
          }
        }
      }
    }
  }
}

