import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddTeacherDialog } from './add-teacher-dialog/add-teacher-dialog';




interface LeaveInfo {
  status: 'none' | 'requested' | 'onLeave';
  range?: string; // e.g. "30 Sep - 1 Aug"
}
 
interface Teacher {
  id: number;
  name: string;
  subjects: string;
  leave: LeaveInfo;
}

@Component({
  selector: 'app-admin-teachers',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    AddTeacherDialog  
  ],
  templateUrl: './admin-teachers.html',
  styleUrl: './admin-teachers.css',
})
export class AdminTeachers {
  
  searchTerm = '';
 
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Suroj Kumbar',
      subjects: 'Grammar, Business English, IELTS Preparation',
      leave: { status: 'requested' }
    },
    {
      id: 2,
      name: 'Kamlesh Patil',
      subjects: 'Grammar, Business English, IELTS Preparation',
      leave: { status: 'onLeave', range: '30 Sep - 1 Aug' }
    },
    {
      id: 3,
      name: 'Anita Rathod',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      leave: { status: 'requested' }
    },
    {
      id: 4,
      name: 'Sunil Devkate',
      subjects: 'TOEFL, Academic English, Writing Skills',
      leave: { status: 'onLeave', range: '1 Aug - 3 Aug' }
    },
    {
      id: 5,
      name: 'Nihal Thakur',
      subjects: 'Grammar, Beginner English, Conversation',
      leave: { status: 'none' }
    },
    {
      id: 6,
      name: 'Suraj Shetty',
      subjects: 'Business English, Interview Preparation, Presentation Skills',
      leave: { status: 'none' }
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
 
  onAcceptLeave(teacher: Teacher): void {
    teacher.leave = { status: 'onLeave', range: 'Leave approved' };
  }
 
  onCancelLeave(teacher: Teacher): void {
    teacher.leave = { status: 'none' };
  }
 
  onViewDetails(teacher: Teacher): void {
    console.log('View details for', teacher.name);
  }
 
  onDeleteTeacher(teacher: Teacher): void {
    this.teachers = this.teachers.filter(t => t.id !== teacher.id);
  }
 
  drawerOpen = false;

  openDrawer(): void {
    this.drawerOpen = true;
  }

  onDrawerClose(): void {
    this.drawerOpen = false;
  }

  onTeacherAdded(teacher: any): void {
    console.log('New teacher:', teacher);
    // call your API service here
  }
}