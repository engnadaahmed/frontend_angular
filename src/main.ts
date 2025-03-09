import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

console.log('AppConfig:-------------------', appConfig); // Debugging line
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Add provideHttpClient here
    ...appConfig.providers,
  ],

}).catch((err) => console.error(err));
