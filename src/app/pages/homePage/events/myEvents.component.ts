import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { first } from 'rxjs/operators';

import { Event, Tag } from '../../../models';
import { AlertService, EventService, ImageService, TagService } from '../../../services';
import { Http } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: [
  ]
})
export class MyEventsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  public Editor = ClassicEditor;
  pendings: Event[] = [];
  approveds: Event[] = [];
  rejecteds: Event[] = [];
  allTags: Tag[] = [];
  tags: Set<Tag> = new Set<Tag>();
  editEvent: Event;
  isAdmin: boolean = false;
  tag = new FormControl('', Validators.required);

  selectedFiles: FileList;
  currentFileUpload: File;

  addEventForm: FormGroup;
  addTagForm: FormGroup;
  submitted = false;
  returnUrl: string;
  name = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  eventDate = new FormControl('', Validators.required);
  startTime = new FormControl('', Validators.required);
  endTime = new FormControl('', Validators.required);
  image = new FormControl('', []);
  modules = {}

  constructor(
    private imageService: ImageService,
    private eventService: EventService,
    private tagService: TagService,
    public http: Http,
    private alertService: AlertService,
  ) {
  }

  private loadAllEvent() {
    this.eventService.getOwnApprovedEvents().subscribe(events => {
      this.approveds = events;
      if (!this.approveds) {
        return
      }
      for (let event of this.approveds) {
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
      }
    });

    this.eventService.getOwnPendingEvents().subscribe(events => {
      this.pendings = events;
      if (!this.pendings) {
        return
      }
      for (let event of this.pendings) {
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
      }
    });

    this.eventService.getOwnRejectedEvents().subscribe(events => {
      this.rejecteds = events;
      if (!this.rejecteds) {
        return
      }
      for (let event of this.rejecteds) {
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
      }
    });
  }

  ngOnInit() {
    this.loadAllEvent();
    this.loadAllTags();
    this.addTagForm = new FormGroup({
      tag: this.tag
    })
    this.addEventForm = new FormGroup({
      name: this.name,
      location: this.location,
      description: this.description,
      eventDate: this.eventDate,
      startTime: this.startTime,
      endTime: this.endTime,
      image: this.image
    });
  }

  private loadAllTags() {
    this.tagService.getAllTags().subscribe(tags => {
      this.allTags = tags;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
  }

  openAddModal(event) {
    this.clearForm();
  }

  deleteTag(id: number, name: string) {
    console.log(name);
    for (let tag of Array.from(this.tags.values())) {
      if (tag.id == id) {
        this.tags.delete(tag);
      }
    }
  }

  onAdd() {
    let id = this.tag.value
    let tag: Tag
    for (let t of this.allTags) {
      if (t.id == id) {
        tag = t;
      }
    }
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
    let flag: boolean = true;
    for (let t of Array.from(this.tags)) {
      console.log(t.name);
      if (t.id == tag.id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.tags.add(tag);
    }
  }

  openEditModal(event, id: number) {
    this.submitted = false;
    this.eventService.getEventById(id).subscribe(event => {
      this.editEvent = event;
      this.name.setValue(event.name);
      this.location.setValue(event.location);
      this.eventDate.setValue("xx");
      this.startTime.setValue(event.startTime);
      this.endTime.setValue(event.endTime);
      this.description.setValue(event.description);
      this.tags.clear();
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
        this.tags.add(tag);
      }
    });
  }

  clearForm() {
    this.name.setValue("");
    this.location.setValue("");
    this.eventDate.setValue("");
    this.startTime.setValue("");
    this.endTime.setValue("");
    this.description.setValue("");
    this.tags.clear();
  }

  closeMyModal(event) {
    //((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    this.clearForm();
  }



  get f() { return this.addEventForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addEventForm.invalid) {
      return;
    }

    this.eventService.addEvent(this.addEventForm.value, this.currentFileUpload)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          let e: any = data;
          this.alertService.success('Add an event successful', true);
          this.eventService.addEventTag(e.id, this.tags).pipe(first()).subscribe(data => {
            location.reload();
            this.clearForm();
          });

        },
        error => {
          this.submitted = false;
          this.alertService.error(error);
        });
  }

  onEdit(id: number) {
    console.log("xsahdahk")
    this.submitted = true;

    // stop here if form is invalid
    if (this.addEventForm.invalid) {
      return;
    }

    //this.description.setValue(JSON.stringify(this.editor.getContents()));

    console.log(this.description.value)

    this.eventService.editEvent(this.addEventForm.value, this.currentFileUpload, id)
      .pipe(first())
      .subscribe(
        data => {
          let e: any = data;
          this.alertService.success('Edit an event successful', true);
          this.eventService.addEventTag(e.id, this.tags).pipe(first()).subscribe(data => {
            location.reload();
            this.clearForm();
          });

        },
        error => {
          this.submitted = false;
          this.alertService.error(error);
        });
  }


  onDelete(id: number) {
    this.eventService.delete(id).pipe(first()).subscribe(data => {
      location.reload();
    });
  }

  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  public editor;
  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this.imageService.uploadImage(file).subscribe(res => {
          const range = this.editor.getSelection(true);
          const index = range.index + range.length;
          this.editor.insertEmbed(index, 'image', res['url']);
          console.log(this.editor.getContents());
          this.description.setValue(this.editor.container.firstChild.innerHTML);
        });
      }
      'editor-change'
    });
    Imageinput.click();
  }
}
