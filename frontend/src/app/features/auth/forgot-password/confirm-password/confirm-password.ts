import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-confirm-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './confirm-password.html',
  styleUrl: './confirm-password.css',
})
export class ConfirmPassword {

    showPassword:boolean = false;
      token: string | null = null;
  email: string | null = null;
  errorMessage = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.http.post(`http://${environment.apiUrl}/students/reset-password`, {
  token: this.token,
  email: this.email,
  newPassword: password,
}).subscribe({
  next: () => {
    this.router.navigate(['/forgotPassword/passwordChanged']);
  },
  error: (err) => {
    this.errorMessage = err?.error?.message || 'Something went wrong. Try again.';
  },
});
  }
}
