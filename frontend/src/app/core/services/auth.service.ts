import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";




export class AuthSer{

  constructor(private http:HttpClient){}

  checkLogin(data:any){
    return this.http.post(`${environment.apiUrl}/user/login`,data);
  }

}
