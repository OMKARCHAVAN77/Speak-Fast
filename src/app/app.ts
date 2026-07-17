import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { StudentProcess } from './features/students/student-achievement/student-process/student-process';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';
import { Payment } from './features/payment/payment';
// import { Teachers } from './features/teachers/teachers';
// import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
// import { Questions } from './features/grammer/questions/questions';
// import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
// import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
  imports: [Navbar,Footer,Payment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}