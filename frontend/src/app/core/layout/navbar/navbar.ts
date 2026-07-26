import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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


export class Navbar {

  constructor(private router: Router, private http: HttpClient , private snackBar: MatSnackBar) {}
  private logoutUrl = `${environment.apiUrl}/auth/logout`;

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onCallNow(): void {
    window.location.href = 'tel:+10000000000';
  }

  onLogIn(): void {
    console.log('Log In clicked');
  }

  onLogout(): void {
  this.http.post<any>(this.logoutUrl, {}, { withCredentials: true }).subscribe({
    next: (res) => {
      // Local storage clear kara
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');

      setTimeout(() => this.showToast('Logged out successfully.', 'success'));

      // Login page var parat pathva
      this.router.navigate(['/login']);
    },
    error: (err) => {
      const message = err?.error?.message || 'Logout failed. Please try again.';
      setTimeout(() => this.showToast(message, 'error'));
      console.error('LOGOUT ERROR:', err.status, err.error);
    }
  });
}

private showToast(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['toast-error'] : ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}