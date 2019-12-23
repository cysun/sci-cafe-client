import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { AlertService, TagService, EventService, ImageService } from '../../services';
import { first } from 'rxjs/operators';
import { Event, Tag } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  allTags: Tag[] = [];
  tags: Set<Tag> = new Set<Tag>();
  tag = new FormControl('', Validators.required);

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
  status = new FormControl('', []);
  image = new FormControl('', []);

  constructor(
    public http: Http,
    private eventService: EventService,
    private alertService: AlertService,
    private tagService: TagService,
    private imageService: ImageService,
  ) {

  }

  ngOnInit() {
    this.loadAllEvents();
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
      status: this.status,
      endTime: this.endTime,
      image: this.image
    });
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
      this.data = events;
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

  deleteTag(id: number) {
    for (let tag of Array.from(this.tags.values())) {
      if (tag.id == id) {
        this.tags.delete(tag);
      }
    }
  }

  onAdd() {
    if (this.addTagForm.invalid) {
      return;
    }
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
      this.status.setValue(event.status);
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
    this.submitted = false;
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

