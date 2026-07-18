import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

interface UpcomingClass {
  subject: string;
  time: string;
}
 
interface Teacher {
  id: number;
  name: string;
  subjects: string;
  available: boolean;
  upcomingCount: number;
  upcomingClasses: UpcomingClass[];
  expanded: boolean;
}

@Component({
  selector: 'app-admin-upcoming-batches',
  imports: [CommonModule,FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDividerModule,],
  templateUrl: './admin-upcoming-batches.html',
  styleUrl: './admin-upcoming-batches.css',
})
export class AdminUpcomingBatches {
 searchTerm = '';
 
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Anita Rathod',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Business English', time: 'Mon, 10:00 AM' },
        { subject: 'Interview Preparation', time: 'Wed, 2:00 PM' }
      ]
    },
    {
      id: 2,
      name: 'Dinesh Deshmukh',
      subjects: 'Conversation Practice, Pronunciation, American Accent',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Conversation Practice', time: 'Tue, 11:00 AM' },
        { subject: 'Pronunciation', time: 'Thu, 4:00 PM' }
      ]
    },
    {
      id: 3,
      name: 'Chandani Kulkarni',
      subjects: 'Grammar, Beginner English, Conversation',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Grammar', time: 'Mon, 1:00 PM' },
        { subject: 'Beginner English', time: 'Fri, 9:00 AM' }
      ]
    },
    {
      id: 4,
      name: 'Anita Rathod',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Presentation Skills', time: 'Wed, 3:00 PM' },
        { subject: 'Business English', time: 'Fri, 10:00 AM' }
      ]
    },
    {
      id: 5,
      name: 'Kamlesh Patil',
      subjects: 'Conversation Practice, Grammar, Vocabulary Building',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Grammar', time: 'Tue, 9:00 AM' },
        { subject: 'Vocabulary Building', time: 'Thu, 11:00 AM' }
      ]
    },
    {
      id: 6,
      name: 'Suredh Patil',
      subjects: 'Conversation Practice, Grammar, Vocabulary Building',
      available: true,
      upcomingCount: 2,
      expanded: false,
      upcomingClasses: [
        { subject: 'Conversation Practice', time: 'Mon, 4:00 PM' },
        { subject: 'Grammar', time: 'Wed, 5:00 PM' }
      ]
    }
  ];
 
  get filteredTeachers(): Teacher[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.teachers;
    }
    return this.teachers.filter(
      t =>
        t.name.toLowerCase().includes(term) ||
        t.subjects.toLowerCase().includes(term)
    );
  }
 
  get totalTeachers(): number {
    return this.teachers.length;
  }
 
  toggleUpcoming(teacher: Teacher): void {
    teacher.expanded = !teacher.expanded;
  }
}