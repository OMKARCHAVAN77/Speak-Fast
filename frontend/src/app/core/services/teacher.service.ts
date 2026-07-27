import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TeacherUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface Teacher {
  _id: string;
  userId: TeacherUser;
  contactNumber: string;
  aadharNo: string;
  specialization?: string;
  qualification?: string;
  experience?: string;
  bio?: string;
  photo: string | null;
  googleMeetLink: string;
  slots: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private baseUrl = `${environment.apiUrl}/teacher`;

  constructor(private http: HttpClient) {}

  // Get All Teachers
  getTeachers(): Observable<{ success: boolean; message: string; total: number; data: Teacher[] }> {
    return this.http.get<{ success: boolean; message: string; total: number; data: Teacher[] }>(
      `${this.baseUrl}/all`,
      { withCredentials: true }
    );
  }

  // Register Teacher
  addTeacher(teacher: any): Observable<{ success: boolean; message: string; data?: { user: any; teacher: Teacher } }> {
    const formData = new FormData();

    formData.append('firstName', teacher.firstName);
    formData.append('lastName', teacher.lastName);
    formData.append('email', teacher.email);
    formData.append('contactNumber', teacher.contactNumber || '');
    formData.append('aadharNo', teacher.aadharNo || teacher.aadharNumber || '');
    formData.append('googleMeetLink', teacher.googleMeetLink || '');

    const transformedSlots = teacher.slots.map((s: any) => ({
      time: s.startTime
    }));

    formData.append('slots', JSON.stringify(transformedSlots));

    if (teacher.photo) {
      formData.append('photo', teacher.photo);
    }

    return this.http.post<{ success: boolean; message: string; data?: { user: any; teacher: Teacher } }>(
      `${this.baseUrl}/register`,
      formData,
      { withCredentials: true }
    );
  }

  // Filter Teachers
  filterTeacherApi(date: string, time?: string): Observable<any> {
    let params = new HttpParams().set('date', date);

    if (time) {
      params = params.set('time', time);
    }

    return this.http.get<any>(
      `${this.baseUrl}/filter`,
      { params, withCredentials: true }
    );
  }

  // Delete Teacher
  deleteTeacher(_id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.baseUrl}/${_id}`,
      { withCredentials: true }
    );
  }
}