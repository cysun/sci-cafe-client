import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }
    helper = new JwtHelperService();
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let token = localStorage.getItem('access_token');
        if (this.helper.isTokenExpired(token)) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('name');
            if (token != null) {
                location.reload();
            }
        }
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return next.handle(request);
    }


}