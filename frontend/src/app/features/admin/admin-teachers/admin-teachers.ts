import { CommonModule } from '@angular/common';
import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddTeacherDialog } from './add-teacher-dialog/add-teacher-dialog';
import { TeacherService, Teacher } from '../../../core/services/teacher.service';

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
export class AdminTeachers implements OnInit {

  searchTerm = '';
  teachers: Teacher[] = [];
  loading = false;
environment: any;

  constructor(private teacherService: TeacherService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
     console.log("Admin Teachers Component Loaded");
    this.loadTeachers();
  }

loadTeachers(): void {
  this.loading = true;
  this.teacherService.getTeachers().subscribe({
    next: (res) => {

      console.log("TEACHER API RESPONSE:", res);
      this.teachers = res.teachers;   // unwrap { count, teachers }
      this.loading = false;

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Failed to load teachers:', err);
      this.loading = false;
    }
  });
}

onTeacherAdded(teacher: any): void {
  this.teacherService.addTeacher(teacher).subscribe({
    next: (res) => {
      console.log(res.message); // "Teacher registered successfully. Email sent."
      this.loadTeachers();       // refresh the list instead of pushing a fake object
    },
    error: (err) => {
      console.error('Failed to add teacher:', err);
    }
  });
}

 get filteredTeachers(): Teacher[] {
  const term = this.searchTerm.trim().toLowerCase();
  if (!term) return this.teachers;
  return this.teachers.filter(
    t =>
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term)
  );
}

  get totalTeachers(): number {
    return this.teachers.length;
  }

  // onDeleteTeacher(teacher: Teacher): void {
  //   this.teacherService.deleteTeacher(teacher.id).subscribe({
  //     next: () => {
  //       this.teachers = this.teachers.filter(t => t.id !== teacher.id);
  //     },
  //     error: (err) => console.error('Failed to delete teacher:', err)
  //   });
  // }

  drawerOpen = false;

  openDrawer(): void {
    this.drawerOpen = true;
  }

  onDrawerClose(): void {
    this.drawerOpen = false;
  }

}