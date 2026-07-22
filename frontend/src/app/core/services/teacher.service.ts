import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {}

  filterTeacherApi(date: string, time: string) {

    const params = new HttpParams()
      .set('date', date)
      .set('time', time);

    return this.http.get(
      'http://localhost:5000/api/teacher/filter',
      { params }
    );
  }

}