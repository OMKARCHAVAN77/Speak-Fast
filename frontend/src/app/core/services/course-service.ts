import { Injectable, signal } from '@angular/core';
import { Plan } from '../../features/courses/course-recommendation/course-recommendation';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
    selectedPlan = signal<Plan | null>(null);

  setPlan(plan: Plan) {
    this.selectedPlan.set(plan);
  }

  getPlan() {
    return this.selectedPlan();
  }
}
