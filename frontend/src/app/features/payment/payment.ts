import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule  } from '@angular/material/button'
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-payment',
  imports: [MatCardModule,
    MatIconModule, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCard, MatIcon, MatButtonModule, RouterModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

}
