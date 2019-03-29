import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class UserService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl+'/users');
    }

    register(user: User) {
        return this.http.post(this.apiUrl+'/register', user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/user/${id}`);
    }

    deleteUserProgram(id: number,pid:number) {
        return this.http.put(`${this.apiUrl}/deleteUserProgram/${id}/${pid}`,[]);
    }

    addUserProgram(id: number,pid:number) {
        return this.http.put(`${this.apiUrl}/addUserProgram/${id}/${pid}`,[]);
    }

    getProfile() {
        return this.http.get<User>(`${this.apiUrl}/profile`);
    }

    getUserById(id:number) {
        return this.http.get<User>(`${this.apiUrl}/user/${id}`)
    }

    editUser(id:number,user:User) {
        return this.http.put(`${this.apiUrl}/user/${id}`,user);
    }
}