import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

interface Stat { value: string; label: string; }
interface Feature { icon: string; title: string; desc: string; }
interface Step { num: number; title: string; desc: string; }
interface Specialization { icon: string; title: string; desc: string; }
interface Testimonial { name: string; text: string; rating: number; }

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule
  ],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css'],
})
export class LandingPage {
  stats: Stat[] = [
    { value: '1200+', label: 'Happy Students' },
    { value: '50+', label: 'Expert Teachers' },
    { value: '4.9/5', label: 'Avg Rating' },
    { value: '95+', label: 'Success Stories' }
  ];

  guarantees: string[] = [
    'Money back guarantee',
    'Money back guarantee',
    'Money back guarantee',
    'Money back guarantee'
  ];

  features: Feature[] = [
    { icon: 'person', title: 'Expert Teachers', desc: 'Learn from certified fluency experts with years of experience' },
    { icon: 'event_available', title: 'Flexible Scheduling', desc: 'Book classes that fit around your day, any time zone' },
    { icon: 'track_changes', title: 'Personalized Learning', desc: 'A learning path built around your level and goals' },
    { icon: 'emoji_events', title: 'Proven Results', desc: 'Thousands of students have reached fluency with us' }
  ];

  steps: Step[] = [
    { num: 1, title: 'Take a Grammar Test', desc: 'Quick assessment to understand your current level' },
    { num: 2, title: 'Choose Your Teacher', desc: 'Pick from our roster of expert, certified instructors' },
    { num: 3, title: 'Book and Learn', desc: 'Schedule your sessions and start your journey to fluency' }
  ];

  specializations: Specialization[] = [
    { icon: 'forum', title: 'Conversation Practice', desc: 'Build real-world speaking confidence' },
    { icon: 'menu_book', title: 'Grammar Mastery', desc: 'Master the fundamentals of English grammar' },
    { icon: 'business_center', title: 'Business English', desc: 'Professional communication for the workplace' },
    { icon: 'workspace_premium', title: 'IELTS/TOEFL Prep', desc: 'Focused prep for standardized tests' },
    { icon: 'record_voice_over', title: 'Pronunciation', desc: 'Speak clearly and confidently' },
    { icon: 'groups', title: 'Expert Teachers', desc: 'Learn from certified native speakers' }
  ];

  testimonials: Testimonial[] = [
    { name: 'Sarah M.', rating: 5, text: 'This platform completely transformed my English confidence and fluency.' },
    { name: 'John D.', rating: 5, text: 'Flexible scheduling made it so easy to keep up with my lessons every week.' },
    { name: 'Maria L.', rating: 5, text: 'My teacher was patient and genuinely invested in my growth as a learner.' }
  ];

  starsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
