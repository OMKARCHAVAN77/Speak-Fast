import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

type UserType = 'student' | 'teacher' | 'admin';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  hidePassword: boolean = true;
  showPassword = false;

  errorMessage: string = '';
  isLoading: boolean = false;

  private teacherLoginUrl = 'http://localhost:5000/api/teacher/login';

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;

    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(this.teacherLoginUrl, payload, { withCredentials: true }).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Login successful:', res);

        // teacher ki info localStorage me save kar sakte hain (optional, baad me use hogi)
        localStorage.setItem('teacher', JSON.stringify(res.teacher));

        // teacher dashboard/home pe redirect
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('LOGIN ERROR:', err);
      }
    });
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page/flow
  }
}
