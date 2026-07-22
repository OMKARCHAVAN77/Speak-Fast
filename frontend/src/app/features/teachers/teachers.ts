import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-teacher-hero',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class Teachers {
  // Matches the design: 05 January 2026
  selectedDate: Date = new Date(2026, 0, 5);
  selectedTime: string | null = null;

  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  onDateChange(event: any): void {
    if (event?.value) {
      this.selectedDate = event.value;
    }
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
  }
}