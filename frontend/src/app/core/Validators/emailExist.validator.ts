import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class isEmailExist {

  // private http = inject(HttpClient);
  constructor(private http: HttpClient){}

  emailExists(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      if (!control.value) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() =>
          this.http.post<{
            success: boolean;
            data: {
              emailExists: boolean;
              contactNumberExists: boolean;
            };
          }>(
            'http://localhost:3000/api/user/check-userMailContactExits',
            {
              email: control.value
            }
          )
        ),
        map(response =>
          response.data.emailExists ? { emailExists: true } : null
        ),
        catchError(() => of(null))
      );
    };
  }


    emailExistsForgotPass(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      if (!control.value) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() =>
          this.http.post<{
            success: boolean;
            data: {
              emailExists: boolean;
              contactNumberExists: boolean;
            };
          }>(
            'http://localhost:3000/api/user/check-userMailContactExits',
            {
              email: control.value
            }
          )
        ),
        map(response =>
          response.data.emailExists ? null : { emailExistsForgotPass: true }
        ),
        catchError(() => of(null))
      );
    };
  }
}
