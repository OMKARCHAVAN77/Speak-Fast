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
name: string;
  _id: string;
  userId: TeacherUser;
  contactNumber: string;
  aadharNo: string;

  photo: string | null;
  googleMeetLink: string;
  slots: any[];
}

export interface BookedSlot {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  addTeacher(teacher: { firstName: string; lastName: string; contactNumber: string; aadharNo: string; email: string; googleMeetLink: string; photo: File | null; startTime: string; slots: BookedSlot[]; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = `${environment.apiUrl}/teacher`;

  constructor(private http: HttpClient) {}

  // Get All Teachers
  getTeachers(): Observable<{ success: boolean; message: string; total: number; data: Teacher[] }> {
    return this.http.get<{ success: boolean; message: string; total: number; data: Teacher[] }>(
      `${this.baseUrl}/all`,
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
      // 'http://localhost:3000/api/teacher/filter',
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
