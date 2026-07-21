import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ProgressItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-student-my-clasess',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule],
  templateUrl: './student-my-clasess.html',
  styleUrl: './student-my-clasess.css',
})
export class StudentMyClasess {
   progressItems: ProgressItem[] = [
    { label: 'Basic', value: 32 },
    { label: 'Advance', value: 0 },
    { label: 'Practice', value: 0 },
  ];

}



