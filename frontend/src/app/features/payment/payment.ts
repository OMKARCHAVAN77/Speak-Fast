import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { RouterLink, RouterModule } from "@angular/router";

interface OrderSummary {
  teacherName: string;
  courseName: string;
  courseFee: number;
  discount: number;
  totalAmount: number;
}

@Component({
  selector: 'app-payment',
  imports: [MatCardModule,
    MatIconModule, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCard, MatIcon, MatButtonModule, RouterModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

  order: OrderSummary = {
    teacherName: 'Priya Sharma',
    courseName: 'PREMIUM PLAN',
    courseFee: 15000,
    discount: 3000,
    totalAmount: 12000
  };

  howToPaySteps: string[] = [
    'Open any UPI app on your phone (Google Pay, PhonePe, etc.)',
    'Tap on "Scan QR Code" option',
    'Scan the QR code displayed above',
    `Verify the amount (₹${(15000 - 3000).toLocaleString('en-IN')}) and complete payment`,
    'Click "Payment Done" button below after successful payment'
  ];

  onPaymentDone(): void {
    // Hook up your payment confirmation logic here
    console.log('Payment marked as done');
  }

  formatCurrency(value: number): string {
    return `₹${value.toLocaleString('en-IN')}`;
  }
}
