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

  private http = inject(HttpClient);

  emailExists(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      if (!control.value) {
        return of(null);
      }

     return timer(500).pipe(
      switchMap(() =>
        this.http.post<{ exists: boolean }>(
          'http://localhost:3000/api/user/check-userMailContactExits',
          {
            email: control.value
          }
        )
      ),
      map(response =>
        response.exists ? { emailExists: true } : null
      ),
      catchError(() => of(null))
    );
    };
  }
}
