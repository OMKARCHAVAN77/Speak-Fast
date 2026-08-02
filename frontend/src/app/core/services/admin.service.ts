import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Teacher } from "./teacher.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  // ===================== Students =====================
  getAllStudentsOnAdminDashboard(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/student`);
  }

  // ===================== Teachers =====================
  getAllTeachers(): Observable<any> {
    // const token = localStorage.getItem('token');

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });

    return this.http.get(
      `${environment.apiUrl}/teacher/getAllTeachers`,

    );
  }

  // ===================== Register Teacher =====================
  addTeacher(
    teacher: any
  ): Observable<{
    success: boolean;
    message: string;
    data?: { user: any; teacher: Teacher };
  }> {

    const formData = new FormData();

    formData.append('firstName', teacher.firstName || '');
    formData.append('lastName', teacher.lastName || '');
    formData.append('email', teacher.email || '');
    formData.append('password', teacher.password || '');
    formData.append('role', 'teacher');

    formData.append('contactNumber', teacher.contactNumber || '');
    formData.append('aadharNo', teacher.aadharNo || teacher.aadharNumber || '');


    formData.append('googleMeetLink', teacher.googleMeetLink || '');

    const transformedSlots = (teacher.slots || []).map((s: any) => ({
      date: s.date,
      time: s.startTime || s.time
    }));

    formData.append('slots', JSON.stringify(transformedSlots));

    if (teacher.photo) {
      formData.append('photo', teacher.photo);
    }

    return this.http.post<{
      success: boolean;
      message: string;
      data?: { user: any; teacher: Teacher };
    }>(
      `${environment.apiUrl}/teacher/register`,
      // 'http://localhost:3000/api/teacher/register',
      formData,
      { withCredentials: true }
    );
  }

  updateTeacher(id: string, data: any): Observable<any> {
  return this.http.put(`${environment.apiUrl}/admin/teachers/${id}`, data);
}


  // ====================== Delete specific Teacher ============================
  deleteSpecificTeacher( id: any){
  return this.http.delete(`${environment.apiUrl}/teacher/${id}`)
  }


  // ===============================delete specific student ========================
  deleteSpecificStudent(id : any){
    return this.http.delete(`${environment.apiUrl}/student/${id}`)
  }

}
