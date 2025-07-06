import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Page title
  title: string = (document.title = 'GeoFaceTrack - Login');

  // Form input fields
  userName: string = '';
  password: string = '';
  role: string = 'employee'; // Default role

  // Error messages
  errorMessage: string = '';
  userMessage: string = '';
  passwordMessage: string = '';
  roleMessage: string = '';

  // UI state flags
  isLoading: boolean = false;
  showModal: boolean = false;

  // === Security Configuration ===
  readonly allowedIPs: string[] = ['167.103.6.197']; // Allowed IPs for login
  readonly officeLat = 12.966890902442197; // Office latitude
  readonly officeLon = 77.72338258580153; // Office longitude
  readonly maxDistanceMeters = 100; // Max allowed distance from office

  constructor(
    private loginService: LoginService,
    private adminService: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  // === Central login entrypoint === 
  onLoginEvaluate() {
    this.resetMessages();

    // Validate input fields
    if (!this.userName) {
      this.userMessage = 'Enter the Username';
      this.resetMessages();
    } else if (!this.password) {
      this.passwordMessage = 'Enter the Password';
      this.resetMessages();
    } else if (!this.role) {
      this.roleMessage = 'Select Role';
      this.resetMessages();
    } else {
      // Verify IP and location before proceeding
      this.verifyNetworkAndLocation().then((valid) => {
        if (!valid) return;
        this.isLoading = true;

        // Route to appropriate login method
        if (this.role === 'employee') this.employeeLogin();
        else if (this.role === 'admin') this.adminLogin();
      });
    }
  }

  // === Employee Login ===
  private employeeLogin() {
    this.loginService.getAllLoginCredentials().subscribe(
      (data) => {
        // Find matching user
        const user = data.find(
          (user) =>
            this.userName.toLowerCase() === user.employeeId.toString() &&
            this.password === user.corpId
        );

        if (user) {
          // Store user info and navigate to dashboard
          localStorage.setItem('someVarKey', this.userName);
          setTimeout(() => {
            console.log('Employee Login Successful');
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          // Invalid credentials
          this.errorMessage = 'Wrong User Name or Password';
          this.isLoading = false;
          this.resetMessages();
        }
      },
      (error) => {
        // API error
        this.errorMessage = 'An error occurred. Please try again later.';
        this.isLoading = false;
        this.resetMessages();
      }
    );
  }

  // === Admin Login ===
  private adminLogin() {
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        // Find matching admin
        const user = data.find(
          (user) =>
            this.userName === user.adminId.toString() &&
            this.password === user.password
        );

        if (user) {
          // Navigate to admin dashboard
          setTimeout(() => {
            console.log('Admin Login Successful');
            this.router.navigate(['/adminDashboard']);
          }, 1000);
        } else {
          // Invalid credentials
          this.errorMessage = 'Wrong User Name or Password';
          this.isLoading = false;
          this.resetMessages();
        }
      },
      error: (error) => {
        // API error
        this.errorMessage = 'An error occurred. Please try again later.';
        this.isLoading = false;
        this.resetMessages();
      },
    });
  }

  // === Reset error messages after delay ===
  private resetMessages() {
    setTimeout(() => {
      this.userMessage = '';
      this.passwordMessage = '';
      this.roleMessage = '';
      this.errorMessage = '';
    }, 2000);
  }

  // === Modal toggle methods ===
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

  // === Fetch public IP address ===
  private getPublicIP(): Promise<string> {
    return this.http
      .get<any>('https://api.ipify.org?format=json')
      .toPromise()
      .then((res) => res.ip);
  }

  // === Get user's current GPS location ===
  private getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      });
    });
  }

  // === Calculate distance from office using Haversine formula ===
  private getDistanceFromOffice(lat: number, lon: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (this.officeLat * Math.PI) / 180;
    const φ2 = (lat * Math.PI) / 180;
    const Δφ = ((lat - this.officeLat) * Math.PI) / 180;
    const Δλ = ((lon - this.officeLon) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // === Verify both IP and GPS location ===
  private async verifyNetworkAndLocation(): Promise<boolean> {
    try {
      const ip = await this.getPublicIP();
      if (!this.allowedIPs.includes(ip)) {
        this.errorMessage = 'Access denied: Unauthorized network.';
        return false;
      }

      const position = await this.getCurrentLocation();
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const distance = this.getDistanceFromOffice(userLat, userLon);
      if (distance > this.maxDistanceMeters) {
        this.errorMessage = 'Access denied: Outside office area.';
        return false;
      }
      return true;
    } catch (err) {
      this.errorMessage = 'Could not verify location or network.';
      return false;
    }
  }
}
