import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:5000/api/teacher';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<{ count: number; teachers: Teacher[] }> {
    return this.http.get<{ count: number; teachers: Teacher[] }>(
      `${this.baseUrl}/all`,
      { withCredentials: true }
    );
  }

 addTeacher(teacher: any): Observable<{ message: string }> {
  const formData = new FormData();
  formData.append('firstName', teacher.firstName);
  formData.append('lastName', teacher.lastName);
  formData.append('email', teacher.email);
  formData.append('contactNumber', teacher.contactNumber || '');
  formData.append('aadharNo', teacher.aadharNumber || '');
  formData.append('googleMeetLink', teacher.googlemeetLink || '');

  // Transform slots to match backend schema: { time: string }
  const transformedSlots = teacher.slots.map((s: any) => ({ time: s.startTime }));
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
}