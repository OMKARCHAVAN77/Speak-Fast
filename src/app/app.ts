import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { Teachers } from './features/teachers/teachers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,Teachers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
