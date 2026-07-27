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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { environment } from '../../../../environments/environments';




interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrolled: string;
  end: string;
  progress: number;
  onLeave?: string;
}

// ---- STATIC MOCK DATA (for local UI testing, remove when API is wired) ----
const MOCK_STUDENTS: any[] = [
  {
    _id: '1',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'paid',
  },
  {
    _id: '2',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'paid',
  },
  {
    _id: '3',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'paid',
  },
  {
    _id: '4',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'paid',
  },
  {
    _id: '5',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'paid',
  },
  {
    _id: '6',
    firstName: 'Pravin',
    lastName: 'Jadhav',
    email: 'parvin.j@email.com',
    contactNumber: '+1234567890',
    plan: 'Premium • 3 Months',
    teacher: 'Anith Rathod',
    enrolledDate: 'Jan 02, 2026',
    endDate: 'Apr 15, 2026',
    timeSlot: '10:00 - 11:00 AM',
    status: 'pending',
  },
];



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

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    // ---- Using static mock data for local check ----
    // Comment this block out and uncomment the HTTP call below once the API is ready.
    this.allStudentList.set(MOCK_STUDENTS);
    this.studentLength.set(MOCK_STUDENTS.length);
    console.log(this.allStudentList());

    // this.http.get<any>(`${environment.apiUrl}/students/getallstudent`)
    //   .subscribe({
    //     next: (res) => {
    //       this.allStudentList.set(res.data);
    //       this.studentLength.set(res.data.length);

    //       console.log(this.allStudentList());
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     }
    //   });
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

  onDelete(student: any): void {

    this.allStudentList.update(list =>
      list.filter(s => s._id !== student._id)
    );

    this.studentLength.set(this.allStudentList().length);
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