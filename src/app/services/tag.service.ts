import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class TagService {
    apiUrl = environment.apiUrl;
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

    addTag(tag: Tag) {
        return this.http.post(`${this.apiUrl}/tags`,tag);
    }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/tag/${id}`);
    }

}