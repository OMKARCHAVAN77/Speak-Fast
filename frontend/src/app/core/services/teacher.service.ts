import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class TeacherService{

    constructor(private http:HttpClient){}


    filterTeacherApi(data:any){
      return  this.http.get(`http://localhost:5000/api/teacher/filter?date=${data.date}&time=${data.time}`);
    }

    getAllTeachersApi(){
      return  this.http.get('http://localhost:5000/api/teacher/all');
    }
}
