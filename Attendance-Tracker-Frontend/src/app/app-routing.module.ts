import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

// Define application routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root path to login
  { path: 'app', component: AppComponent },              // Route for main app component
  { path: 'login', component: LoginComponent },          // Route for login page
  { path: 'dashboard', component: DashboardComponent },  // Route for employee dashboard
  { path: 'adminDashboard', component: AdminDashboardComponent }, // Route for admin dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register routes with the router
  exports: [RouterModule]                  // Export router module for use in app
})
export class AppRoutingModule {
  // Routing module class (no additional logic needed here)
}
