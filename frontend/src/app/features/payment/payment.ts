import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/services/course-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

  // constructor(private courseserve : CourseService){}

  // teacherName = 'Priya Sharma';
  // courseName = 'PREMIUM PLAN';

  // courseFee = 15000;
  // discount = 3000;

  // get totalAmount(): number {
  //   return this.courseFee - this.discount;
  // }

  // onPaymentDone(): void {
  //   console.log('Payment marked as done');
  // }

  teacherName = 'Priya Sharma';

  constructor(private courseService: CourseService) {}

  get plan() {
    return this.courseService.getPlan();
  }

  get courseName(): string {
    return this.plan?.name || '';
  }

  get courseFee(): number {
    return this.plan?.originalPrice || 0;
  }

  get discountAmount(): number {
    const price = (this.plan as any)?.price ?? 0;
    return (this.plan?.originalPrice || 0) - price;
  }

  get totalAmount(): number {
    return (this.plan as any)?.price || 0;
  }

  onPaymentDone(): void {
    console.log('Payment Done');
  }

}