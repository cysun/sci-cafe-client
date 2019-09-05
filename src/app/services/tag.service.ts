import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../models';
import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class TagService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

    getAllTags() {
        return this.http.get<Tag[]>(this.apiUrl+'/tags');
    }

    getTagById (id:Number) {
        return this.http.get<Tag>(this.apiUrl+"/tag/"+id);
    }

    editTag(tag: Tag,id: Number) {
        return this.http.put(`${this.apiUrl}/tag/${id}`,tag);
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
        return this.http.delete(`${this.apiUrl}/tag/${id}`);
    }

}