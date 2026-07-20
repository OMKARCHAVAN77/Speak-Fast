import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

type UserType = 'student' | 'teacher' | 'admin';

@Component({
  selector: 'app-login',
  imports: [CommonModule,     FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  hidePassword: boolean = true;
  showPassword = false;
  
togglePassword() {
  this.showPassword = !this.showPassword;
}
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      console.warn('Please enter both email and password.');
      return;
    }

    console.log('Login attempt:', {
      email: this.email,
      rememberMe: this.rememberMe
    });

    // TODO: Call your authentication service here
    // this.authService.login(this.email, this.password).subscribe(...)
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page/flow
  }
}
