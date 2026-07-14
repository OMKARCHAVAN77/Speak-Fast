import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}
 
interface Course {
  icon: string;
  level: string;
  levelClass: string;
  title: string;
  description: string;
  duration: string;
  liveSessions: number;
  learningPoints: string[];
  price: number;
  badge: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
   perCourseMonthly = 5000;
  allCoursesPrice = 15000;
  averageRating = 4.9;
 
  packageOriginalPrice = 15000;
  packagePrice = 12000;
 
  features: Feature[] = [
    {
      icon: 'record_voice_over',
      title: 'Expert Teachers',
      description: 'Interactive sessions with expert teachers',
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Get help whenever you need it',
    },
    {
      icon: 'description',
      title: 'Study Materials',
      description: 'Comprehensive learning resources',
    },
    {
      icon: 'workspace_premium',
      title: 'Certificates',
      description: 'Recognized completion certificates',
    },
  ];
 
  courses: Course[] = [
    {
      icon: 'school',
      level: 'Beginner',
      levelClass: 'level-beginner',
      title: 'Basic Course',
      description:
        'Foundation level English speaking course covering basic conversation and grammar',
      duration: '1 Month',
      liveSessions: 30,
      learningPoints: [
        'Basic grammar fundamentals',
        'Essential vocabulary building',
        'Simple conversation practice',
        'Pronunciation basics',
      ],
      price: 5000,
      badge: 'Popular',
    },
    {
      icon: 'school',
      level: 'Intermediate',
      levelClass: 'level-intermediate',
      title: 'Advanced Course',
      description:
        'Intermediate level course for improving fluency and advanced grammar concepts',
      duration: '1 Month',
      liveSessions: 30,
      learningPoints: [
        'Advanced grammar structures',
        'Complex sentence formation',
        'Professional conversations',
        'Accent improvement',
      ],
      price: 5000,
      badge: 'Popular',
    },
    {
      icon: 'school',
      level: 'Advanced',
      levelClass: 'level-advanced',
      title: 'Practice Course',
      description:
        'Complete mastery course with intensive practice and real-world application',
      duration: '1 Month',
      liveSessions: 30,
      learningPoints: [
        'Complete grammar mastery',
        'Fluent conversation skills',
        'Interview preparation',
        'Public speaking practice',
      ],
      price: 5000,
      badge: 'Popular',
    },
  ];
 
  onEnroll(course: Course): void {
    console.log('Enroll clicked:', course.title);
  }
 
  onGetPackage(): void {
    console.log('Get Complete Package clicked');
  }
 
  onTakeFreeTest(): void {
    console.log('Take Free Test clicked');
  }
 
  onTalkToTeachers(): void {
    console.log('Talk to our Teachers clicked');
  }
}
