import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models';

@Injectable()
export class AuthenticationService {
    apiUrl = "http://localhost:8080/springrest/api"

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    localStorage.setItem('access_token', user['jwt']);
                    console.log(user)
                    const helper = new JwtHelperService();

                    if (helper.isTokenExpired(user['jwt'])) {
                        this.logout();
                        location.reload();
                    }
            
                    let decodedToken = helper.decodeToken(user['jwt']);
                    localStorage.setItem('name', decodedToken['firstName'] + " " + decodedToken['lastName']);
                    localStorage.setItem('isAdmin',decodedToken['isAdmin']);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('access_token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('name');
    }
}