import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { AlertService, RewardService, TagService, ImageService } from '../../services';
import { first } from 'rxjs/operators';
import { Reward, Tag } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';



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
  editReward: Reward;
  allTags: Tag[] = [];
  tags: Set<Tag> = new Set<Tag>();
  tag = new FormControl('', Validators.required);


  addRewardForm: FormGroup;
  addTagForm: FormGroup;
  submitted = false;
  returnUrl: string;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  criteria = new FormControl('', [Validators.required, Validators.min(1)]);
  status = new FormControl(0, []);
  endDate = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  imageUrl = new FormControl('../../../assets/images/news/default.jpg', []);

  constructor(
    public http: Http,
    private rewardService: RewardService,
    private alertService: AlertService,
    private tagService: TagService,
    private imageService: ImageService,
  ) {

  }

  ngOnInit() {
    this.loadAllRewards();
    this.loadAllTags();
    this.addTagForm = new FormGroup({
      tag: this.tag
    })
    this.addRewardForm = new FormGroup({
      name: this.name,
      description: this.description,
      criteria: this.criteria,
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  public options: Object = {
    placeholderText: 'Description',
    heightMin: 100,
    heightMax: 200
  }

  private loadAllTags() {
    this.tagService.getAllTags().subscribe(tags => {
      this.allTags = tags;
    });
  }

  private loadAllRewards() {
    this.rewardService.getAllRewards().subscribe(rewards => {
      this.data = rewards;
    });
  }

  openAddModal(event) {
    this.clearForm();
  }

  closeMyModal(event) {
    this.clearForm();
  }

  get f() { return this.addRewardForm.controls; }

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
          let r: any = data;
          this.rewardService.addRewardTag(r.id, this.tags).pipe(first()).subscribe(data => {
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
    this.rewardService.delete(id).pipe(first()).subscribe(data => {
      location.reload();
    });
  }

  onClick(id: number) {

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


  openEditModal(event, id: number) {
    this.submitted = false;
    this.rewardService.getRewardById(id).subscribe(reward => {
      this.editReward = reward;
      this.name.setValue(reward.name);
      this.description.setValue(reward.description);
      this.criteria.setValue(reward.criteria);
      this.startDate.setValue("Start Date");
      this.endDate.setValue("End Date");
      this.status.setValue(reward.status);
      this.tags.clear();
      for (let tag of Array.from(reward.tags.values())) {
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
    this.submitted = false;
    this.name.setValue("");
    this.criteria.setValue("");
    this.description.setValue("");
    this.startDate.setValue("");
    this.endDate.setValue("");
    this.status.setValue("");
    this.tags.clear();
  }

  onEdit(id: number) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addRewardForm.invalid) {
      return;
    }



    this.rewardService.editReward(this.addRewardForm.value, id)
      .pipe(first())
      .subscribe(
        data => {
          let r: any = data;
          this.rewardService.addRewardTag(r.id, this.tags).pipe(first()).subscribe(data => {
            location.reload();
            this.clearForm();
          });
        },
        error => {
          this.submitted = false;
          this.alertService.error(error);
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

