import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";

@Injectable({
    providedIn:'root'
})
export class StudentService{

    constructor(private http:HttpClient){}


    addStudentApi(data:any){
      return  this.http.post(`http://localhost:5000/api/students/register`,data)
    }

    forgotStudentPassword(mail : any){
        return this.http.post(`${environment.apiUrl}/students/forgot-password`, mail)
    }
}
