import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { number } from '../../../../../node_modules/zod/src/v4/core/regexes';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

export interface Enrollment {
  name: string;
  // status: string;
  email: string;
  phone: string;
  teacher: string;
  // course: string;
  // enrolledDate: string;
  // endDate: string;  
  // time?: string;
  // fee: string;
}

@Component({
  selector: 'app-admin-recent-enrollments',
  imports: [CommonModule,    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './admin-recent-enrollments.html',
  styleUrl: './admin-recent-enrollments.css',
})
export class AdminRecentEnrollments {
   searchText = '';
  totalEnrollments = 13;
 
  enrollments: Enrollment[] = [
    {
      name: 'Satish Kumar',
      // status: 'Paid',
      email: 'satish@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      // course: 'Full course (3 Months)',
      // enrolledDate: 'Jan 02, 2026',
      // endDate: 'April 15, 2026',
      // fee: '15,000'
    },
    {
      name: 'Rajesh Chouhan',
      // status: 'Paid',
      email: 'rajesh@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      // course: 'Full course (3 Months)',
      // enrolledDate: 'Jan 04, 2026',
      // endDate: 'April 15, 2026',
      // time: '12:00am to 01:00am',
      // fee: '15,000'
    },
    {
      name: 'Sudhir Shetty',
      // status: 'Paid',
      email: 'sudhir@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      // course: 'Full course (3 Months)',
      // enrolledDate: 'Jan 04, 2026',
      // endDate: 'April 15, 2026',
      // time: '12:00am to 01:00am',
      // fee: '15,000'
    },
    {
      name: 'Suman Patil',
      // status: 'Paid',
      email: 'suman@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      // course: 'Full course (3 Months)',
      // enrolledDate: 'Jan 07, 2026',
      // endDate: 'April 15, 2026',
      // time: '12:00am to 01:00am',
      // fee: '15,000'
    },
    {
      name: 'Sanjay Gupta',
      // status: 'Paid',
      email: 'sanjay@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      // course: 'Full course (3 Months)',
      // enrolledDate: 'Jan 10, 2026',
      // endDate: 'April 15, 2026',
      // time: '12:00am to 01:00am',
      // fee: '15,000'
    }
  ];
 
  get filteredEnrollments(): Enrollment[] {
    const term = this.searchText.trim().toLowerCase();
    if (!term) {
      return this.enrollments;
    }
    return this.enrollments.filter(e => e.name.toLowerCase().includes(term));
  }
 
  // onSelectDate(): void {
  //   // Hook up a date range picker here as needed
  // }
 
  // viewDetails(enrollment: Enrollment): void {
  //   // Navigate to / open the details view for this enrollment
  //   console.log('View details for', enrollment.name);
  // }
}
