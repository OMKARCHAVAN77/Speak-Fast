import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal, OnInit } from '@angular/core';
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
import { environment } from '../../../../environments/environments';




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
    MatChipsModule,
  MatFormFieldModule,
MatInputModule],
  templateUrl: './admin-allstudents.html',
  styleUrl: './admin-allstudents.css',
})
export class AdminAllStudents implements OnInit {
  searchTerm = '';
allStudentList = signal<any[]>([]);
studentLength = signal<number>(0);

constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.loadStudents();
}

loadStudents() {
  this.http.get<any>(`${environment.apiUrl}/students/getallstudent`)
    .subscribe({
      next: (res) => {
        this.allStudentList.set(res.data);
        this.studentLength.set(res.data.length);

        console.log(this.allStudentList());
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get filteredStudents(): any[] {

  if (!this.searchTerm.trim()) {
    return this.allStudentList();
  }

  const term = this.searchTerm.toLowerCase();

  return this.allStudentList().filter((student: any) =>
    student.firstName.toLowerCase().includes(term) ||
    student.lastName.toLowerCase().includes(term) ||
    student.email.toLowerCase().includes(term)
  );

  }


  onDelete(student: any): void {

  this.allStudentList.update(list =>
    list.filter(s => s._id !== student._id)
  );

  this.studentLength.set(this.allStudentList().length);
  }

  onEdit(student: any): void {
    console.log(student);
  }

  onWhatsApp(student: any): void {
    const phone = student.contactNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  }
}  