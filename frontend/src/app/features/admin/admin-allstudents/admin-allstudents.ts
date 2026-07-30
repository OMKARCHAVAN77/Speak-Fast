import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminService } from '../../../core/services/admin.service';
import { AlertService } from '../../../core/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-allstudents',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
  templateUrl: './admin-allstudents.html',
  styleUrl: './admin-allstudents.css',
})
export class AdminAllStudents implements OnInit {
  searchTerm = '';
  selectedDate: Date | null = null;
  allStudentList = signal<any[]>([]);
  studentLength = signal<number>(0);
  students: any;
  loading = signal(false);

  constructor(private adminServ: AdminService, private datePipe: DatePipe, 
      private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadStudents();

  }

  getAllStudents() {
    this.loading.set(true);
  this.adminServ.getAllStudentsOnAdminDashboard().subscribe({
    next: (res: any) => {
      // console.log(res)
     const students = res.data.map((student: any) => ({

  firstName: student.userId?.firstName ?? "",

  lastName: student.userId?.lastName ?? "",

  contactNumber: student.contactNumber ?? "",

  email: student.userId?.email ?? "",

  plan: student.bookings?.[0]?.courseName ?? "",

  googleMeetLink: student.googleMeetLink,

  teacher: student.assignedTeacher?.userId
    ? `${student.assignedTeacher.userId.firstName ?? ""} ${student.assignedTeacher.userId.lastName ?? ""}`
    : "Not Assigned",

  timeSlot: student.bookings?.[0]?.slotTime ?? "",

  enrolledDate: student.bookings?.[0]?.createdAt
    ? this.datePipe.transform(
        student.bookings[0].createdAt,
        'MMM d, y'
      )
    : "",

  _id: student._id

}));

      this.allStudentList.set(students);
      this.studentLength.set(students.length);
        this.loading.set(false);
      console.log(this.allStudentList());

    },
    error: (err) => {
      console.log(err);
        this.loading.set(false);
    }
  });
}

  loadStudents() {
    this.getAllStudents()

  }

  get filteredStudents(): any[] {
    let result = this.allStudentList();

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter((student: any) =>
        student.firstName.toLowerCase().includes(term) ||
        student.lastName.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      );
    }

    if (this.selectedDate) {
      const formatted = this.datePipe.transform(this.selectedDate, 'MMM d, y');
      result = result.filter((student: any) => student.enrolledDate === formatted);
    }

    return result;
  }

  onDateSelected(date: Date | null): void {
    this.selectedDate = date;
  }

  clearDate(event: Event): void {
    event.stopPropagation();
    this.selectedDate = null;
  }

  // delete specifit student alert
async onDelete(student: any): Promise<void> {

  const result = await this.alertService.confirm(
    'Are you sure?',
    'Do you really want to delete this student?',
    'warning',
    'Yes, Delete',
    'Cancel'
  );

  if (result.dismiss === Swal.DismissReason.cancel) {

    await this.alertService.error(
      'Cancelled',
      'Student deletion has been cancelled.'
    );

    return;
  }

  this.adminServ.deleteSpecificStudent(student._id).subscribe({

    next: () => {

      this.allStudentList.update(list =>
        list.filter(s => s._id !== student._id)
      );

      this.studentLength.set(this.allStudentList().length);

      this.alertService.success(
        'Deleted!',
        'Student has been deleted successfully.'
      );

    },

    error: (err: any) => {

      this.alertService.error(
        'Error!',
        err.error?.message || 'Failed to delete student.'
      );

    }

  });

}

  onEdit(student: any): void {
    console.log(student);
  }

  onAccept(student: any): void {
    this.allStudentList.update(list =>
      list.map(s => s._id === student._id ? { ...s, status: 'paid' } : s)
    );
    // API call to confirm/accept the enrollment goes here
  }

  onWhatsApp(student: any): void {
    const phone = student.contactNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  }
}
