import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { StudentService } from '../../../../core/services/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  constructor(private frogotstudentapiserve: StudentService){}

   emailVal: string = '';

  resetPassword(){
    const body = {
      email : this.emailVal
    }
    this.frogotstudentapiserve.forgotStudentPassword(body).subscribe((data : any)=>{
      console.log(data);
    })
    console.log(this.emailVal);
  }
}
