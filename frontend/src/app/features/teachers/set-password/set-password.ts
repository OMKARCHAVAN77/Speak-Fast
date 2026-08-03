import { RegistrationValidator } from './../../../core/Validators/regist_validators.validator';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-set-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './set-password.html',
  styleUrls: ['./set-password.css'],
})
export class SetPassword implements OnInit {

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  email: string = '';
  token: string = '';
  // successMessage: string = '';
  // errorMessage: string = '';
  isLoading = signal<boolean>(false);
  setPasswordForm!:FormGroup

  private apiUrl = `${environment.apiUrl}/auth/setpassword`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.initializeForm();
      this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
    });
  }


  initializeForm(): void{

    this.setPasswordForm = this.fb.group({
      password: ['',[Validators.required,RegistrationValidator.password]],
      confirmPassword: ['',[Validators.required]]
    },
     {
      validators: RegistrationValidator.passwordChecking
    })
  }
  onSubmit(): void {

    this.isLoading.set(true);
    const payload = {...this.setPasswordForm.value};




    if(this.setPasswordForm.valid){

      this.http.post<any>(`${this.apiUrl}/${this.token}`, payload).subscribe({
        next: (res) => {
        this.isLoading.set(false);
          // this.successMessage = res.message || 'Password set successfully';

            this.router.navigate(['/login']);

        },
        error: (err) => {
        this.isLoading.set(false);
          // this.errorMessage = err.error?.message || 'Something went wrong';
        }
      });
    }else{

      this.isLoading.set(false);
      this.setPasswordForm.markAllAsTouched();



    }
  }


  get password() {
    return this.setPasswordForm.get('password');
  }

  get passwordValue(): string {
    return this.password?.value || '';
  }

  hasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  hasUppercase(): boolean {
    return /(?=.*[A-Z])/.test(this.passwordValue);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  hasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }

  hasSpecialChar(): boolean {
    return /[@$!%*?&#^();"'{}_\-+~=<>?,.]/.test(this.passwordValue);
  }


  isPasswordValid(): boolean {
    return (
      this.hasMinLength() &&
      this.hasUppercase() &&
      this.hasLowercase() &&
      this.hasNumber() &&
      this.hasSpecialChar()
    );
  }
}
