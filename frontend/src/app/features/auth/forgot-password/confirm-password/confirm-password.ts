import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-confirm-password',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirm-password.html',
  styleUrl: './confirm-password.css',
})
export class ConfirmPassword {

    showPassword:boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}
}
