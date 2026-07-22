import { RouterModule } from '@angular/router';
import { RouterOutlet } from "@angular/router";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule,CommonModule,MatCommonModule,],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

}
