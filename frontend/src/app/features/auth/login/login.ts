import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  isLoading: boolean = false;

  private teacherLoginUrl = 'http://localhost:5000/api/teacher/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.showToast('Please enter both email and password.', 'error');
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

        localStorage.setItem('teacher', JSON.stringify(res.teacher));
        localStorage.setItem('teacherRole', res.teacher.role);

        this.showToast('Login successful!', 'success');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.message || 'Login failed. Please try again.';
        this.showToast(message, 'error');
        console.error('LOGIN ERROR:', err.status, err.error);
      }
    });
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['toast-error'] : ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
  }
}
