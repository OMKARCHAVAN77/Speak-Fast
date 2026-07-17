import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';

import { AdminAllStudents } from './admin-allstudents/admin-allstudents';

import { AdminTeachers } from './admin-teachers/admin-teachers';
import { AdminRecentEnrollments } from './admin-recent-enrollments/admin-recent-enrollments';
import { AdminUpcomingBatches } from './admin-upcoming-batches/admin-upcoming-batches';

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

 
interface StatCard {
  icon: string;
  label: string;
  value: string;
  sublabel: string;
}
 
interface Enrollment {
  name: string;
  status: 'Paid' | 'Unpaid';
  email: string;
  phone: string;
  teacher: string;
  course: string;
  enrolled: string;
  endDate: string;
  time?: string;
  fee: string;
}
 
type TabKey = 'recent' | 'upcoming' | 'teachers' | 'students';
 

@Component({
  selector: 'app-admin',
imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    AdminUpcomingBatches,
    AdminRecentEnrollments,
    AdminTeachers,
    AdminAllStudents,
    RouterOutlet,
    RouterModule,
    RouterLink
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin{
  readonly stats: StatCard[] = [
    { icon: 'groups', label: 'Total Students', value: '1,248', sublabel: '+12% this month' },
    { icon: 'record_voice_over', label: 'Active Teachers', value: '6', sublabel: '5 available' },
    { icon: 'currency_rupee', label: 'Monthly Revenue', value: '$48,650', sublabel: '+8.2% vs last month' },
    { icon: 'calendar_month', label: 'Classes This Week', value: '324', sublabel: '156 scheduled ahead' }
  ];
 
  readonly tabs: { key: TabKey; label: string }[] = [
    { key: 'recent', label: 'Recent Enrollments' },
    { key: 'upcoming', label: 'Upcoming Batches' },
    { key: 'teachers', label: 'Teachers' },
    { key: 'students', label: 'All Students' }
  ];
 
  activeTab = signal<TabKey>('recent');
  searchTerm = signal<string>('');
 
  readonly totalNewEnrollments = 13;
 
  readonly enrollments: Enrollment[] = [
    {
      name: 'Satish Kumar',
      status: 'Paid',
      email: 'satish@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      course: 'Full course (3 Months)',
      enrolled: 'Jan 02, 2026',
      endDate: 'April 15, 2026',
      fee: '15,000'
    },
    {
      name: 'Rajesh Chouhan',
      status: 'Paid',
      email: 'rajesh@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      course: 'Full course (3 Months)',
      enrolled: 'Jan 04, 2026',
      endDate: 'April 15, 2026',
      time: '12:00am to 01:00am',
      fee: '15,000'
    },
    {
      name: 'Sudhir Shetty',
      status: 'Paid',
      email: 'sudhir@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      course: 'Full course (3 Months)',
      enrolled: 'Jan 04, 2026',
      endDate: 'April 15, 2026',
      time: '12:00am to 01:00am',
      fee: '15,000'
    },
    {
      name: 'Suman Patil',
      status: 'Paid',
      email: 'suman@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      course: 'Full course (3 Months)',
      enrolled: 'Jan 07, 2026',
      endDate: 'April 15, 2026',
      time: '12:00am to 01:00am',
      fee: '15,000'
    },
    {
      name: 'Sanjay Gupta',
      status: 'Paid',
      email: 'sanjay@email.com',
      phone: '+1234567890',
      teacher: 'Mike Chen',
      course: 'Full course (3 Months)',
      enrolled: 'Jan 10, 2026',
      endDate: 'April 15, 2026',
      time: '12:00am to 01:00am',
      fee: '15,000'
    }
  ];
 
  get filteredEnrollments(): Enrollment[] {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.enrollments;
    return this.enrollments.filter(e => e.name.toLowerCase().includes(term));
  }
 
  selectTab(key: TabKey): void {
    this.activeTab.set(key);
  }
 
  initials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
 
  onDetails(enrollment: Enrollment): void {
    // Hook up to a details drawer/route as needed.
    console.log('View details for', enrollment.name);
  }
 
  onSelectDate(): void {
    // Hook up to a date picker overlay as needed.
    console.log('Open date picker');
  }
}
