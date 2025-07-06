import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoaderComponent } from '../loader/loader.component';
import { CameraComponent } from '../camera/camera.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { TimeFormatPipe } from '../time-format.pipe';
import { HourValidationPipe } from '../hour-validation.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,              // Root component
    LoginComponent,            // Login screen
    DashboardComponent,        // Employee dashboard
    LoaderComponent,           // Loading spinner
    CameraComponent,           // Webcam capture
    AdminDashboardComponent,   // Admin dashboard
    TimeFormatPipe,            // Custom pipe for formatting time
    HourValidationPipe         // Custom pipe for validating hours
  ],
  imports: [
    BrowserModule,             // Required for running in the browser
    AppRoutingModule,          // Routing configuration
    FormsModule                // Template-driven forms support
  ],
  providers: [
    provideHttpClient()        // Provide HTTP client using functional API
  ],
  bootstrap: [AppComponent]    // Bootstrap the root component
})
export class AppModule { }
