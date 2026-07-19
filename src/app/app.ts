import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { StudentProcess } from './features/students/student-achievement/student-process/student-process';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
<<<<<<< HEAD
=======
import { filter } from 'rxjs';
>>>>>>> f48539379e6637734ea08ab149b59851f76a9045
// import { Teachers } from './features/teachers/teachers';
// import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
// import { Questions } from './features/grammer/questions/questions';
// import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
// import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('frontend');



}
