import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, output, signal } from '@angular/core';
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
import { AdminService } from '../../../core/services/admin.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { AlertService } from '../../../core/services/alert.service';
import Swal from 'sweetalert2';

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
    AddTeacherDialog,
    MatProgressBarModule
  ],
  templateUrl: './admin-teachers.html',
  styleUrl: './admin-teachers.css',
})
export class AdminTeachers implements OnInit {

  searchTerm = '';
  teachers: Teacher[] = [];
  loading = signal(false);

  drawerOpen = false;
  teacherBeingEdited: Teacher | null = null;

  shareTeacherCount = output<any>()


  constructor(
    private teacherService: TeacherService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.loading.set(true);


    this.adminService.getAllTeachers().subscribe({
      next: (res: any) => {
        console.log('TEACHER API RESPONSE:', res);

        this.teachers = (res.data || []).filter(
          (teacher: any) => teacher.userId !== null
        );

        console.log('FILTERED TEACHERS:', this.teachers);

        this.loading.set(false);
        this.cdr.detectChanges();

        // teacher cout
        this.shareTeacherCount.emit(res.total)
      },

      error: (err: any) => {
        console.error('Failed to load teachers:', err);
        this.loading.set(false);
      }
    });
  }

  onTeacherAdded(): void {
    this.loadTeachers();
    this.onDrawerClose();
  }

  onDeleteTeacher(teacher: Teacher): void {
    if (!confirm(`Delete ${teacher.userId.firstName} ${teacher.userId.lastName}?`)) {
      return;
    }

    this.teacherService.deleteTeacher(teacher._id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(t => t._id !== teacher._id);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to delete teacher:', err);
      }
    });
  }

  onEditTeacher(teacher: Teacher): void {
    this.teacherBeingEdited = teacher;
    this.drawerOpen = true;
  }

  get filteredTeachers(): Teacher[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.teachers;
    }

    return this.teachers.filter(
      t =>
        `${t.userId.firstName} ${t.userId.lastName}`.toLowerCase().includes(term) ||
        t.userId.email.toLowerCase().includes(term)
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

  // delete specific teacher
async deleteTeacher(id: string): Promise<void> {

  const scrollPosition = window.scrollY;

  const result = await this.alertService.confirm(
    'Are you sure?',
    'This action cannot be undone. Do you really want to delete Anita Rathod ?',
    'warning',
    'Yes, Delete',
    'Cancel'
  );

  if (!result.isConfirmed) {
    window.scrollTo(0, scrollPosition);
    return;
  }

  this.adminService.deleteSpecificTeacher(id).subscribe({

    next: () => {

      this.loadTeachers();

      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 0);

      this.alertService.toastSuccess(
        'Teacher deleted successfully.'
      );

    },

    error: (err: any) => {

      this.alertService.error(
        'Error!',
        err.error?.message || 'Something went wrong.'
      );

    }

  });

}

// async deleteTeacher(id: string, name: string): Promise<void> {

//   const scrollPosition = window.scrollY;

//   const result = await Swal.fire({
//     icon: undefined,
//     showClass: { popup: '' },
//     html: `
//       <p style="font-size:17px; color:#2b2b2b; line-height:1.5; margin:0;">
//         This action cannot be undone.<br/>
//         Do you really want to delete <b>${name}</b> ?
//       </p>
//     `,
//     showCancelButton: true,
//     confirmButtonText: 'Yes, Delete',
//     cancelButtonText: 'Cancel',
//     reverseButtons: false,
//     buttonsStyling: false,
//     customClass: {
//       popup: 'swal-custom-popup',
//       confirmButton: 'swal-btn-delete',
//       cancelButton: 'swal-btn-cancel',
//       actions: 'swal-btn-row'
//     }
//   });

//   if (!result.isConfirmed) {
//     window.scrollTo(0, scrollPosition);
//     return;
//   }

//   this.adminService.deleteSpecificTeacher(id).subscribe({

//     next: () => {

//       this.loadTeachers();

//       setTimeout(() => {
//         window.scrollTo(0, scrollPosition);
//       }, 0);

//       this.alertService.toastSuccess(
//         'Teacher deleted successfully.'
//       );

//     },

//     error: (err: any) => {

//       this.alertService.error(
//         'Error!',
//         err.error?.message || 'Something went wrong.'
//       );

//     }

//   });

// }

}   