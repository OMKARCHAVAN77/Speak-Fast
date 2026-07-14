import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { Teachers } from './features/teachers/teachers';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { Home } from './features/dashboard/home/home';
import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,Teachers,GrammerAssignment,Questions,Home,CoursesBookTrainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
