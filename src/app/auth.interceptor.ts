import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHandlerFn,

} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /* console.log('🔵 Interceptor executed'); // This should print when a request is made
   //const token = localStorage.getItem('token');
   let token = localStorage.getItem('token') || 'eyJ';
   console.log('Interceptor called. Token:----------------', token); // Debugging line
   if (token) {
     req = req.clone({
       setHeaders: {
         'Authorization': 'Bearer ' + token,
       },
     });
     console.log('Authorization header added:---------', req.headers.get('Authorization'));
     // return next(req);
   }
   console.log('No token found, sending request without Authorization header.');
   return next(req);*/
  console.log('🔵 Interceptor executed for URL:', req.url); // Debugging line

  // Skip adding the Authorization header for the login request
  if (req.url.includes('/auth/login')) {
    console.log('🟡 Skipping Authorization header for login request');
    return next(req);
  }

  const token = localStorage.getItem('token');
  console.log('🟢 Token from localStorage:', token); // Debugging line

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ${token}',
      },
    });
    console.log('🟠 Authorization Header Added:', clonedReq.headers.get('Authorization')); // Debugging line
    return next(clonedReq);
  } else {
    console.log('⚠️ No token found, request sent without Authorization header.'); // Debugging line
  }

  return next(req);
};
