import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface TimeSlot {
  time: string;
}

interface Teacher {
  name: string;
  photo: string;
  description: string;
  timeSlots: TimeSlot[];
  upcomingSlot?: string;
}

@Component({
  selector: 'app-courses-book-trainer',
    imports: [CommonModule, MatIconModule, MatButtonModule,],
  templateUrl: './courses-book-trainer.html',
  styleUrl: './courses-book-trainer.css',
})
export class CoursesBookTrainer {

  featuredTeacher = {
    name: 'Suhani Rathod',
    photo: 'assets/teachers/suhani-rathod.jpg',
    studentCount: 312,
    tags: ['Academic english', 'Grammar', '+2 More'],
    about:
      'PhD in English Literature with a decade of experience helping students excel in academic.'
  };

  otherTeachers: Teacher[] = [
    {
      name: 'Mohini Shetty',
      photo: 'assets/teachers/mohini-shetty.jpg',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academic.',
      timeSlots: [
        { time: '07:00am' },
        { time: '08:00am' },
        { time: '10:00am' },
        { time: '11:00am' },
        { time: '12:00pm' },
        { time: '02:00pm' },
        { time: '04:00pm' },
        { time: '05:00pm' }
      ],
      upcomingSlot: 'New available slot from 8 March at 9:00am'
    },
    {
      name: 'Dinesh Deshmukh',
      photo: 'assets/teachers/dinesh-deshmukh.jpg',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academic.',
      timeSlots: [
        { time: '07:00am' },
        { time: '08:00am' },
        { time: '10:00am' },
        { time: '11:00am' },
        { time: '12:00pm' },
        { time: '02:00pm' },
        { time: '04:00pm' },
        { time: '05:00pm' }
      ]
    },
    {
      name: 'Suhani Patil',
      photo: 'assets/teachers/suhani-patil.jpg',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academic.',
      timeSlots: [
        { time: '07:00am' },
        { time: '08:00am' },
        { time: '10:00am' },
        { time: '11:00am' },
        { time: '12:00pm' },
        { time: '02:00pm' },
        { time: '04:00pm' },
        { time: '05:00pm' }
      ]
    }
  ];

  onTakeGrammarTest(): void {
    console.log('Take Grammar Test clicked');
  }

  onBookSeat(teacher: Teacher): void {
    console.log('Book Seat clicked for', teacher.name);
  }
}