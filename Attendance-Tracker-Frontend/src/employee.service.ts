import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // This service is available application-wide
})
export class EmployeeService {

  // Base URL for the employee-related API endpoints
  private baseUrl = "http://localhost:8080/api/employees";

  // Inject HttpClient to perform HTTP requests
  constructor(private httpClient: HttpClient) { }

  // Fetch all employees from the backend
  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
  }

  // Fetch a specific employee by their ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }
}
