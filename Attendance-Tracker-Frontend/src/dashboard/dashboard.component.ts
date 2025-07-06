import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EmployeeService } from '../employee.service';
import { AttendancerecordService } from '../attendancerecord.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';
import { AttendanceRecords } from '../attendance-records';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // === UI State Variables ===
  title: string = (document.title = 'VG - Dashboard');
  isDashboardVisible: boolean = true;
  isLoading: boolean = false;
  showCamera: boolean = false;
  markin: boolean = false;
  markout: boolean = false;

  // === Employee and Attendance Data ===
  id = Number(localStorage.getItem('someVarKey')); // Get employee ID from local storage
  empName: string = '';
  empEmail: string = '';
  empPosition: string = '';
  empLocation: string = '';
  inTime: string = '';
  inDate: string = '';
  inPhoto: string = '';
  outDate: string = '';
  outTime: string = '';
  outPhoto: string = '';
  totalHours: number = 0;
  inZone: string | null = 'No';
  filterMonth: string = '';
  faceRecognitionError: string = '';
  reference_photo: string = '';

  // === Messages ===
  message: string = '';
  errorMessage: string = '';

  // === Data Models ===
  employee: Employee = new Employee();
  record: AttendanceRecords = new AttendanceRecords();
  records: AttendanceRecords[] = [new AttendanceRecords()];
  updateRecord: AttendanceRecords = new AttendanceRecords();

  // === Date and Time ===
  curDate: Date = new Date();
  date: string = '';
  currentDate: Date = new Date();
  monthIndex: number = this.currentDate.getMonth();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  month: string = this.months[this.monthIndex];
  year: number = this.currentDate.getFullYear();

  // === Constructor with Dependency Injection ===
  constructor(
    private router: Router,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private http: HttpClient,
    private attendanceRepordsService: AttendancerecordService
  ) {}

  // === Lifecycle Hook ===
  ngOnInit() {
    this.passLogin();           // Fetch employee details
    this.getEmployeeRecords();  // Fetch attendance records
  }

  // === Fetch Employee Info ===
  passLogin() {
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
      this.empName = data.employeeName;
      this.empPosition = data.position;
      this.empLocation = data.officeLocation;
      this.empEmail = data.employeeEmail;
    });
  }

  // === Fetch Attendance Records for Employee ===
  getEmployeeRecords() {
    this.attendanceRepordsService
      .getRecordsByIdSortedByDate(this.id)
      .subscribe((data) => {
        this.records = data;
        this.totalRecords = data.length;
        this.updatePagination();
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.records = data.slice(startIndex, endIndex);
      });
  }

  // === Mark In Button Click ===
  onMarkIn(): void {
    this.showCamera = true;
    this.inDate = this.formatDate(this.curDate);
    this.inTime = this.formatTime(this.curDate);
    this.markin = true;
  }

  // === Mark Out Button Click ===
  onMarkOut(): void {
    this.showCamera = true;
    this.outDate = this.formatDate(this.curDate);
    this.outTime = this.formatTime(this.curDate);
    this.markout = true;
  }

  // === Log Time if not already set ===
  logTime(): void {
    const hours = String(this.curDate.getHours()).padStart(2, '0');
    const minutes = String(this.curDate.getMinutes()).padStart(2, '0');
    const seconds = String(this.curDate.getSeconds()).padStart(2, '0');

    if (!this.outTime && !this.outDate) {
      this.inTime = `${hours}:${minutes}:${seconds}`;
      this.inDate = this.formatDate(this.curDate);
    }

    if (!this.inTime && !this.inDate) {
      this.outTime = `${hours}:${minutes}:${seconds}`;
      this.outDate = this.formatDate(this.curDate);
    }
  }

  // === Calculate Total Hours Worked ===
  calculateTotalHours(outTime: string, inTime: string): number {
    const out = outTime.split(':').map(Number);
    const inT = inTime.split(':').map(Number);

    const totalOutSeconds = out[0] * 3600 + out[1] * 60 + out[2];
    const totalInSeconds = inT[0] * 3600 + inT[1] * 60 + inT[2];

    const diffInSeconds = totalOutSeconds - totalInSeconds;
    return diffInSeconds / 3600;
  }

  // === Format Time as HH:MM:SS ===
  formatTime(date: Date): string {
    const hours = String(this.curDate.getHours()).padStart(2, '0');
    const minutes = String(this.curDate.getMinutes()).padStart(2, '0');
    const seconds = String(this.curDate.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // === Format Date as YYYY-MM-DD ===
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // === Prepare and Submit Attendance Record ===
  putDataIntoRecord() {
    this.record.employeeId = this.id;
    this.record.employeeName = this.empName;
    this.record.employeeEmail = this.empEmail;
    this.record.inDate = this.inDate;
    this.record.inTime = this.inTime;
    this.record.inPhoto = this.inPhoto;
    this.record.outDate = '';
    this.record.outTime = '';
    this.record.outPhoto = null;
    this.record.totalHours = 0;
    this.record.inZone = 'No';
    this.date = this.formatDate(this.curDate);

    // Check if record already exists for the day
    this.attendanceRepordsService
      .getRecordbyIdAndInDate(this.id, this.date)
      .subscribe((existingRecord) => {
        if (existingRecord) {
          this.message = '';
          this.errorMessage = 'Record already exists on this date.';
          this.isLoading = false;
          this.resetMessages();
          return;
        }

        // Add new attendance record
        this.attendanceRepordsService
          .addAttendanceRecord(this.record)
          .subscribe(() => {
            this.getEmployeeRecords();
            window.location.reload();
            this.errorMessage = '';
            this.message = 'Successfully Marked In';
            this.isLoading = false;
            this.resetMessages();
          });
      });
  }

  // === Updates an existing attendance record with out-time and out-photo ===
  updateDataIntoRecord(): void {
    this.date = this.formatDate(this.curDate);
    this.attendanceRepordsService
      .getRecordbyIdAndInDate(this.id, this.date)
      .subscribe((data) => {
        if (data.outDate === null) {
          // Populate updateRecord with new out-time and photo
          this.updateRecord = data;
          this.updateRecord.outDate = this.outDate;
          this.updateRecord.outTime = this.outTime;
          this.updateRecord.outPhoto = this.outPhoto;

          // Calculate total hours worked
          let UpdateTotalhours = this.calculateTotalHours(
            this.updateRecord.outTime,
            String(data.inTime)
          );
          this.updateRecord.totalHours = UpdateTotalhours;

          // Mark inZone if hours > 6
          if (UpdateTotalhours > 6) {
            this.updateRecord.inZone = 'YES';
          }

          // Submit the updated record
          this.updateAttendanceRepord(this.id, this.date, this.updateRecord);
          window.location.reload();
        } else {
          this.message = '';
          this.errorMessage = 'Record already exists on this date.';
          this.isLoading = false;
          this.resetMessages();
        }
      });
  }

  // === Sends updated attendance record to the backend ===
  updateAttendanceRepord(id: number, date: string, record: AttendanceRecords) {
    this.attendanceRepordsService
      .updateAttendanceRecord(id, date, record)
      .subscribe(() => {
        this.errorMessage = '';
        this.getEmployeeRecords(); // Refresh records
        this.message = 'Successfully Marked Out';
        this.isLoading = false;
        this.resetMessages();
      });
  }

  // === Converts a captured image Blob to a Base64 string ===
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // === Handles image capture and sends it to Flask for face recognition ===
  onImageCaptured(capturedImage: Blob): void {
    this.convertBlobToBase64(capturedImage)
      .then((base64Image) => {
        const cleanedBase64 = this.cleanBase64String(base64Image);
        const flaskPayload = {
          image: 'data:image/jpeg;base64,' + cleanedBase64
        };

        this.http.post<any>('http://localhost:5000/recognize', flaskPayload).subscribe({
          next: (response) => {
            const isMatched = response.status === 'success';
            const isSpoof = response.spoof === true;
            const empIdFromFace = response.employee_id;

            if (isMatched && !isSpoof && empIdFromFace === this.id) {
              // Valid face match
              if (this.markin) {
                this.inPhoto = cleanedBase64;
                this.closeCameraModal();
                this.putDataIntoRecord();
                this.markin = false;
              } else if (this.markout) {
                this.outPhoto = cleanedBase64;
                this.closeCameraModal();
                this.updateDataIntoRecord();
                this.markout = false;
              }
              this.message = 'Face verified and attendance marked.';
              this.errorMessage = '';
            } else if (isSpoof) {
              this.errorMessage = 'Spoof attempt detected!';
              this.message = '';
              this.closeCameraModal();
            } else {
              this.errorMessage = 'Face not recognized or mismatched.';
              this.message = '';
              this.closeCameraModal();
            }

            this.resetMessages();
          },
          error: (err) => {
            console.error('Flask error:', err);
            this.errorMessage = 'Face verification failed.';
            this.message = '';
            this.closeCameraModal();
            this.resetMessages();
          }
        });
      })
      .catch((error) => {
        console.error('Base64 conversion error:', error);
        this.errorMessage = 'Error capturing image.';
        this.message = '';
        this.resetMessages();
      });
  }

  // === Removes prefix from Base64 string ===
  cleanBase64String(base64String: string): string {
    if (base64String.startsWith('data:image')) {
      return base64String.split(',')[1];
    }
    return base64String;
  }

  // === Closes the camera modal ===
  closeCameraModal() {
    this.showCamera = false;
  }

  // === Clears messages after 2 seconds ===
  resetMessages() {
    setTimeout(() => {
      this.errorMessage = '';
      this.faceRecognitionError = '';
      this.message = '';
    }, 2000);
  }

  // === Show dashboard view ===
  showDashboard() {
    this.passLogin();
    this.isDashboardVisible = true;
  }

  // === Show profile view ===
  showProfile() {
    this.passLogin();
    this.isDashboardVisible = false;
  }

  // === Logout and redirect to login ===
  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 3000);
  }

  // === Pagination Variables ===
  totalPages: number = 0;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;

  // === Calculate total pages ===
  updatePagination() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  // === Go to next page ===
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getEmployeeRecords();
    }
  }

  // === Go to previous page ===
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEmployeeRecords();
    }
  }
}
