import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface StatCard {
  icon: string;
  value: string;
  label: string;
}
@Component({
  selector: 'app-teacher-dashboard',
   imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css',
})
export class TeacherDashboard {
  teacherName = 'Emma Davis';

  stats: StatCard[] = [
    { icon: 'menu_book', value: '145', label: 'Total Classes' },
    { icon: 'groups', value: '32', label: 'Active Student' },
    { icon: 'task_alt', value: '3', label: 'Confirmed Classes' }
  ];

  tabs: string[] = ['Upcoming Classes', 'Students', 'Assignments'];
  activeTab = 'Upcoming Classes';

  selectTab(tab: string): void {
    this.activeTab = tab;
  }
}







  