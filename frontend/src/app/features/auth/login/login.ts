import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
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
    MatRadioButton,
     MatRadioGroup, 
    MatIconModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // email: string = '';
  // password: string = '';
  // rememberMe: boolean = true;
  // hidePassword: boolean = true;
  // showPassword = false;
  // isLoading: boolean = false;
  // selectedRole: UserType = 'teacher';


  // private teacherLoginUrl = 'http://localhost:5000/api/teacher/login';
  // private adminLoginUrl = 'http://localhost:5000/api/auth/login';;

  // constructor(
  //   private http: HttpClient,
  //   private router: Router,
  //   private snackBar: MatSnackBar
  // ) {}

  // togglePassword() {
  //   this.showPassword = !this.showPassword;
  // }

  // togglePasswordVisibility(): void {
  //   this.hidePassword = !this.hidePassword;
  // }

  // onLogin(): void {
  //   if (!this.email || !this.password) {
  //     this.showToast('Please enter both email and password.', 'error');
  //     return;
  //   }

  //   this.isLoading = true;

  //   const payload = {
  //     email: this.email,
  //     password: this.password
  //   };


  //   const loginUrl = this.selectedRole === 'admin' ? this.adminLoginUrl : this.teacherLoginUrl;

  //   this.http.post<any>(loginUrl, payload, { withCredentials: true }).subscribe({
  //     next: (res) => this.handleLoginSuccess(res),
  //     error: (err) => this.handleLoginError(err)
  //   });
  // }

  // private handleLoginSuccess(res: any): void {
  //   this.isLoading = false;


  //   const user = this.selectedRole === 'admin' ? res.admin : res.teacher;
  //   const role: UserType = user?.role || this.selectedRole;

  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('userRole', role);


  //   setTimeout(() => this.showToast('Login successful!', 'success'));

  //   this.navigateByRole(role);
  // }

  // private handleLoginError(err: any): void {
  //   this.isLoading = false;
  //   const message = err?.error?.message || 'Login failed. Please try again.';

  //   setTimeout(() => this.showToast(message, 'error'));

  //   console.error('LOGIN ERROR:', err.status, err.error);
  // }

  // private navigateByRole(role: UserType): void {
  //   switch (role) {
  //     case 'admin':
  //       this.router.navigate(['/admin']);
  //       break;
  //     case 'teacher':
  //       this.router.navigate(['/teachers']);
  //       break;
  //     case 'student':
  //       this.router.navigate(['/student/dashboard']);
  //       break;
  //     default:
  //       this.router.navigate(['/home']);
  //   }
  // }

  // private showToast(message: string, type: 'success' | 'error'): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     panelClass: type === 'error' ? ['toast-error'] : ['toast-success'],
  //     horizontalPosition: 'right',
  //     verticalPosition: 'top'
  //   });
  // }

  // onForgotPassword(): void {
  //   console.log('Forgot password clicked');
  // }

  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  hidePassword: boolean = true;
  showPassword = false;
  isLoading: boolean = false;
  selectedRole: UserType = 'teacher';

  // Donhi endpoints ithe declare kele — adhi phakt teacherLoginUrl hota
  // student login add kela
  private teacherLoginUrl = 'http://localhost:5000/api/teacher/login';
  private adminLoginUrl = 'http://localhost:5000/api/auth/login';
  private studentLoginUrl = 'http://localhost:5000/api/students/login';

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

    // selectedRole var based teenpaiki ekach API call hoil
    const loginUrl = this.getLoginUrl(this.selectedRole);

    this.http.post<any>(loginUrl, payload, { withCredentials: true }).subscribe({
      next: (res) => this.handleLoginSuccess(res),
      error: (err) => this.handleLoginError(err)
    });
  }

  private getLoginUrl(role: UserType): string {
    switch (role) {
      case 'admin':
        return this.adminLoginUrl;
      case 'student':
        return this.studentLoginUrl;
      case 'teacher':
      default:
        return this.teacherLoginUrl;
    }
  }

  private handleLoginSuccess(res: any): void {
    this.isLoading = false;

    // selectedRole based var response cha key nivadaycha (res.admin / res.teacher / res.student)
    const user = this.getUserFromResponse(res, this.selectedRole);
    const role: UserType = user?.role || this.selectedRole;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', role);

    // setTimeout ne NG0100 (ExpressionChangedAfterItHasBeenCheckedError) taalla
    setTimeout(() => this.showToast('Login successful!', 'success'));

    this.navigateByRole(role);
  }

  private getUserFromResponse(res: any, role: UserType): any {
    switch (role) {
      case 'admin':
        return res.admin;
      case 'student':
        return res.student;
      case 'teacher':
      default:
        return res.teacher;
    }
  }

  private handleLoginError(err: any): void {
    this.isLoading = false;
    const message = err?.error?.message || 'Login failed. Please try again.';

    setTimeout(() => this.showToast(message, 'error'));

    console.error('LOGIN ERROR:', err.status, err.error);
  }

  private navigateByRole(role: UserType): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'teacher':
        this.router.navigate(['/teachers']);
        break;
      case 'student':
        this.router.navigate(['/home']);
        break;
    }
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