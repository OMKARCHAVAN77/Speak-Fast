import { TokenService } from './../../core/services/token.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { TeacherService } from '../../core/services/teacher.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../core/services/student.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Slot {
  _id: string;
  date: string;
  time: string;
  isBooked: boolean;
}

interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  photo: null;
  role: string;
  slots: Slot[];
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class Teachers implements OnInit {
  loading = signal(false);

  // Today's date
  selectedDate: Date = new Date();

  selectedTeacherId: string | null = null;
  selectedSlotId: string | null = null;
  errorTeacherId: string | null = null;

  // Disable previous dates
  minDate: Date = new Date();
  selectedTime: string | null = null;
  isDatePickerOpen = false;
  isTimeMenuOpen = false;
  formattedDate: any;
  teachers: Teacher[] = [];
  showTeachers = false;

  // ---------- PAGINATION ----------
  currentPage = 1;
  pageSize = 16;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.teachers.length / this.pageSize));
  }

  get paginatedTeachers(): Teacher[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.teachers.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  ngOnInit(): void {
    // Set today's date
    this.selectedDate = new Date();

    // Disable all previous dates
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    // API format
    this.formattedDate = this.formatDate(this.selectedDate);
    this.loadTeachers();
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  constructor(
    private teacherService: TeacherService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private studServ: StudentService
  ) {}

  loadTeachers(): void {
    if (!this.formattedDate) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    console.log('Calling API...');
    console.log(this.formattedDate);
    console.log(this.selectedTime);

    this.teacherService
      .filterTeacherApi(this.formattedDate, this.selectedTime || undefined)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);

          const teachers = res?.data || [];

          this.teachers = teachers.map((teacher: any) => ({
            ...teacher,
            firstName: teacher.firstName ?? '',
            lastName: teacher.lastName ?? '',
            email: teacher.email ?? '',
            slots: teacher.slots ?? []
          }));

          this.showTeachers = this.teachers.length > 0;
          this.currentPage = 1; // नवीन results आले की page 1 वर रीसेट
          this.loading.set(false);
          this.cdr.detectChanges();

          console.log('Filtered Teachers:', this.teachers);
        },

        error: (err) => {
          this.loading.set(false);
          this.teachers = [];
          this.showTeachers = false;

          console.error('Failed to load teachers:', err.error?.message || err.message);
        }
      });
  }

  timeSlots: string[] = [
    '07:00AM', '08:00AM', '09:00AM', '10:00AM',
    '11:00AM', '12:00PM', '01:00PM', '02:00PM',
    '03:00PM', '04:00PM', '05:00PM', '06:00PM',
    '07:00PM', '08:00PM', '09:00PM', '10:00PM'
  ];

  onDateChange(event: any): void {
    if (!event.value) {
      return;
    }

    this.selectedDate = event.value;
    this.formattedDate = this.formatDate(this.selectedDate);

    console.log('Selected Date :', this.formattedDate);

    this.loadTeachers();
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
    console.log(this.selectedTime);
    this.loadTeachers();
  }

  selectSlot(teacherId: string, slotId: string): void {
    if (this.selectedTeacherId === teacherId && this.selectedSlotId === slotId) {
      this.selectedTeacherId = null;
      this.selectedSlotId = null;
    } else {
      this.selectedTeacherId = teacherId;
      this.selectedSlotId = slotId;
    }
    console.log('Teacher :', this.selectedTeacherId);
    console.log('Slot :', this.selectedSlotId);
  }

  selectTeacher(id: string): void {
    if (this.selectedTeacherId !== id) {
      this.selectedSlotId = null;
    }
    this.selectedTeacherId = id;
  }

  // Book Seat क्लिक झाल्यावर — स्लॉट select नसेल तर hint red flash करतो
  onBookSeatClick(teacherId: string): void {
    const slotChosen = this.selectedTeacherId === teacherId && this.selectedSlotId;

    if (!slotChosen) {
      this.errorTeacherId = teacherId;
      setTimeout(() => {
        if (this.errorTeacherId === teacherId) {
          this.errorTeacherId = null;
        }
      }, 2000);
      return;
    }

    this.bookSeat();
  }

  bookSeat() {
    if (!this.selectedTeacherId || !this.selectedSlotId) {
      alert('Please select a slot');
      return;
    }

    console.log('Teacher Id :', typeof this.selectedTeacherId);
    console.log('Slot Id :', this.selectedSlotId);

    this.studServ.setTeacherId(this.selectedTeacherId);
    this.studServ.setSlotId(this.selectedSlotId);

    this.router.navigate(['/courses']);
  }

  // reset filter
  resetFilters(): void {
    this.selectedDate = new Date();
    this.selectedTime = null;
    this.isDatePickerOpen = false;
    this.isTimeMenuOpen = false;
    this.formattedDate = this.formatDate(this.selectedDate);

    // If you emit changes elsewhere (e.g. on dateChange/selectTime), fire that here too
    // this.onFiltersReset?.emit();
    this.loadTeachers();
  }
}