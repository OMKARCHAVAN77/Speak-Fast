import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentProcess } from './student-process/student-process';
import { StudentMyClasess } from './student-my-clasess/student-my-clasess';

export interface StatCard {
  icon: string;
  value: string;
  label: string;
}

export interface ClassSession {
  name: string;
  subject: string;
  day: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
 
export type TabKey = 'classes' | 'progress' | 'assignments';

@Component({
  selector: 'app-student-achievement',
    imports: [CommonModule, MatIconModule, MatButtonModule,StudentProcess,StudentMyClasess],
  templateUrl: './student-achievement.html',
  styleUrl: './student-achievement.css',
})
export class StudentAchievement {
        studentName = 'Alex Johnson';
 
  stats: StatCard[] = [
    { icon: 'school', value: '48', label: 'Total Hours' },
    { icon: 'menu_book', value: '32', label: 'Lessons Done' },
    { icon: 'trending_up', value: '85%', label: 'Grammar Score' },
    { icon: 'workspace_premium', value: 'Intermediate (B1)', label: 'Current Level' },
  ];
 
  // Active tab is just component state -> switching tabs only swaps the
  // content pane below. The header, stats, and tab bar never re-render/reload.
  activeTab: TabKey = 'classes';
 
  tabs: { key: TabKey; label: string }[] = [
    { key: 'classes', label: 'My Classes' },
    { key: 'progress', label: 'Progress' },
    { key: 'assignments', label: 'Assignments' },
  ];
 
 
 
  selectTab(tab: TabKey): void {
    this.activeTab = tab;
  }
 
  
 
  onRequestLeave(): void {
    console.log('Request leave clicked');
  }
 
  onNotifications(): void {
    console.log('Notifications clicked');
  }
}
