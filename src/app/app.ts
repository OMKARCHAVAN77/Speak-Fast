import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { StudentProcess } from './features/students/student-achievement/student-process/student-process';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';
<<<<<<< HEAD
import { Payment } from './features/payment/payment';
=======
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
import { filter } from 'rxjs';
>>>>>>> bf1a7b81a7869d9a128b5c30b576c235dc273af8
// import { Teachers } from './features/teachers/teachers';
// import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
// import { Questions } from './features/grammer/questions/questions';
// import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
// import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [Navbar,Footer,Payment],
=======
  imports: [RouterOutlet,Navbar,Footer,],
>>>>>>> bf1a7b81a7869d9a128b5c30b576c235dc273af8
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('frontend');



}
