import { Injectable, signal } from '@angular/core';
import { Course } from '../../features/courses/course-recommendation/course-recommendation';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
      selectedCourse = signal<Course | null>(null);

  setCourse(course: Course) {
    this.selectedCourse.set(course);
  }

  getCourse() {
    return this.selectedCourse();
  }
}
