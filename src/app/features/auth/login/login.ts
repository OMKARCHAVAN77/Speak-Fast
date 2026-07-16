import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type UserType = 'student' | 'teacher' | 'admin';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
userType: UserType = 'teacher';
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  userTypeConfig = {
    student: { title: 'Student Login', icon: 'student' },
    teacher: { title: 'Teacher Login', icon: 'teacher' },
    admin: { title: 'Admin Login', icon: 'admin' }
  };

  get currentTitle(): string {
    return this.userTypeConfig[this.userType].title;
  }

  selectUserType(type: UserType): void {
    this.userType = type;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Login submitted', {
        userType: this.userType,
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
      // TODO: call your auth service here
    } else {
      Object.values(form.controls).forEach(control => control.markAsTouched());
    }
  }

  goBack(): void {
    console.log('Back to user type selection');
    // TODO: navigate back
  }
}
