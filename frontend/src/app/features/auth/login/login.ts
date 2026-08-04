import { AuthSer } from './../../../core/services/auth.service';
import { environment } from './../../../../environments/environment';
import { TokenService } from './../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { RegistrationValidator } from '../../../core/Validators/regist_validators.validator';
import { provideToastr, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule, RouterLink, ReactiveFormsModule],
    providers:[AuthSer,],
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
    private tokeServ: TokenService,
    private authService:AuthSer
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



  submitData():void{
    const{isChecked, ...payload}={...this.loginForm.value }

    if(this.loginForm.valid){
      this.isLoaderOn.set(true);
        this.authService.checkLogin(payload).subscribe({
          next:(x:any)=>{
            // console.log(x.data.user.role);
            this.getRole=x.data.user.role;
            const tokenValue =x.data.token;

            // this.router.navigate('')
            if(isChecked){

              this.tokeServ.setLocalStorageTokes(tokenValue,this.getRole);
            }else{

              this.tokeServ.setSessionStorageTokes(tokenValue,this.getRole)
            }
            this.isLoaderOn.set(false);
            this.toastr.success(
              'login successfully!',

            );




                  // this.loginForm.reset();
            if(this.getRole === 'student'){
              this.router.navigate(['/student-achievement'])
            }else if(this.getRole === 'teacher'){
              this.router.navigate(['/teacherDashbord'])
            }else if(this.getRole === 'admin'){
              this.router.navigate(['/admin']);
            }


          },error:(err:any)=>{

            // console.log(err)
            this.isLoaderOn.set(false);
              this.toastr.error(
                'login failed!',

              );


          }
        })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }





}
