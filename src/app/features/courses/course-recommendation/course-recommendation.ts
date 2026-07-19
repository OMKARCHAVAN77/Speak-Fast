import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-recommendation',
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './course-recommendation.html',
  styleUrl: './course-recommendation.css',
})
export class CourseRecommendation {
  recommendedCourses = [
    {
      title: 'VIP Plan',
      badge: 'Recommended',
      description: 'Intermediate level course for improving fluency and advanced grammar concepts.',
      duration: '1 Month',
      sessions: '30',
      price: '₹5,000',
      topics: [
        'Advanced grammar structures',
        'Complex sentence formation',
        'Professional conversations',
        'Accent improvement'
      ]
    },

    {
      title: 'All in One Class',
      badge: 'Limited Time Offer',
      description: 'Complete package with all three courses - Foundation, Knowledge & Practice combined at special discounted price!',
      duration: '3 Months',
      sessions: '90',
      price: '₹12,000',
      originalPrice: '₹15,000',
      offerExpiry: '13 March 2026',
      topics: [
        'All Foundation + Knowledge + Practice',
        '3 months comprehensive training',
        'Personal mentor support',
        'Certificate of completion'
      ]
    },

    {
      title: 'Basic Plan',
      badge: 'Beginner',
      description: 'Foundation level English speaking course covering basic conversation and grammar.',
      duration: '1 Month',
      sessions: '30',
      price: '₹5,000',
      topics: [
        'Basic grammar fundamentals',
        'Essential vocabulary building',
        'Simple conversation practice',
        'Pronunciation basics'
      ]
    },

    {
      title: 'Premium Plan',
      badge: 'Advanced',
      description: 'Complete mastery course with intensive practice and real-world application.',
      duration: '1 Month',
      sessions: '30',
      price: '₹5,000',
      topics: [
        'Complete grammar mastery',
        'Fluent conversation skills',
        'Interview preparation',
        'Public speaking practice'
      ]
    }
  ];
}
