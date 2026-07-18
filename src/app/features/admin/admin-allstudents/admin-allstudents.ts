import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';




interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrolled: string;
  end: string;
  progress: number;
  onLeave?: string;
}
 



@Component({
  selector: 'app-admin-allstudents',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule],
  templateUrl: './admin-allstudents.html',
  styleUrl: './admin-allstudents.css',
})
export class AdminAllStudents {
  searchTerm = '';

  students: Student[] = [
    {
      id: 1,
      name: 'Shubham Jadhav',
      email: 'shubham@email.com',
      phone: '+1 234567890',
      course: 'Practice (3 Months)',
      enrolled: 'Jan 15, 2026',
      end: 'April 15, 2026',
      progress: 65
    },
    {
      id: 2,
      name: 'Sunil Devkate',
      email: 'sunil@email.com',
      phone: '+1 234567890',
      course: 'Practice (3 Months)',
      enrolled: 'Jan 15, 2026',
      end: 'April 15, 2026',
      progress: 65,
      onLeave: 'On Leave for 30 Sep - 1 Aug'
    },
    {
      id: 3,
      name: 'Kamlesh Patil',
      email: 'kamlesh@email.com',
      phone: '+1 234567890',
      course: 'Practice (3 Months)',
      enrolled: 'Jan 15, 2026',
      end: 'April 15, 2026',
      progress: 65
    },
    {
      id: 4,
      name: 'Suraj Kumbar',
      email: 'suraj@email.com',
      phone: '+1 234567890',
      course: 'Practice (3 Months)',
      enrolled: 'Jan 15, 2026',
      end: 'April 15, 2026',
      progress: 65,
      onLeave: 'On Leave for 30 Sep - 1 Aug'
    },
    {
      id: 5,
      name: 'Dinesh Deshmukh',
      email: 'dinesh@email.com',
      phone: '+1 234567890',
      course: 'Practice (3 Months)',
      enrolled: 'Jan 15, 2026',
      end: 'April 15, 2026',
      progress: 65,
      onLeave: 'On Leave for 30 Sep - 1 Aug'
    }
  ];

  get filteredStudents(): Student[] {
    if (!this.searchTerm.trim()) {
      return this.students;
    }
    const term = this.searchTerm.toLowerCase();
    return this.students.filter(
      s =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
    );
  }

  onEdit(student: Student): void {
    console.log('Edit student:', student);
  }

  onDelete(student: Student): void {
    console.log('Delete student:', student);
    this.students = this.students.filter(s => s.id !== student.id);
  }

  onWhatsApp(student: Student): void {
    const phone = student.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  }

  onAddStudent(): void {
    console.log('Add student clicked');
  }

  onFilter(): void {
    console.log('Filter clicked');
  }
}