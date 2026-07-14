import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureItem {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-grammar-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl:  './grammer-assignment.html',
  styleUrls: ['./grammer-assignment.css']
})
export class GrammerAssignment {
  features: FeatureItem[] = [
    {
      title: '25 Questions',
      subtitle: 'Covering essential grammar topics'
    },
    {
      title: '10-15 Minutes',
      subtitle: 'Covering essential grammar topics'
    },
    {
      title: 'Instant Results',
      subtitle: 'Get your level and recommendations immediately'
    }
  ];

  onStartTest(): void {
    // Hook up navigation / API call here
    console.log('Start Test clicked');
  }
}



