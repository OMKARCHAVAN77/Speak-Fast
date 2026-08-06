import { AlertService } from './../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { StudentService } from './../../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-link-sent',
  imports: [CommonModule,],
  templateUrl: './link-sent.html',
  styleUrl: './link-sent.css',
})
export class LinkSent implements OnInit{
  time = signal('01:30');
  email!:String|null;
  private totalSeconds = 90;
  isResendDisabled = true;

  constructor(private frogotstudentserve :StudentService, private route: Router, private alertServ: AlertService) {
    this.startTimer();
  }

  ngOnInit(): void {
      if(localStorage.getItem('status')){
        localStorage.removeItem('status');
        this.route.navigate(['/login']);
      }
  }




  startTimer() {
    this.totalSeconds = 90;
    this.isResendDisabled = true;
    const timer = setInterval(() => {

      if (this.totalSeconds > 0) {
        this.totalSeconds--;

        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;

        this.time.set(
          `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        );
      }

      // Timer finished
      if (this.totalSeconds === 0) {
        clearInterval(timer);
        this.isResendDisabled = false; // Enable the link
      }

    }, 1000);
  }

  resendLink(){
    let Payload = { email: this.frogotstudentserve.getEmailForgotPass() };
    console.log(Payload);
    this.frogotstudentserve
        .forgotStudentPassword(Payload)
        .subscribe({
        next: (response: any) => {
          console.log("mail sent once again...",Payload);

          this.alertServ.tosterInfo('link sent again on your email');
        },

        error: (_error: Error)=>{
                    // this.isLoaderOn.set(false);
          // this.alertServ.error("","please try after some time...");
          this.alertServ.tosterUnsuccess('try after some time')
        }
      })
  }
}
