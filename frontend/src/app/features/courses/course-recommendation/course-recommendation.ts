import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface Plan {
  name: string;
  badge?: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  duration: string;
  liveSessions: number;
  learnItems: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-course-recommendation',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './course-recommendation.html',
  styleUrl: './course-recommendation.css',
})
export class CourseRecommendation {
  plans: Plan[] = [
    {
      name: 'BASIC PLAN',
      description: 'Intermediate level course for improving fluency and advanced grammar concepts',
      price: 8000,
      originalPrice: 10000,
      discount: '20% OFF',
      duration: '2 Month',
      liveSessions: 50,
      learnItems: [
        '1 Month Grammar + 1 Month Speaking',
        '50 Live 1 on 1 sessions (40 mins each)',
        'Basic grammar for communication',
        '20 Grammar test'
      ]
    },
    {
      name: 'PREMIUM PLAN',
      badge: 'Best Seller',
      description: 'Intermediate level course for improving fluency and advanced grammar concepts',
      price: 12000,
      originalPrice: 15000,
      discount: '20% OFF',
      duration: '3 Month',
      liveSessions: 75,
      featured: true,
      learnItems: [
        '2 Months Grammar + 1 Month Speaking',
        '75 Live 1 on 1 sessions (40 mins each)',
        '35 Grammar tests',
        'Free Interview training worth ₹ 3000',
        'Free Vocabulary E-book'
      ]
    },
    {
      name: 'VIP PLAN',
      description: 'Intermediate level course for improving fluency and advanced grammar concepts',
      price: 20000,
      originalPrice: 25000,
      discount: '20% OFF',
      duration: '6 Month',
      liveSessions: 150,
      learnItems: [
        '2 Months Grammar + 4 Months',
        '150 Live 1 on 1 sessions (40 mins each)',
        '4 mock interview by expert',
        'Resume Making Guidance',
        'Free Interview training worth ₹ 3000',
        'Free Vocabulary E-book'
      ]
    }
  ];

  enroll(plan: Plan): void {
    console.log('Enrolling in', plan.name);
  }
}