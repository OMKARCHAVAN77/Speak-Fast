import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface FooterLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  quickLinks: FooterLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'About Us', route: '/about' },
    { label: 'Courses', route: '/courses' },
    { label: 'Browse Teachers', route: '/teachers' },
    { label: 'Grammar Test', route: '/grammar-test' }
  ];

  coursesOffered: string[] = [
    'IELTS Preparation',
    'Business English',
    'Conversation Mastery',
    'Grammar Foundation',
    'Pronunciation & Accent',
    'Kids English (7-12 yrs)'
  ];

  contactEmail = 'info@speakfastacademy.com';
  contactPhone = '+91 9876543219';
  contactAddress = 'Global Online English Academy';
}