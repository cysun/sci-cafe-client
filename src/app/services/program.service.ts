import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Program } from '../models';
import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class ProgramService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

    getAllPrograms() {
        return this.http.get<Program[]>(this.apiUrl+'/programs');
    }

    addProgram(program:Program,file: File) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);
        formdata.append('name',program.name);
        formdata.append('fullName',program.fullName);
        formdata.append('description',program.description);
        return this.http.post(this.apiUrl+'/programs',formdata);
    }

    getProgramById (id:Number) {
        return this.http.get<Program>(this.apiUrl+"/program/"+id);
    }

    editProgram(program: Program,id: Number) {
        return this.http.put(`${this.apiUrl}/program/${id}`,program);
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
        return this.http.delete(`${this.apiUrl}/program/${id}`);
    }

}