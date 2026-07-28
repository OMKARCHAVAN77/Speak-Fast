import { Component, OnInit } from '@angular/core';
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
// Today's date
selectedDate: Date = new Date();

// Disable previous dates
minDate: Date = new Date();
  selectedTime: string | null = null;
  isDatePickerOpen = false;
  isTimeMenuOpen = false;
  formattedDate:any;
   teachers: Teacher[] =[];
   showTeachers = false;
   

   
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

constructor(private teacherService: TeacherService, private cdr: ChangeDetectorRef,
   private router: Router,
  private studServ:StudentService) {}  
loadTeachers(): void {

  if (!this.formattedDate) {
    return;
  }

  console.log('Calling API...');
  console.log(this.formattedDate);
  console.log(this.selectedTime);

  this.teacherService
    .filterTeacherApi(
      this.formattedDate,
      this.selectedTime || undefined
    )
    .subscribe({

      next: (res: any) => {

        console.log("API Response:", res);

        const teachers = res?.data || [];

        this.teachers = teachers.map((teacher:any)=>({

  ...teacher,

  firstName: teacher.firstName ?? "",
  lastName: teacher.lastName ?? "",
  email: teacher.email ?? "",

  slots: teacher.slots ?? []

}));

        this.showTeachers = this.teachers.length > 0;

        this.cdr.detectChanges();

        console.log("Filtered Teachers:", this.teachers);
      },

      error: (err) => {

        this.teachers = [];
        this.showTeachers = false;

        console.error(
          "Failed to load teachers:",
          err.error?.message || err.message
        );
      }

    });

}


  timeSlots: string[] = [
    
  '12:00am', '12:15am', '12:30am', '12:45am',
  '01:00am', '01:15am', '01:30am', '01:45am',
  '02:00am', '02:15am', '02:30am', '02:45am',
  '03:00am', '03:15am', '03:30am', '03:45am',
  '04:00am', '04:15am', '04:30am', '04:45am',
  '05:00am', '05:15am', '05:30am', '05:45am',
  '06:00am', '06:15am', '06:30am', '06:45am',
  '07:00am', '07:15am', '07:30am', '07:45am',
  '08:00am', '08:15am', '08:30am', '08:45am',
  '09:00am', '09:15am', '09:30am', '09:45am',
  '10:00am', '10:15am', '10:30am', '10:45am',
  '11:00am', '11:15am', '11:30am', '11:45am',
  '12:00pm', '12:15pm', '12:30pm', '12:45pm',
  '01:00pm', '01:15pm', '01:30pm', '01:45pm',
  '02:00pm', '02:15pm', '02:30pm', '02:45pm',
  '03:00pm', '03:15pm', '03:30pm', '03:45pm',
  '04:00pm', '04:15pm', '04:30pm', '04:45pm',
  '05:00pm', '05:15pm', '05:30pm', '05:45pm',
  '06:00pm', '06:15pm', '06:30pm', '06:45pm',
  '07:00pm', '07:15pm', '07:30pm', '07:45pm',
  '08:00pm', '08:15pm', '08:30pm', '08:45pm',
  '09:00pm', '09:15pm', '09:30pm', '09:45pm',
  '10:00pm', '10:15pm', '10:30pm', '10:45pm',
  '11:00pm', '11:15pm', '11:30pm', '11:45pm'
];
 

onDateChange(event: any): void {

  if (!event.value) {
    return;
  }

  this.selectedDate = event.value;

  // yyyy-MM-dd
  this.formattedDate = this.formatDate(this.selectedDate);

  console.log("Selected Date :", this.formattedDate);

 this.loadTeachers();
}

  selectTime(slot: string): void {

  this.selectedTime = slot;

  console.log(this.selectedTime);

  this.loadTeachers();

}

  // ---------- ALL TEACHERS ----------
  // selectedTeacherId: string | null = 'sakshi-pable';
  selectedTeacherId: string | null = null;
selectedSlotId: string | null = null;

selectSlot(teacherId: string, slotId: string) {

  this.selectedTeacherId = teacherId;
  this.selectedSlotId = slotId;

  console.log("Teacher :", teacherId);
  console.log("Slot :", slotId);

}

 

  selectTeacher(id: string): void {
    this.selectedTeacherId = id;
    
  }

bookSeat() {

  if (!this.selectedTeacherId || !this.selectedSlotId) {
    alert("Please select a slot");
    return;
  }

  console.log("Teacher Id :", typeof(this.selectedTeacherId));
  console.log("Slot Id :", this.selectedSlotId); 
   
  // let TeacherId=this.selectedTeacherId();

// this.studServ.setTeacherId(this.selectedTeacherId);
 this.studServ.setSlotId( this.selectedSlotId);
  

  this.router.navigate(['/courses']);

}
}
