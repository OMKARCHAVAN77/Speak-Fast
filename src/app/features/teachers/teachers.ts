import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css'
})
export class Teachers {

  teachers = [
    {
      name: 'Anita Rathod',
      image: 'https://i.pravatar.cc/100?img=1',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','11:00am','12:00pm','02:00pm']
    },
    {
      name: 'Chandani Kulkarni',
      image: 'https://i.pravatar.cc/100?img=5',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','11:00am','12:00pm','02:00pm','04:00pm']
    },
    {
      name: 'Dinesh Deshmukh',
      image: 'https://i.pravatar.cc/100?img=12',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','11:00am','12:00pm']
    },
    {
      name: 'Ganesh Chouhan',
      image: 'https://i.pravatar.cc/100?img=13',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','11:00am','12:00pm','02:00pm']
    },
    {
      name: 'Kamlesh Patil',
      image: 'https://i.pravatar.cc/100?img=15',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','11:00am','12:00pm']
    },
    {
      name: 'Mohini Shetty',
      image: 'https://i.pravatar.cc/100?img=9',
      description:
        'PhD in English Literature with a decade of experience helping students excel in academics.',
      slots: ['07:00am','08:00am','10:00am','12:00pm','04:00pm','05:00pm']
    }
  ];

}