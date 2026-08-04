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

    // Email Validation
  //   if (!this.emailVal || this.emailVal.trim() === "") {

  //     this.snackBar.open(
  //       "Please enter your registered email.",
  //       "Close",
  //       {
  //         duration: 3000,
  //         horizontalPosition: "right",
  //         verticalPosition: "top",
  //         panelClass: ["error-snackbar"]
  //       }
  //     );

  //     return;
  //   }

  //   const body = {
  //     email: this.emailVal.trim()
  //   };

  //   this.frogotstudentserve
  //     .forgotStudentPassword(body)
  //     .subscribe({

  //     next: (response: any) => {

  //       console.log("Forgot Password Success", response);

  //       this.snackBar.open(
  //         response.message || "Password reset link sent successfully.",
  //         "Close",
  //         {
  //           duration: 4000,
  //           horizontalPosition: "right",
  //           verticalPosition: "top",
  //           panelClass: ["success-snackbar"]
  //         }
  //       );

  //       setTimeout(() => {
  //         this.router.navigate(['/fogotPassword/sentLink']);
  //       }, 4000);

  //     },

  //       error: (err: any) => {

  //         console.log("Forgot Password Error", err);

  //         this.snackBar.open(

  //           err?.error?.message ||

  //           "Unable to send reset password link.",

  //           "Close",

  //           {
  //             duration: 3000,
  //             horizontalPosition: "right",
  //             verticalPosition: "top",
  //             panelClass: ["error-snackbar"]
  //           }

  //         );

  //       }

  //     });


    if(this.restPasswordForm.valid){
        this.isLoaderOn.set(true);
        this.frogotstudentserve
        .forgotStudentPassword(this.restPasswordForm.value)
        .subscribe({
        next: (response: any) => {
          this.isLoaderOn.set(false);
          // this.alertServ.success("Success"," your mail will receive change password link ");
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
