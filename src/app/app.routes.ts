import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: '',
        component: NavigationComponent, // Use shared layout for all routes except login
        children: [

            { path: 'home', component: HomeComponent, canActivate: [authGuard] },
            { path: 'movies', component: HomeComponent, canActivate: [authGuard] },
            { path: 'movies/:id', component: MovieDetailsComponent, canActivate: [authGuard] },
        ],
    },
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', component: LoginComponent },


];
