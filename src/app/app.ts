import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer, GrammerAssignment, Questions, CoursesBookTrainer,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
