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

interface NavLink {
  label: string;
  active: boolean;
}

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

  constructor(private router: Router, private http: HttpClient , private snackBar: MatSnackBar,private toaster: ToastrService, private route: Router) {}
  private logoutUrl = `${environment.apiUrl}/auth/logout`;
  isLoggedin= signal<boolean>(false);
  // isMenuOpen = false;

  ngOnInit(): void {
      const role = localStorage.getItem('role');
      const token= localStorage.getItem('token');

      console.log(role," ",token);

      console.log("value of status",!!token);
      this.isLoggedin.set(!!token);
  }






  onLogIn():void{
      this.route.navigate(['login']);

  }


  onLogout(): void {

      this.toaster.success(
        'You have been logged out successfully.',
        'Success'
      );
    setTimeout(()=>{
     localStorage.removeItem('token');
    localStorage.removeItem('roles');

    this.isLoggedin.set(false);


    this.router.navigate(['teachers']);
    },2000)

  }

}
