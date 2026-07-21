import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Availability {
  date: string;      // 'yyyy-MM-dd'
  slots: string[];
}

interface Teacher {
  name: string;
  image: string;
  // description: string;
  availability: Availability[];
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css'
})
export class Teachers {

  timeSlots = [
    '07:00am','08:00am','09:00am','10:00am','11:00am','12:00pm',
    '01:00pm','02:00pm','03:00pm','04:00pm','05:00pm','06:00pm',
    '07:00pm','08:00pm','09:00pm'
  ];

  /** Plain 'yyyy-MM-dd' string used everywhere in the existing filter logic */
  selectedDate: string = '';

  /** Bound to the Material datepicker input (mat-datepicker works with Date objects) */
  selectedDateObj: Date | null = null;

  selectedSlots: string[] = [];

  teachers: Teacher[] = [
    {
      name: 'Anita Rathod',
      image: 'https://i.pravatar.cc/100?img=1',

      availability: [
        { date: '2026-07-20', slots: ['07:00am','08:00am','10:00am','11:00am'] },
        { date: '2026-07-21', slots: ['12:00pm','02:00pm'] }
      ]
    },
    {
      name: 'Chandani Kulkarni',
      image: 'https://i.pravatar.cc/100?img=5',

      availability: [
        { date: '2026-07-20', slots: ['07:00am','08:00am','04:00pm'] },
        { date: '2026-07-21', slots: ['10:00am','11:00am','12:00pm','02:00pm'] }
      ]
    },
    {
      name: 'Dinesh Deshmukh',
      image: 'https://i.pravatar.cc/100?img=12',

      availability: [
        { date: '2026-07-20', slots: ['07:00am','08:00am','10:00am'] }
      ]
    },
    {
      name: 'Ganesh Chouhan',
      image: 'https://i.pravatar.cc/100?img=13',

      availability: [
        { date: '2026-07-21', slots: ['07:00am','11:00am','12:00pm','02:00pm'] }
      ]
    },
    {
      name: 'Kamlesh Patil',
      image: 'https://i.pravatar.cc/100?img=15',

      availability: [
        { date: '2026-07-20', slots: ['11:00am','12:00pm'] }
      ]
    },
    {
      name: 'Mohini Shetty',
      image: 'https://i.pravatar.cc/100?img=9',
      availability: [
        { date: '2026-07-21', slots: ['08:00am','12:00pm','04:00pm','05:00pm'] }
      ]
    }
  ];

  // toggle a slot in/out of the selectedSlots array
  toggleSlot(slot: string) {
    if (this.selectedSlots.includes(slot)) {
      this.selectedSlots = this.selectedSlots.filter(s => s !== slot);
    } else {
      this.selectedSlots = [...this.selectedSlots, slot];
    }
  }

  isSlotSelected(slot: string): boolean {
    return this.selectedSlots.includes(slot);
  }

  onDateChange(value: string) {
    this.selectedDate = value;
  }

  /** Called by mat-datepicker (dateChange) which emits a Date, not a string */
  onDatePicked(value: Date | null) {
    if (!value) {
      this.selectedDate = '';
      return;
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    this.selectedDate = `${year}-${month}-${day}`;
  }

  // true only when BOTH a date AND at least one slot are selected
  get showResults(): boolean {
    return !!this.selectedDate && this.selectedSlots.length > 0;
  }

  // slots a teacher has free ON the selected date
  slotsForSelectedDate(teacher: Teacher): string[] {
    const match = teacher.availability.find(a => a.date === this.selectedDate);
    return match ? match.slots : [];
  }

  // teachers who are free on that date for ALL selected slots
  get filteredTeachers(): Teacher[] {
    if (!this.showResults) {
      return [];
    }
    return this.teachers.filter(t => {
      const daySlots = this.slotsForSelectedDate(t);
      return this.selectedSlots.every(slot => daySlots.includes(slot));
    });
  }
}