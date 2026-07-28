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

<<<<<<< HEAD
  console.log(this.teachers);
},
    error: (err) => {
       this.showTeachers = false;
      console.error(err);
    }
  });
=======
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
>>>>>>> df223c88441c96de1ec1c8a93169a433c52f47c3

}


  timeSlots: string[] = [
    '09:00AM', '10:00AM', '11:00AM','02:45am','12:00pm',
    '01:00PM', '02:00PM', '3:00pm','4:15am','03:30am','01:30am',
    '04:00PM', '05:00PM','12:45pm', '06:00PM', '07:00PM', '08:00PM'
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

  this.studServ.setTeacherId(this.selectedTeacherId);
 this.studServ.setSlotId( this.selectedSlotId);


  this.router.navigate(['/courses']);

}
}
