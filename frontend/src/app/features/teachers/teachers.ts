import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { TeacherService } from '../../core/services/teacher.service';
import { ChangeDetectorRef } from '@angular/core';

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
  photo:null;
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
    MatMenuModule
  ],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class Teachers implements OnInit {
  // Matches the design: 05 January 2026
  selectedDate: Date = new Date(2026, 0, 5);
  selectedTime: string | null = null;
  isDatePickerOpen = false;
  isTimeMenuOpen = false;
  formattedDate:any;
   teachers: Teacher[] =[];
 ngOnInit(): void {

  this.formattedDate = this.formatDate(this.selectedDate);
  this.loadTeachers();

}
formatDate(date: Date): string {

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

}

constructor(private teacherService: TeacherService, private cdr: ChangeDetectorRef) {}  
loadTeachers(): void {

  if (!this.formattedDate || !this.selectedTime) {
    return;
  }

  console.log('Calling API...');
  console.log(this.formattedDate);
  console.log(this.selectedTime);

  this.teacherService
  .filterTeacherApi(this.formattedDate, this.selectedTime)
  .subscribe({
    next: (res: any) => {
  console.log("API Response:", res);

  this.teachers = [...res.teachers];

  this.cdr.detectChanges();

  console.log(this.teachers);
},
    error: (err) => {
      console.error(err);
    }
  });

}


  timeSlots: string[] = [
    '09:00AM', '10:00AM', '11:00AM','02:45am',
    '01:00PM', '02:00PM', '3:00pm','4:15am','03:30am','01:30am',
    '04:00PM', '05:00PM','12:45pm', '06:00PM', '07:00PM', '08:00PM'
  ];

 onDateChange(event: any): void {

  if (!event.value) return;

  this.selectedDate = event.value;

  this.formattedDate = this.formatDate(this.selectedDate);

  console.log(this.formattedDate);

  // this.loadTeachers();

}

  selectTime(slot: string): void {

  this.selectedTime = slot;

  console.log(this.selectedTime);

  this.loadTeachers();

}

  // ---------- ALL TEACHERS ----------
  selectedTeacherId: string | null = 'sakshi-pable';



 

  selectTeacher(id: string): void {
    this.selectedTeacherId = id;
    
  }

bookSeat(id: string): void {

  const teacher = this.teachers.find(t => t._id === id);

  if (!teacher) {
    return;
  }

  console.log(
    teacher.firstName,
    teacher.lastName,
    this.selectedDate,
    this.selectedTime
  );
}
}
