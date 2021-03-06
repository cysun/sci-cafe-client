import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailValidators {
  Url =  environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchEmail(text) {
    // debounce
    var email = text.replace('.','itsadot426')
    return timer(100)
      .pipe(
        switchMap(() => {
          
          // Check if emailname is available
          return this.http.get<any>(`${this.Url}/email/${email}`)
        })
      );
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchEmail(control.value)
        .pipe(
          map(res => {
            // if email is already taken
            if (res) {
              // return error
              return { 'emailExists': true};
            }
          })
        );
    };

  }

}
