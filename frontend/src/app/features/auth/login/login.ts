import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
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
import { AuthSer } from '../../../core/services/auth.service';



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



  hidePassword: boolean = true;
  showPassword = false;
  // isLoading: boolean = false;
  getRole!:string;
  isLoaderOn=signal<boolean>(false);


loginForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}



  ngOnInit(): void {
      this.formInitializer();
  }

  formInitializer(){
    this.loginForm= this.fb.group({
      email: ['',[Validators.required,RegistrationValidator.isEmailCorrect]],
      password:['',[Validators.required]],
        isChecked:[false]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }



  submitData(){
    const{isChecked, ...payload}={...this.loginForm.value }
    // console.log("inside submi .. ",this.loginForm.value," single value ", isChecked)
    // console.log("inside submi value .. ",this.loginForm.valid);
    if(this.loginForm.valid){
      // console.log("inside if condition");
      this.isLoaderOn.set(true);
        this.http.post(`${environment.apiUrl}/user/login`,payload).subscribe({
          next:(x:any)=>{
            // console.log(x.data.user.role);
            this.getRole=x.data.user.role;
            const tokenValue =x.data.token;
            // this.router.navigate('')
            if(isChecked){
              localStorage.setItem('token', tokenValue );
              localStorage.setItem('roles', this.getRole );
            }else{
              sessionStorage.setItem('token', tokenValue );
              sessionStorage.setItem('roles', this.getRole );
            }
            this.isLoaderOn.set(false);
            this.toastr.success(
              'login successfully!',
              'Success'
            );
            setTimeout(()=>{

                  // this.loginForm.reset();
                  if(this.getRole === 'student'){
                    this.router.navigate(['/student-achievement'])
                  }else if(this.getRole === 'teacher'){
                    this.router.navigate(['/teacherDashbord'])
                  }else if(this.getRole === 'admin'){

                    this.router.navigate(['/admin']);
                  }
            },1000)

          },error:(err:any)=>{

            // console.log(err)
            this.isLoaderOn.set(false);
              this.toastr.error(
                'login failed!',
                'Error'
              );


          }
        })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }





}
