import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const apiUrl = 'http://localhost:8080/auth/login'; // Replace with your Spring Boot API URL

    this.http.post(apiUrl, this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Save the token or user data in local storage or a service
        localStorage.setItem('token', response.token);

        // Redirect to the home page or dashboard
        // this.router.navigate(['/home']);
        //  Small delay before redirecting
        // setTimeout(() => {
        //   this.router.navigate(['/home']);
        // }, 100); // Wait 100ms to ensure token is stored
        // Verify token is saved before redirecting
        const savedToken = localStorage.getItem('token');
        console.log('Token retrieved from localStorage:', savedToken); // Debugging line
        // Redirect to the home page or the return URL
        const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
  onSignupClick() {

    this.router.navigate(['/signup']);
  }
}
