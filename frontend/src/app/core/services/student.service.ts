import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

     teacherId = new BehaviorSubject<String|null>(null);
     soltId = new BehaviorSubject<String|null>(null);
     courseName = new BehaviorSubject<String|null>(null);
     coursePrice = new BehaviorSubject<String|null>(null);
     emailId = new BehaviorSubject<string>(  sessionStorage.getItem('forgotPassEmail') ?? '');

    constructor(private http:HttpClient){}

    setTeacherId(data: String){
       this.teacherId.next(data);
    }

    getTeacherId():String|null{
      return this.teacherId.getValue();
    }

    setSlotId(data: String){
       this.soltId.next(data);
    }

    getSlotId():String|null{
      return this.soltId.getValue();
    }

    setCourseName(data: String){
       this.courseName.next(data);
    }

    getCourseName():String|null{
      return this.courseName.getValue();
    }

    setCoursePrice(data: String){
       this.coursePrice.next(data);
    }

    getCoursePrice():String|null{
      return this.coursePrice.getValue();
    }

    addStudentApi(data:any){
      return  this.http.post(`${environment.apiUrl}/booking/register-book`,data);
    }

    getEmailForgotPass(): string  {
      return this.emailId.getValue();
    }

    setEmailForgotPass(data : string){
      sessionStorage.setItem('forgotPassEmail',data);
      this.emailId.next(data)
    }

    // student forgot password service
    private baseUrl = `${environment.apiUrl}/auth`;

    forgotStudentPassword(body: { email: string }) {
        return this.http.post(`${this.baseUrl}/forgot-password`, body);
    }

    resetStudentPassword(
        token: string,
        body: {
            password: string;
            confirmPassword: string;
        }
    ) {
        return this.http.post(
            `${this.baseUrl}/reset-password/${token}`,
            body
        );
    }
}
