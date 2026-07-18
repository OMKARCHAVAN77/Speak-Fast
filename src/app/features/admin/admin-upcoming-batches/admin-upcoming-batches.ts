import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Teacher {
  name: string;
  subjects: string;
  classes: number;
  status: 'Available' | 'Unavailable';
}

@Component({
  selector: 'app-admin-upcoming-batches',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './admin-upcoming-batches.html',
  styleUrl: './admin-upcoming-batches.css',
})
export class AdminUpcomingBatches {
  teachers: Teacher[] = [
    {
      name: 'Anita Rathod',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      classes: 2,
      status: 'Available',
    },
    {
      name: 'Dinesh Deshmukh',
      subjects: 'Conversation Practice, Pronunciation, American Accent',
      classes: 2,
      status: 'Available',
    },
    {
      name: 'Chandani Kulkarni',
      subjects: 'Grammar, Beginner English, Conversation',
      classes: 2,
      status: 'Available',
    },
    {
      name: 'Anita Rathod',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      classes: 2,
      status: 'Available',
    },
    {
      name: 'Kamlesh Patil',
      subjects: 'Conversation Practice, Grammar, Vocabulary Building',
      classes: 2,
      status: 'Available',
    },
    {
      name: 'Suredh Patil',
      subjects: 'Conversation Practice, Grammar, Vocabulary Building',
      classes: 2,
      status: 'Available',
    },
  ];

  searchTerm = '';

  /** Which teacher rows currently have their "Upcoming Classes" panel open */
  expanded = new Set<number>();

  get filteredTeachers(): Teacher[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) {
      return this.teachers;
    }
    return this.teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.subjects.toLowerCase().includes(q)
    );
  }

  get totalCount(): number {
    return this.teachers.length;
  }

  toggleExpanded(index: number): void {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      this.expanded.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expanded.has(index);
  }
}