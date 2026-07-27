import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { RegistrationValidator } from '../../../core/Validators/regist_validators.validator';
import { ToastrService } from 'ngx-toastr';

type UserType = 'student' | 'teacher' | 'admin';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  // email: string = '';
  // password: string = '';
  // rememberMe: boolean = true;
  // hidePassword: boolean = true;
  // showPassword = false;
  // isLoading: boolean = false;
  // selectedRole: UserType = 'teacher';


  // private teacherLoginUrl = `http://${environment.apiUrl}/teacher/login`;
  // private adminLoginUrl = `http://${environment.apiUrl}/auth/login`;;

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


  hidePassword: boolean = true;
  showPassword = false;
  isLoading: boolean = false;
  getRole!:string;

  // Donhi endpoints ithe declare kele — adhi phakt teacherLoginUrl hota
  // student login add kela

logingForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ,private toastr: ToastrService,
  ) {}



  ngOnInit(): void {
      this.formInitializer();
  }

  formInitializer(){
    this.logingForm= this.fb.group({
      email: ['som@gmail.com',[Validators.required,RegistrationValidator.isEmailCorrect]],
      password:['Welcome@123456',[Validators.required]],
        isChecked:[false,[Validators.requiredTrue]]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }



  submitData(){
    const{isChecked, ...payload}={...this.logingForm.value }
    console.log("inside submi .. ",payload)
    console.log("inside submi value .. ",this.logingForm.valid);
    if(this.logingForm.valid){
      console.log("inside if condition");

      // setTimeout(()=>{
        this.http.post(`${environment.apiUrl}/user/login`,payload).subscribe({
          next:(x:any)=>{
            console.log(x.data.user.role);
            this.getRole=x.data.user.role;
            const loacalStorage =x.data.token;
            // this.router.navigate('')

            this.toastr.success(
              'User login successfully!',
              'Success'
            );
            // this.logingForm.reset();
            if(this.getRole === 'student'){
              this.router.navigate(['/student-achievement'])
            }else if(this.getRole === 'teacher'){
              this.router.navigate(['/teachers'])
            }else if(this.getRole === 'admin'){
              localStorage.setItem('token', loacalStorage );
              this.router.navigate(['/admin']);
            }
          },error:(err:any)=>{

            console.log(err)

              this.toastr.error(
                'login failed!',
                'Error'
              );


          }
        })
      // },1000)
    }else{
      this.logingForm.markAllAsTouched();
    }
  }





}
