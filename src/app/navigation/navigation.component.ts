import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Add RouterOutlet here
  template: `
    <router-outlet></router-outlet>
  `,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Change background after 50px scroll
  }
  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        // Clear local storage or session storage (if used)
        localStorage.removeItem('token');
        // Redirect to login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
