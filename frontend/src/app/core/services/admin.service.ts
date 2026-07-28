import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Teacher } from "./teacher.service";

@Injectable({
    providedIn: 'root'
})
export class AdminService{

    constructor(private http: HttpClient){}

    getAllStudentsOnAdminDashboard(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/student`)
    }
    
     // Register Teacher
  addTeacher(teacher: any): Observable<{ success: boolean; message: string; data?: { user: any; teacher: Teacher } }> {
  const formData = new FormData();

  formData.append('firstName', teacher.firstName || '');
  formData.append('lastName', teacher.lastName || '');
  formData.append('email', teacher.email || '');
  formData.append('password', teacher.password || '');
  formData.append('role', 'teacher');

  formData.append('contactNumber', teacher.contactNumber || '');
  formData.append('aadharNo', teacher.aadharNo || teacher.aadharNumber || '');

  formData.append('specialization', teacher.specialization || '');
  formData.append('experience', String(teacher.experience || ''));
  formData.append('qualification', teacher.qualification || '');
  formData.append('bio', teacher.bio || '');

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
    'http://localhost:3000/api/teacher/register',
    formData,
    { withCredentials: true }
  );
}

} 