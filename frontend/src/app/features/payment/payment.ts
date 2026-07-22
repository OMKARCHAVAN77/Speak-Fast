import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  teacherName = 'Priya Sharma';
  courseName = 'PREMIUM PLAN';

  courseFee = 15000;
  discount = 3000;

  get totalAmount(): number {
    return this.courseFee - this.discount;
  }

  onPaymentDone(): void {
    // Hook this up to your payment confirmation logic
    console.log('Payment marked as done');
  }
}