import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface NavLink {
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})


export class Navbar {

  
  navLinks: NavLink[] = [
    { label: 'Home', active: true },
    { label: 'Teachers', active: false },
    { label: 'Courses', active: false },
    { label: 'Grammar Test', active: false }
  ];

  onNavClick(clicked: NavLink): void {
    this.navLinks.forEach(link => (link.active = link === clicked));
  }

  onCallNow(): void {
    window.location.href = 'tel:+10000000000';
  }

  onLogIn(): void {
    console.log('Log In clicked');
  }

}





