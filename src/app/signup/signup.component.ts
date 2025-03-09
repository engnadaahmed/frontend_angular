import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userData = {
    fullName: '',
    email: '',
    password: '',

  };

  message = ''; // To display success or error messages
  isSuccess = false; // To toggle message styling
  details: string[] = [];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }



  onloginClick() {

    this.router.navigate(['/login']);
  }

  onSubmit() {

    this.authService.signup(this.userData).subscribe({
      next: (response) => {
        this.message = 'Signup successful! Redirecting to login...';
        this.isSuccess = true;

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // Handle backend validation errors
        if (err.status === 400 && err.error) {
          this.message = err.error.message;
          this.details = err.error.details || [];
        } else {
          this.message = 'Signup failed. Please try again.';
          this.details = [];
        }
        this.isSuccess = false;
      },
    });
  }

}
