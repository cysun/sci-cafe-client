import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,NewsService } from '../../services';
import { first } from 'rxjs/operators';
import { User,News } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: News[] = [];
  editNews : News;

  selectedFiles: FileList;
  currentFileUpload: File;

  addNewsForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  title = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);
  isTop = new FormControl('No', []);
  image = new FormControl('', []);


  constructor(
    public http: Http,
    private newsService:NewsService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllNews();
    this.addNewsForm = new FormGroup({
      title:this.title,
      author:this.author,
      content:this.content,
      isTop:this.isTop,
      image:this.image
    });
  }

  private loadAllNews() {
    this.newsService.getAllNews().subscribe(news => {
        this.data = news;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.addNewsForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNewsForm.invalid) {
        return;
    }
    console.log(this.addNewsForm.value);

    this.newsService.addNews(this.addNewsForm.value,this.currentFileUpload)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Add an news successful', true);
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
}
  

selectFile(event) {
  this.selectedFiles = event.target.files;
  this.currentFileUpload = this.selectedFiles.item(0);
}

  onDelete(id:number) {
    this.newsService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  onClick(id:number) {
    
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

  openEditModal(event,id:number) {
    this.newsService.getNewsById(id).subscribe(news=>{
      this.editNews = news;
      this.title.setValue(news.title);
      this.author.setValue(news.author);
      this.content.setValue(news.content);
      this.isTop.setValue(news.isTop);
    });
    
    document.querySelector('#' + event).classList.add('md-show');
  }

  clearForm() {
    this.title.setValue("");
    this.author.setValue("");
    this.content.setValue("");
    this.isTop.setValue("");
  }

  onEdit(id:number) {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.addNewsForm.invalid) {
        return;
    }
  
    this.newsService.editNews(this.addNewsForm.value,this.currentFileUpload,id)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Edit a program successful', true);
                this.clearForm();
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
  }
}

