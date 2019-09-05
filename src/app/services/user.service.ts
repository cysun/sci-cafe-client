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

    addUserRole(id: number,rid:number) {
        return this.http.put(`${this.apiUrl}/addUserRole/${id}/${rid}`,[]);
    }

    deleteUserRole(id: number,rid:number) {
        return this.http.put(`${this.apiUrl}/deleteUserRole/${id}/${rid}`,[]);
    }

    getProfile() {
        return this.http.get<User>(`${this.apiUrl}/profile`);
    }

    getUserById(id:number) {
        return this.http.get<User>(`${this.apiUrl}/user/${id}`)
    }

    isUsernameExists(username:string) {
        return this.http.get<boolean>(`${this.apiUrl}/username/${username}`)
    }

    getUserByemail(email:string) {
        return this.http.get<User>(`${this.apiUrl}/email/${email}`)
    }

    editUser(id:number,user:User) {
        return this.http.put(`${this.apiUrl}/user/${id}`,user);
    }

    verifyEmail(email:string) {
        email = email.replace('.','itsadot426');
        return this.http.get<any>(`${this.apiUrl}/verify/${email}`)
    }

    resetPassword(email:string) {
        console.log("reset")
        email = email.replace('.','itsadot426');
        return this.http.get<any>(`${this.apiUrl}/resetPassword/${email}`)
    }
}