import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class StudentService{

    constructor(private http:HttpClient){}


    addStudentApi(data:any){
      return  this.http.post('http://${environment.apiUrl}/api/students/register',data)
    }

    forgotStudentPassword(mail : any){
        return this.http.post('http://${environment.apiUrl}/api/students/forgot-password', mail)
    }
}