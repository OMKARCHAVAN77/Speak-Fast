import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of, switchMap, timer } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class contactNumberExists{

  constructor(private http: HttpClient){}

  contactNumberExists(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors|null>=>{

      if(!control.value)
          return of(null);

      return timer(500).pipe(
        switchMap(() =>
          this.http.post<{
            success: boolean;
            data: {
              emailExists: boolean;
              contactNumberExists: boolean;
            };
          }>(
            `${environment.apiUrl}/user/check-userMailContactExits`,
            {
              contactNumber: control.value
            }
          )
        ),
        map(response =>
          response.data.contactNumberExists ? { contactNumberExists: true } : null
        ),
        catchError(() => of(null))
      );


    }
  }

}


