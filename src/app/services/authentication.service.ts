import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    apiUrl = environment.apiUrl;

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

                    if (user['jwt'] === 'inactive') {
                        return user;
                    }

                    let decodedToken = helper.decodeToken(user['jwt']);
                    localStorage.setItem('name', decodedToken['firstName'] + " " + decodedToken['lastName']);
                    localStorage.setItem('isAdmin', decodedToken['isAdmin']);
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