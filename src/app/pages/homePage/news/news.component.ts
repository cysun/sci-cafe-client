import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { NewsService } from '../../../services';
import { first } from 'rxjs/operators';
import { User,News } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
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
export class NewsComponent implements OnInit {
  news: News[] = [];

  constructor(
    public http: Http,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllPrograms();
  }

  private loadAllPrograms() {
    this.newsService.getAllNews().subscribe(news => {
        this.news = news;
    });
  }

  onClick(id:number) {
    
  }
}

