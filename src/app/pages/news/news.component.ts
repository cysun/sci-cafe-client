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

  selectedFiles: FileList;
  currentFileUpload: File;

  addNewsForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  title = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);
  isTop = new FormControl('', []);
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
}

