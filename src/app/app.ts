import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GrammerAssignment,Questions,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
