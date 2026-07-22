import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { TeacherService } from '../../core/services/teacher.service';

interface Teacher {
  id: string;
  name: string;
  photo: string;
  slots: string[];
}

@Component({
  selector: 'app-teacher-hero',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class Teachers {
  // Matches the design: 05 January 2026
  selectedDate: Date = new Date(2026, 0, 5);
  selectedTime: string | null = null;
  isDatePickerOpen = false;
  isTimeMenuOpen = false;

constructor(private teacherService: TeacherService) {}  

  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  onDateChange(event: any): void {
    if (event?.value) {

      this.selectedDate = event.value;
        const formattedDate = `${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth() + 1).padStart(2, '0')}-${String(this.selectedDate.getDate()).padStart(2, '0')}`;
      console.log('Selected date:', formattedDate);
    }
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
    console.log('Selected time:', this.selectedTime);
  }

  // ---------- ALL TEACHERS ----------
  selectedTeacherId: string | null = 'sakshi-pable';

  ngOnInit() {
    this.teacherService.getAllTeachersApi().subscribe((teachers: any) => {
      this.teachers = teachers;
    });
  }

  teachers: Teacher[] = [
    {
      id: 'anita-rathod',
      name: 'Anita Rathod',
      photo: 'assets/teachers/anita-rathod.jpg',
      slots: ['07:00am', '07:00am', '07:00am', '07:00am', '07:00am', '07:00am']
    },
    {
      id: 'sakshi-pable',
      name: 'Sakshi Pable',
      photo: 'assets/teachers/sakshi-pable.jpg',
      slots: ['07:00am', '07:00am', '07:00am', '07:00am', '07:00am', '07:00am']
    },
    {
      id: 'ansh-agarwal',
      name: 'Ansh Agarwal',
      photo: 'assets/teachers/ansh-agarwal.jpg',
      slots: ['07:00am', '07:00am', '07:00am', '07:00am', '07:00am', '07:00am']
    }
  ];

  selectTeacher(id: string): void {
    this.selectedTeacherId = id;
  }

  bookSeat(id: string): void {
    const teacher = this.teachers.find(t => t.id === id);
    if (!teacher) {
      return;
    }
    // Hook this up to your booking flow/service.
    // e.g. this.bookingService.book(teacher.id, this.selectedDate, this.selectedTime)
    console.log('Booking seat with', teacher.name, this.selectedDate, this.selectedTime);
  }
}