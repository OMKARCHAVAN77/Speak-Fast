import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { environment } from '../../../../../environments/environment';
import { StudentService } from '../../../../core/services/student.service';
import { RegistrationValidator } from '../../../../core/Validators/regist_validators.validator';

@Component({
  selector: 'app-confirm-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './confirm-password.html',
  styleUrl: './confirm-password.css',
})
export class ConfirmPassword {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  token: string | null = null;


  isLoaderOn=signal<boolean>(false);

  confirmPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.confirmPasswordForm = this.fb.group({
      email: [localStorage.getItem('forgotEmailId')],
      password: ['',[Validators.required,RegistrationValidator.password]],
      confirmPassword: ['',[Validators.required,RegistrationValidator.passwordChecking]]
    },
     {
      validators: RegistrationValidator.passwordChecking
    });
  }



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(){

    const { email , ...Payload} = this.confirmPasswordForm.value;

    if (this.confirmPasswordForm.valid) {
      console.log(this.confirmPasswordForm.value)
      this.isLoaderOn.set(true);

      this.route.paramMap.subscribe(params => {
        this.token = params.get('token');

        if (!this.token) {

          this.isLoaderOn.set(false);
          return;
        }

        this.studentService
          .resetStudentPassword(this.token, Payload)
          .subscribe({
            next: () => {
              this.isLoaderOn.set(false);
              localStorage.removeItem('forgotEmailId')
              localStorage.setItem('status','password changed Sccussfully');
              this.router.navigate(['/forgotPassword/passwordChanged']);

            },
            error: () =>{
              this.isLoaderOn.set(false);
            }
          });
      });


    } else {
      this.confirmPasswordForm.markAllAsTouched();
    }
  }

  get password() {
    return this.confirmPasswordForm.get('password');
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
