import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login'; 

// Mark the service as injectable and available throughout the application
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Inject HttpClient to make HTTP requests
  constructor(private httpClient: HttpClient) { }

  // Base URL for the login API endpoint
  private baseUrl = "http://localhost:8080/api/logins";

  // Method to fetch all login credentials from the backend
  getAllLoginCredentials(): Observable<Login[]> {
    return this.httpClient.get<Login[]>(`${this.baseUrl}`);
  }
}
