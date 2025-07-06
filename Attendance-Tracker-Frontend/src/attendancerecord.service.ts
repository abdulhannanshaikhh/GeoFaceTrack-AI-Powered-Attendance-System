import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceRecords } from './attendance-records';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class AttendancerecordService {

  // Base URLs for different API endpoints
  private baseUrl = "http://localhost:8080/api/records";
  private sortedBaseUrl = "http://localhost:8080/api/records/sorted";
  private exportExcelBaseUrl = "http://localhost:8080/api/export-csv";

  constructor(private httpClient: HttpClient) { }

  // Fetch all attendance records
  getAllRecords(): Observable<AttendanceRecords[]> {
    return this.httpClient.get<AttendanceRecords[]>(`${this.baseUrl}`);
  }

  // Fetch records by employee ID
  getRecordsById(id: number): Observable<AttendanceRecords[]> {
    return this.httpClient.get<AttendanceRecords[]>(`${this.baseUrl}/${id}`);
  }

  // Fetch a specific record by employee ID and in-date
  getRecordbyIdAndInDate(id: number, inDate: string): Observable<AttendanceRecords> {
    return this.httpClient.get<AttendanceRecords>(`${this.baseUrl}/${id}/${inDate}`);
  }

  // Fetch records sorted by date for a specific employee
  getRecordsByIdSortedByDate(id: number): Observable<AttendanceRecords[]> {
    return this.httpClient.get<AttendanceRecords[]>(`${this.sortedBaseUrl}/${id}`);
  }

  // Add a new attendance record
  addAttendanceRecord(record: AttendanceRecords): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, record);
  }

  // Update an existing attendance record
  updateAttendanceRecord(id: number, inDate: string, record: AttendanceRecords): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}/${inDate}`, record);
  }

  // Download attendance records as a CSV file
  downloadExcel(): Observable<Blob> {
    return this.httpClient.get<Blob>(this.exportExcelBaseUrl, { responseType: 'blob' as 'json' });
  }

  // Trigger browser download for a Blob file
  triggerDownload(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob); // Create a temporary URL for the blob
    const a = document.createElement('a');        // Create a hidden anchor element
    a.style.display = 'none';
    a.href = url;
    a.download = filename;                        // Set the desired file name
    document.body.appendChild(a);
    a.click();                                    // Trigger the download
    window.URL.revokeObjectURL(url);              // Clean up the URL object
  }
}
