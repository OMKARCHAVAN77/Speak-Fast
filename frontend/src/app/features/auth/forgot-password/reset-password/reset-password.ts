import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { StudentService } from '../../../../core/services/student.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  constructor(private frogotstudentserve: StudentService, private snackBar: MatSnackBar, private router: Router) { }

  emailVal: string = '';

  // resetPassword(){
  //   const body = {
  //     email : this.emailVal
  //   }
  //   this.frogotstudentserve.forgotStudentPassword(body).subscribe((data : any)=>{
  //     console.log(data);
  //   })
  //   console.log(this.emailVal);
  // }



  resetPassword() {

    if (!this.emailVal.trim()) {

      this.snackBar.open(
        "Please enter your email.",
        "Close",
        {
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"]
        }
      );

      return;
    }

    const body = {
      email: this.emailVal.trim()
    };

    this.frogotstudentserve
      .forgotStudentPassword(body)
      .subscribe({

        next: (response: any) => {

          console.log("Forgot Password Success :", response);

          this.snackBar.open(
            response.message,
            "Close",
            {
              duration: 4000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["success-snackbar"]
            }
          );

          // Snackbar पूर्ण दिसल्यानंतरच Navigate करा
          setTimeout(() => {

            this.router.navigate([
              "/forgotPassword/sentLink"
            ]);

          }, 4000);

        },

        error: (err: any) => {

          console.log("Forgot Password Error :", err);

          this.snackBar.open(
            err?.error?.message || "Something went wrong.",
            "Close",
            {
              duration: 4000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["error-snackbar"]
            }
          );
        }
      });

  }
}
