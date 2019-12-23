import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User,Progress} from '../models';
import { environment } from '../../environments/environment';

@Injectable() 
export class UserService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl+'/users');
    }

    activate(token:string) {
        return this.http.get<Event>(this.apiUrl+"/activate?token="+token);
    }

    register(user: User) {
        return this.http.post(this.apiUrl+'/register', user);
    }

    registers(user: User) {
        return this.http.post(this.apiUrl+'/registers', user);
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

    getProgresses() {
        return this.http.get<Progress[]>(`${this.apiUrl}/user/progresses`);
    }
}