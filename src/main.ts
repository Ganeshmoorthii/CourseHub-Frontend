import { bootstrapApplication } from '@angular/platform-browser';
import '@angular/compiler'; // Add this line
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
