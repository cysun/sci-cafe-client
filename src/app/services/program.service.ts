import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Program } from '../models';
import { environment } from '../../environments/environment';

@Injectable() 
export class ProgramService {
    apiUrl = environment.apiUrl;
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

    editProgram(program: Program,file: File,id: Number) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);
        formdata.append('name',program.name);
        formdata.append('fullName',program.fullName);
        formdata.append('description',program.description);

        return this.http.put(`${this.apiUrl}/program/${id}`,formdata);
    }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/program/${id}`);
    }

}