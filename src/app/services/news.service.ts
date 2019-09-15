import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { News } from '../models';
import { environment } from '../../environments/environment';

@Injectable() 
export class NewsService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllNews() {
        return this.http.get<News[]>(this.apiUrl+'/news');
    }

    getAllTopNews() {
        return this.http.get<News[]>(this.apiUrl+'/topNews');
    }

    addNews(news:News,file: File) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);
        formdata.append('author',news.author);
        formdata.append('title',news.title);
        formdata.append('content',news.content);
        formdata.append('isTop',news.isTop);
        return this.http.post(this.apiUrl+'/news',formdata);
    }

    editNews(news:News,file: File,id:number) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);
        formdata.append('author',news.author);
        formdata.append('title',news.title);
        formdata.append('content',news.content);
        formdata.append('isTop',news.isTop);
        return this.http.put(`${this.apiUrl}/news/${id}`,formdata);
    }

    getNewsById (id:Number) {
        return this.http.get<News>(this.apiUrl+"/news/"+id);
    }

    editProgram(news: News,id: Number) {
        return this.http.put(`${this.apiUrl}/news/${id}`,news);
    }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/news/${id}`);
    }

}