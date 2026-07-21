import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-password',
  imports: [MatIcon,CommonModule],
  templateUrl: './confirm-password.html',
  styleUrl: './confirm-password.css',
})
export class ConfirmPassword {

    showPassword:boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}
}
