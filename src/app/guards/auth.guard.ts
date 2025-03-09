
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access to the route
  } else {
    // Redirect to the login page with the return URL
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Block access to the route
  }
};
