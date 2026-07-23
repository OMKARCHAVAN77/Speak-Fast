import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { StudentProcess } from './features/students/student-achievement/student-process/student-process';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
// import { Teachers } from './features/teachers/teachers';
// import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
// import { Questions } from './features/grammer/questions/questions';
// import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
// import { Home } from './features/dashboard/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  isNavbarOn: boolean= true;
  hideUrls: string[]=["/","/login","/forgotPassword/resetpassword","/forgotPassword/sentLink","/forgotPassword/confirmPassword","/forgotPassword/passwordChanged"]

  constructor(private actRout: ActivatedRoute, private route: Router){}

  ngOnInit(): void {
      console.log("router url is ",this.actRout.snapshot.url)
      this.route.events.pipe(filter(x=>x instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        //  this.isNavbarOn = !this.hiddenRoutes.includes(event.urlAfterRedirects);
             if( this.hideUrls.includes(event.url)  ){
              this.isNavbarOn= false;
              console.log(this.isNavbarOn);
             }else{
              this.isNavbarOn=true;
             }


         }
      )



  }

}


