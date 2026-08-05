import { ToastrService } from 'ngx-toastr';
import { AlertService } from './../../../../core/services/alert.service';
import { isEmailExist } from './../../../../core/Validators/emailExist.validator';
import { Component, OnInit, signal, viewChild, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { StudentService } from '../../../../core/services/student.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationValidator } from '../../../../core/Validators/regist_validators.validator';

@Component({
  selector: 'app-reset-password',
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit, AfterViewInit{

  restPasswordForm!:FormGroup;
  isLoaderOn=signal<boolean>(false);
@ViewChild('emailField')
emailFieldVar!: ElementRef<HTMLInputElement>;

  constructor(private frogotstudentserve: StudentService, private snackBar: MatSnackBar,
     private router: Router, private fb: FormBuilder,private emailExistService: isEmailExist,
    private alertServ: AlertService, private toster: ToastrService) { }

  // emailVal: string = '';

  // resetPassword(){
  //   const body = {
  //     email : this.emailVal
  //   }
  //   this.frogotstudentserve.forgotStudentPassword(body).subscribe((data : any)=>{
  //     console.log(data);
  //   })
  //   console.log(this.emailVal);
  // }

  ngOnInit(): void {

    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.emailFieldVar.nativeElement.focus();
  }


  initializeForm():void{
    this.restPasswordForm = this.fb.group({
      email:['',
            [Validators.required,RegistrationValidator.noSpaceValidator,
              RegistrationValidator.isEmailCorrect],
             [this.emailExistService.emailExistsForgotPass()]]
    })

  }


  resetPassword(): void {


    if(this.restPasswordForm.valid){
        this.isLoaderOn.set(true);
        this.frogotstudentserve
        .forgotStudentPassword(this.restPasswordForm.value)
        .subscribe({
        next: (response: any) => {
          this.isLoaderOn.set(false);
          // this.alertServ.success("Success"," your mail will receive change password link ");
          this.frogotstudentserve.setEmailForgotPass(this.restPasswordForm.get('email')?.value);
          
          this.toster.success("change password link sent on your email")
          this.router.navigate(['/forgotPassword/sentLink']);
        },

        error: (_error: Error)=>{
                    this.isLoaderOn.set(false);
          // this.alertServ.error("","please try after some time...");
        }
      })

    }else{
      this.restPasswordForm.markAllAsTouched();
    }


  }
}
