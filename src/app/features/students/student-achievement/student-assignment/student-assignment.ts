import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

type AssignmentStatus = 'Reviewed' | 'Pending' | 'Overdue';

interface Assignment {
  id: number;
  title: string;
  status: AssignmentStatus;
  studentName: string;
  dueDate: string;
  daysLeft: number;
  progress: number;
  feedback?: {
  comment: string;
  grade: string;
  };
}

@Component({
  selector: 'app-student-assignment',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  templateUrl: './student-assignment.html',
  styleUrl: './student-assignment.css',
})
export class StudentAssignment {
  searchTerm = signal('');
  filterValue = signal('all');

  filterOptions = [
    { value: 'all', label: 'All Assignment' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
  ];

  assignments = signal<Assignment[]>([
    {
      id: 1,
      title: 'My Daily Routine',
      status: 'Reviewed',
      studentName: 'Neha Joshi',
      dueDate: 'March 11, 2026',
      daysLeft: 4,
      progress: 85,
      feedback: {
        comment: 'Good work! Nice use of present tense. Work on punctuation.',
        grade: '85/100',
      },
    },
    {
      id: 2,
      title: 'Grammar Exercise - Past Tense',
      status: 'Pending',
      studentName: 'Amit Deshmukh',
      dueDate: 'March 10, 2026',
      daysLeft: 4,
      progress: 65,
    },
    {
      id: 3,
      title: 'Grammar Exercise - Past Tense',
      status: 'Overdue',
      studentName: 'Amit Deshmukh',
      dueDate: 'March 04, 2026',
      daysLeft: 4,
      progress: 100,
    },
  ]);

  filteredAssignments = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filter = this.filterValue();

    return this.assignments().filter((a) => {
      const matchesSearch = !term || a.studentName.toLowerCase().includes(term);
      const matchesFilter = filter === 'all' || a.status.toLowerCase() === filter;
      return matchesSearch && matchesFilter;
    });
  });

  statusClass(status: AssignmentStatus): string {
    switch (status) {
      case 'Reviewed':
        return 'status-reviewed';
      case 'Pending':
        return 'status-pending';
      case 'Overdue':
        return 'status-overdue';
      default:
        return '';
    }
  }

  progressClass(status: AssignmentStatus): string {
    switch (status) {
      case 'Reviewed':
        return 'progress-reviewed';
      case 'Pending':
        return 'progress-pending';
      case 'Overdue':
        return 'progress-overdue';
      default:
        return '';
    }
  }

  onSubmit(assignment: Assignment): void {
    console.log('Submit clicked for', assignment.title, assignment.studentName);
  }
}