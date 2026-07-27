import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { environment } from '../../../../environments/environment';


// Flip this to false to hit the real API again.
const USE_MOCK_DATA = false;

const MOCK_TEACHERS: Teacher[] = [
  {
    _id: 'mock-1',
    firstName: 'Anita',
    lastName: 'Rathod',
    email: 'anita.r@email.com',
    contactNumber: '+1234567890',
    aadharNo: '1234 2345 4567',
    photo: null,
    googleMeetLink: 'https://meet.google.com/abc-defg-hij',
    slots: [{ time: '12:30PM' }, { time: '02:00PM' }, { time: '03:15PM' }]
  },
  {
    _id: 'mock-2',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.s@email.com',
    contactNumber: '+1987654321',
    aadharNo: '9876 5432 1098',
    photo: null,
    googleMeetLink: 'https://meet.google.com/klm-nopq-rst',
    slots: [{ time: '09:00AM' }, { time: '11:00AM' }]
  },
  {
    _id: 'mock-3',
    firstName: 'Priya',
    lastName: 'Deshmukh',
    email: 'priya.d@email.com',
    contactNumber: '+1122334455',
    aadharNo: '1111 2222 3333',
    photo: null,
    googleMeetLink: '',
    slots: []
  }
];

@Component({
  selector: 'app-admin-teachers',
  imports: [
    CommonModule,
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

  drawerOpen = false;
  teacherBeingEdited: Teacher | null = null;

  constructor(private teacherService: TeacherService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Admin Teachers Component Loaded');
    this.loadTeachers();
  }

  loadTeachers(): void {
    if (USE_MOCK_DATA) {
      console.log('Using MOCK teacher data for local check');
      this.loading = true;
      // simulate a tiny network delay so loading state is visible too
      setTimeout(() => {
        this.teachers = MOCK_TEACHERS;
        this.loading = false;
        this.cdr.detectChanges();
      }, 300);
      return;
    }

    this.loading = true;
    this.teacherService.getTeachers().subscribe({
      next: (res) => {
        console.log('TEACHER API RESPONSE:', res);
        this.teachers = res.teachers; // unwrap { count, teachers }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load teachers:', err);
        this.loading = false;
      }
    });
  }

  onTeacherAdded(teacher: any): void {
    if (USE_MOCK_DATA) {
      console.log('Mock add (no backend call):', teacher);
      this.onDrawerClose();
      return;
    }

    this.teacherService.addTeacher(teacher).subscribe({
      next: (res) => {
        console.log(res.message); // "Teacher registered successfully. Email sent."
        this.loadTeachers(); // refresh the list instead of pushing a fake object
        this.onDrawerClose();
      },
      error: (err: any) => {
        console.error('Failed to add teacher:', err);
      }
    });
  }

  onDeleteTeacher(teacher: Teacher): void {
    if (!confirm(`Delete ${teacher.firstName} ${teacher.lastName}?`)) return;

    if (USE_MOCK_DATA) {
      this.teachers = this.teachers.filter(t => t._id !== teacher._id);
      this.cdr.detectChanges();
      return;
    }

    this.teacherService.deleteTeacher(teacher._id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(t => t._id !== teacher._id);
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Failed to delete teacher:', err)
    });
  }

  onEditTeacher(teacher: Teacher): void {
    this.teacherBeingEdited = teacher;
    this.drawerOpen = true;
    // NOTE: AddTeacherDialog doesn't yet accept a `teacher` input to prefill
    // its form. Paste that component's code and I'll wire prefill support in.
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

  openDrawer(): void {
    this.teacherBeingEdited = null;
    this.drawerOpen = true;
  }

  onDrawerClose(): void {
    this.drawerOpen = false;
    this.teacherBeingEdited = null;
  }

}