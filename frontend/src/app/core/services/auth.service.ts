import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from "@angular/common/http";



@Injectable()
export class AuthSer{

  constructor(private http:HttpClient){}

  checkLogin(data:any){
    return this.http.post(`${environment.apiUrl}/user/login`,data);
  }

}
