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
import { ViewChild, ElementRef } from '@angular/core';
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

  // pagination
  pageSize = 10;
  currentPage = signal(1);

  @ViewChild('firstNameInput') firstNameInput!: ElementRef;

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

  // pagination getters
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredTeachers.length / this.pageSize));
  }

  get paginatedTeachers(): Teacher[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredTeachers.slice(start, start + this.pageSize);
  }

  get pageNumbers(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1, 2, 3);

    if (current > 4 && current < total - 2) {
      pages.push('...', current);
    } else {
      pages.push('...');
    }

    pages.push(total - 1, total);

    return pages;
  }

  goToPage(page: number | string): void {
    if (typeof page !== 'number') return;
    if (page < 1 || page > this.totalPages) return;
    this.currentPage.set(page);
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.set(this.currentPage() - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages) this.currentPage.set(this.currentPage() + 1);
  }

  onSearchChange(): void {
    this.currentPage.set(1);
  }

  openDrawer(): void {
    this.teacherBeingEdited = null;
    this.drawerOpen = true;

     setTimeout(() => {
    this.firstNameInput?.nativeElement.focus();
  }, 200);
  }

  onDrawerClose(): void {
    this.drawerOpen = false;
    this.teacherBeingEdited = null;
  }

  // delete specific teacher
async deleteTeacher(teacher: any): Promise<void> {

  const scrollPosition = window.scrollY;

  const teacherName =
    `${teacher.userId?.firstName || ''} ${teacher.userId?.lastName || ''}`.trim();

  const result = await this.alertService.confirm(
    'Are you sure?',
    `
      This action cannot be undone.<br>
      Do you really want to delete<br>
      <strong>${teacherName}</strong> ?
    `,
    'warning',
    'Yes, Delete',
    'Cancel'
  );

  if (!result.isConfirmed) {
    window.scrollTo(0, scrollPosition);
    return;
  }

  this.adminService.deleteSpecificTeacher(teacher._id).subscribe({

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


}