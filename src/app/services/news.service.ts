import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { News } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class NewsService {
    apiUrl = "http://localhost:8080/springrest/api"
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

    getNewsById (id:Number) {
        return this.http.get<News>(this.apiUrl+"/news/"+id);
    }

    editProgram(news: News,id: Number) {
        return this.http.put(`${this.apiUrl}/news/${id}`,news);
    }

    // getAttendees(id:Number) {
    //     return this.http.get<User[]>(this.apiUrl+'/event/' + id + '/attendees');
    // }

    // getEventById (id:Number) {
    //     return this.http.get<Event>(this.apiUrl+"/event/"+id);
    // }

    // rejectEventById (id:Number) {
    //     return this.http.put<Event>(this.apiUrl+"/event/reject/"+id,null);
    // }

    // approveEventById (id:Number) {
    //     return this.http.put<Event>(this.apiUrl+"/event/approve/"+id,null);
    // }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/news/${id}`);
    }

}