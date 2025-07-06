import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AttendanceRecords } from '../attendance-records';  
import { AttendancerecordService } from '../attendancerecord.service';  

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // Set the page title
  title: string = document.title = 'VG - Admin Dashboard';

  // UI state variables
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  currentImage: string = '';  // Holds the image to display in modal

  // Attendance data
  records: AttendanceRecords[] = [];

  // Pagination variables
  totalRecords = 0;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private attendanceRecords: AttendancerecordService
  ) {}

  // Lifecycle hook: called once component is initialized
  ngOnInit(): void {
    this.getRecords();  // Fetch attendance records
  }

  // Fetch attendance records and apply pagination
  getRecords() {
    this.attendanceRecords.getAllRecords().subscribe(
      (data) => {
        this.records = data;
        this.totalRecords = data.length;
        this.updatePagination();  // Calculate total pages

        // Slice data for current page
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.records = data.slice(startIndex, endIndex);

        console.log("Admin Records fetched Successful");
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching records', error);
        this.isLoading = false;
      }
    );
  }

  // Logout function with delay and redirection
  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      console.log("Admin Logout Successful");
      this.router.navigate(['/login']);
    }, 3000);
  }

  // Open modal with selected image
  openImageModal(image: string): void {
    this.currentImage = 'data:image/jpeg;base64,' + image;
    this.isModalOpen = true;
  }

  // Close the image modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Download attendance report as Excel/CSV
  downloadExcel() {
    this.attendanceRecords.downloadExcel().subscribe(
      (response: Blob) => {
        this.attendanceRecords.triggerDownload(response, 'attendance_report.csv');
        console.log("Report Download Success");
      },
      (error) => {
        console.error('Error downloading CSV:', error);
      }
    );
  }

  // Calculate total number of pages
  updatePagination() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  // Navigate to next page
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRecords();  // Refresh records for new page
    }
  }

  // Navigate to previous page
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRecords();  // Refresh records for new page
    }
  }
}
