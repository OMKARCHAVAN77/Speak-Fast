import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) { }

    
    addStudentApi(data: any) {
        return this.http.post(`http://localhost:5000/api/students/register`, data)
    }

    // student forgot password service 
    private baseUrl = "https://speak-fast.onrender.com/api/auth";
    
    forgotStudentPassword(body: { email: string }) {
        return this.http.post(`${this.baseUrl}/forgot-password`, body);
    }
}
