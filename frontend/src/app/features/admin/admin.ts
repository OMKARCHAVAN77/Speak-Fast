import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdminTeachers } from './admin-teachers/admin-teachers';
import { AdminRecentEnrollments } from './admin-recent-enrollments-all-student/admin-recent-enrollments';
import { AdminAllStudents } from './admin-allstudents/admin-allstudents';

interface TabItem {
  label: string;
  key: 'recent' | 'teachers' | 'students';
  active: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule,AdminTeachers,AdminRecentEnrollments,AdminAllStudents],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  
studentCount = signal(0);
teacherCoutn = signal(0)
  totalStudentCount(count:any){
    console.log(count)
    this.studentCount.set(count)
  }

  teacherCount(count:any){
    this.teacherCoutn.set(count)
  }

  stats = computed(()=> [
    {
      icon: 'groups',
      iconGradient: 'linear-gradient(135deg, #6ea8fe 0%, #3b6fe0 100%)',
      label: 'Total Students',
      value: this.studentCount(),
      sublabel: '+12% this month'
    },
    {
      icon: 'assignment_ind',
      iconGradient: 'linear-gradient(135deg, #b48af0 0%, #7c4fd6 100%)',
      label: 'Active Teachers',
      value: this.teacherCoutn(),
      sublabel: `${this.teacherCoutn()} available`
    },
    {
      icon: 'currency_rupee',
      iconGradient: 'linear-gradient(135deg, #6cc6f8 0%, #2f9eea 100%)',
      label: 'Monthly Revenue',
      value: '$48,650',
      sublabel: '+8.2% vs last month'
    },
    {
      icon: 'calendar_month',
      iconGradient: 'linear-gradient(135deg, #ff8f9c 0%, #ef4d63 100%)',
      label: 'Classes This Week',
      value: '324',
      sublabel: '156 scheduled ahead'
    }
  ]);

  tabs: TabItem[] = [
    { label: 'Recent Enrollments', key: 'recent', active: true },
    { label: 'Teachers', key: 'teachers', active: false },
    { label: 'All Students', key: 'students', active: false }
  ];

  activeTab: 'recent' | 'teachers' | 'students' = 'recent';

  selectTab(selected: TabItem): void {
    this.tabs.forEach(t => (t.active = t === selected));
    this.activeTab = selected.key;
  }
}