import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

export interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  aadharNo: string;
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
  getTeachers(): Observable<{ count: number; teachers: Teacher[] }> {
    return this.http.get<{ count: number; teachers: Teacher[] }>(
      `${this.baseUrl}/all`,
      { withCredentials: true }
    );
  }

  // Register Teacher
  addTeacher(teacher: any): Observable<{ message: string }> {

    const formData = new FormData();

    formData.append('firstName', teacher.firstName);
    formData.append('lastName', teacher.lastName);
    formData.append('email', teacher.email);
    formData.append('contactNumber', teacher.contactNumber || '');
    formData.append('aadharNo', teacher.aadharNo || '');
    formData.append('googleMeetLink', teacher.googleMeetLink || '');

    const transformedSlots = teacher.slots.map((s: any) => ({
      time: s.startTime
    }));

    formData.append('slots', JSON.stringify(transformedSlots));

    if (teacher.photo) {
      formData.append('photo', teacher.photo);
    }

    return this.http.post<{ message: string }>(
      `${this.baseUrl}/register`,
      formData,
      { withCredentials: true }
    );
  }

  // Filter Teachers
  filterTeacherApi(date: string, time: string): Observable<any> {

    const params = new HttpParams()
      .set('date', date)
      .set('time', time);

    return this.http.get<any>(
      `${this.baseUrl}/filter`,
      { params }
    );
  }

}