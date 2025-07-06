import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service available application-wide
})
export class AdminService {

  // Base URL for the admin API endpoint
  private baseUrl = "http://localhost:8080/api/admins";

  // Inject HttpClient for making HTTP requests
  constructor(private httpClient: HttpClient) { }

  // Fetches all admin records from the backend
  getAllAdmins(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(`${this.baseUrl}`);
  } 
}
