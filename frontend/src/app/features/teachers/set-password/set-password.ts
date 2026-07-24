import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-set-password',
  imports: [CommonModule, FormsModule,],
  templateUrl: './set-password.html',
  styleUrls: ['./set-password.css'],
})
export class SetPassword {
 showPassword = false;
togglePassword() {
  this.showPassword = !this.showPassword;
}
//  email: string = '';
//   token: string = '';
//   newPassword: string = '';
//   confirmPassword: string = '';

  //  successMessage: string = '';
  //  errorMessage: string = '';
//   isLoading: boolean = false;

//   private apiUrl = `http://${environment.apiUrl}/teacher/set-password`;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     // URL se token aur email nikalna
//     this.route.queryParams.subscribe(params => {
//       this.token = params['token'] || '';
//       this.email = params['email'] || '';
//     });
//   }

//   onSubmit(): void {
//     this.successMessage = '';
//     this.errorMessage = '';

//     if (!this.newPassword || !this.confirmPassword) {
//       this.errorMessage = 'Please fill in both password fields';
//       return;
//     }

//     if (this.newPassword !== this.confirmPassword) {
//       this.errorMessage = 'Passwords do not match';
//       return;
//     }

//     this.isLoading = true;

//     const payload = {
//       email: this.email,
//       token: this.token,
//       newPassword: this.newPassword,
//       confirmPassword: this.confirmPassword
//     };

//     this.http.post<any>(this.apiUrl, payload).subscribe({
//       next: (res) => {
//         this.isLoading = false;
//         this.successMessage = res.message || 'Password set successfully';

//         // 2 second baad login page pe redirect
//         setTimeout(() => {
//           this.router.navigate(['/login']);
//         }, 2000);
//       },
//       error: (err) => {
//         this.isLoading = false;
//         this.errorMessage = err.error?.message || 'Something went wrong';
//       }
//     });
//   }


 email: string = '';
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  successMessage: string = '';

  errorMessage: string = '';
  isLoading: boolean = false;

  private apiUrl = `${environment.apiUrl}/teacher/reset-password`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // URL se token aur email nikalna
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in both password fields';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;

    const payload = {
      email: this.email,
      token: this.token,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (res) => {
        this.isLoading = false;
         this.successMessage = res.message || 'Password set successfully';
        // API success hone ke baad hi password-changed page pe jao
        setTimeout(() => {
           this.router.navigate(['/login']);
         }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Something went wrong';
      }
    });
  }
}
