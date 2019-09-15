import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,TagService } from '../../services';
import { first } from 'rxjs/operators';
import { Tag } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Tag[] = [];
  editTag : Tag;
  
  addTagForm: FormGroup;
  editTagForm: FormGroup;
  submitted = false; 
  editSubmitted = false;
  returnUrl: string;
  name = new FormControl('', Validators.required);
  editName  = new FormControl('', Validators.required);

  constructor(
    public http: Http,
    private tagService:TagService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllTags();
    this.addTagForm = new FormGroup({
      name:this.name,
    });
    this.editTagForm = new FormGroup({
      name:this.editName,
    });
  }

  public options: Object = {
    placeholderText: 'Description',
    heightMin: 100,
    heightMax: 200
  }

  private loadAllTags() {
    this.tagService.getAllTags().subscribe(tags => {
        this.data = tags;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.addTagForm.controls; }

  get e() { return this.editTagForm.controls;}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addTagForm.invalid) {
        return;
    }

    console.log(this.addTagForm.value);

    this.tagService.addTag(this.addTagForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Ad a tag successful', true);
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
  }
  

  onDelete(id:number) {
    this.tagService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  onClick(id:number) {
    
  }

  openEditModal(event,id:number) {
    this.tagService.getTagById(id).subscribe(tag=>{
      this.editTag = tag;
      this.editName.setValue(tag.name);
    });
    
    document.querySelector('#' + event).classList.add('md-show');
  }

  clearForm() {
    this.editName.setValue("");
  }

  onEdit(id:number) {
    this.editSubmitted = true;
  
    // stop here if form is invalid
    if (this.editTagForm.invalid) {
        return;
    }
  
    this.tagService.editTag(this.editTagForm.value,id)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Edit a tag successful', true);
                this.clearForm();
                location.reload();
            },
            error => {
                this.editSubmitted = false;
                this.alertService.error(error);
            });
  }

}

