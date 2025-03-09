import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private signupUrl = 'http://localhost:8080/auth/signup';
  logout(): Observable<any> {


    return this.http.post(this.logoutUrl, {}, { responseType: 'text' });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  signup(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData).pipe(
      catchError((error: HttpErrorResponse) => {

        return throwError(error);
      })
    );
  }
}
