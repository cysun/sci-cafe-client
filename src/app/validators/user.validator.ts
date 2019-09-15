import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {
  Url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchUser(text) {
    // debounce
    return timer(100)
      .pipe(
        switchMap(() => {
          console.log(text);
          // Check if username is available
          return this.http.get<any>(`${this.Url}/username/${text}`)
        })
      );
  }

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            // if username is already taken
            if (res) {
              // return error
              return { 'userNameExists': true};
            }
          })
        );
    };

  }

}
