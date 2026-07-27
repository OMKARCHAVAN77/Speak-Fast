import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

export interface Enrollment {
  name: string;
  initials: string;
  email: string;
  phone: string;
  plan: string;
  teacher: string;
  enrolledDate: string;
  endDate: string;
  timeSlot: string;
  fee: string;
  status: 'paid' | 'pending';
}

@Component({
  selector: 'app-admin-recent-enrollments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
  templateUrl: './admin-recent-enrollments.html',
  styleUrl: './admin-recent-enrollments.css',
})
export class AdminRecentEnrollments {
  searchText = '';
  totalEnrollments = 13;
  selectedDate: Date | null = null;

  constructor(private datePipe: DatePipe) {}

  enrollments: Enrollment[] = [
    {
      name: 'Satish Kumar',
      initials: 'SK',
      email: 'satish@email.com',
      phone: '+1234567890',
      plan: 'Premium • 3 Months',
      teacher: 'Mike Chen',
      enrolledDate: 'Jan 02, 2026',
      endDate: 'Apr 15, 2026',
      timeSlot: '10:00 - 11:00 AM',
      fee: '₹12,000',
      status: 'paid',
    },
    {
      name: 'Rajesh Chouhan',
      initials: 'RC',
      email: 'rajesh@email.com',
      phone: '+1234567890',
      plan: 'Premium • 3 Months',
      teacher: 'Mike Chen',
      enrolledDate: 'Jan 04, 2026',
      endDate: 'Apr 15, 2026',
      timeSlot: '12:00 - 01:00 PM',
      fee: '₹15,000',
      status: 'paid',
    },
    {
      name: 'Sudhir Shetty',
      initials: 'SS',
      email: 'sudhir@email.com',
      phone: '+1234567890',
      plan: 'Premium • 3 Months',
      teacher: 'Mike Chen',
      enrolledDate: 'Jan 04, 2026',
      endDate: 'Apr 15, 2026',
      timeSlot: '12:00 - 01:00 PM',
      fee: '',
      status: 'pending',
    },
    {
      name: 'Suman Patil',
      initials: 'SP',
      email: 'suman@email.com',
      phone: '+1234567890',
      plan: 'Premium • 3 Months',
      teacher: 'Mike Chen',
      enrolledDate: 'Jan 07, 2026',
      endDate: 'Apr 15, 2026',
      timeSlot: '12:00 - 01:00 PM',
      fee: '₹15,000',
      status: 'paid',
    },
    {
      name: 'Sanjay Gupta',
      initials: 'SG',
      email: 'sanjay@email.com',
      phone: '+1234567890',
      plan: 'Premium • 3 Months',
      teacher: 'Mike Chen',
      enrolledDate: 'Jan 10, 2026',
      endDate: 'Apr 15, 2026',
      timeSlot: '12:00 - 01:00 PM',
      fee: '₹15,000',
      status: 'paid',
    },
  ];

  get filteredEnrollments(): Enrollment[] {
    let result = this.enrollments;

    const term = this.searchText.trim().toLowerCase();
    if (term) {
      result = result.filter((e) => e.name.toLowerCase().includes(term));
    }

    if (this.selectedDate) {
      const formatted = this.datePipe.transform(this.selectedDate, 'MMM d, y');
      result = result.filter((e) => e.enrolledDate === formatted);
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

  onAccept(enrollment: Enrollment): void {
    enrollment.status = 'paid';
    // fee assignment / API call goes here
  }

  onReject(enrollment: Enrollment): void {
    this.enrollments = this.enrollments.filter((e) => e !== enrollment);
    // API call to reject goes here
  }
}