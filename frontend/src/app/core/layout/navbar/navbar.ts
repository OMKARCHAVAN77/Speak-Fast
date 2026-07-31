import { TokenService } from './../../services/token.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { filter, single } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

// interface NavLink {
//   label: string;
//   active: boolean;
// }

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterModule,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})


export class Navbar implements OnInit {

  constructor(private router: Router, private http: HttpClient ,
               private snackBar: MatSnackBar,private toaster: ToastrService,
               private route: Router,private tokenServ: TokenService) {}
  private logoutUrl = `${environment.apiUrl}/auth/logout`;
  isLoggedin= signal<boolean>(false);
  isTeachersOn= signal<boolean>(true);
  // isMenuOpen = false;
  //  hideUrls: string[]=["/","/teachers"]

  ngOnInit(): void {
      const role = this.tokenServ.getRoles();
      const token= this.tokenServ.getToken();

      // console.log(role,"token is -- ",token);

      // console.log("value of status",!!token);
      this.isLoggedin.set(!!token);

      // console.log("value of login",this.isLoggedin())

      // if(this.isLoggedin()){
      //         this.route.events
      //   .pipe(filter(event => event instanceof NavigationEnd))
      //   .subscribe((event: NavigationEnd) => {
      //     const url = event.urlAfterRedirects;
      //     console.log(url)
      //     const hideNavbar =
      //       url === '/' ||
      //       url === '/teachers'

      //     this.isTeachersOn.set(hideNavbar);
      //   });
      // }
  }


  onLogIn():void{
      this.route.navigate(['login']);

  }


  onLogout(): void {

      this.toaster.success(
        'You have been logged out successfully.',
        'Success'
      );


        this.tokenServ.removeToken();

        this.isLoggedin.set(false);


        this.router.navigate(['teachers']);


  }

}
