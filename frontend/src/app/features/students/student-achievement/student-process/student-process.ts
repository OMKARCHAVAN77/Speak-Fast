import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


export interface ClassSession {
  name: string;
  subject: string;
  day: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}


@Component({
  selector: 'app-student-process',
  imports: [MatIconModule,CommonModule],
  templateUrl: './student-process.html',
  styleUrl: './student-process.css',
})
export class StudentProcess {

   classes: ClassSession[] = [
    {
      name: 'Suraj Kumar',
      subject: 'Conversation Practice',
      day: 'Today',
      time: '3:00 PM - 4:00 PM',
      status: 'confirmed',
    },
    {
      name: 'Nihal Thakur',
      subject: 'IELTS Speaking',
      day: 'Tomorrow',
      time: '10:00 AM - 11:00 AM',
      status: 'confirmed',
    },
    {
      name: 'Satish Kumbar',
      subject: 'Business English',
      day: 'Friday',
      time: '5:00 PM - 6:00 PM',
      status: 'pending',
    },
  ];



  joinClass(session: ClassSession): void {
    // Hook up real join logic (route to a call, open a modal, etc.)
    console.log('Joining class with', session.name);
  }

}
