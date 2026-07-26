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
  constructor(private frogotstudentserve: StudentService, private snackBar: MatSnackBar, private router: Router){}

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


  resetPassword(){

  if(!this.emailVal){

    this.snackBar.open(

      "Please enter your email",

      "Close",

      {

        duration:3000,

        horizontalPosition:"right",

        verticalPosition:"top"

      }

    );

    return;

  }

  const body={

    email:this.emailVal

  };

  this.frogotstudentserve

  .forgotStudentPassword(body)

  .subscribe({

    next:(response: any)=>{

      console.log(response);

      this.snackBar.open(

        response.message,

        "Close",

        {

          duration:3000,

          panelClass:["success-snackbar"]

        }

      );

      this.router.navigate(

        ["/forgotPassword/sentLink"]

      );

    },

    error:(err: any)=>{

      console.log(err);

      this.snackBar.open(

        err.error.message,

        "Close",

        {

          duration:3000,

          panelClass:["error-snackbar"]

        }

      );

    }

  });

}
}
