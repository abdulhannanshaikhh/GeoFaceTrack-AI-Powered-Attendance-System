import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdleserviceService } from '../idleservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // Set the page title
  title: string = document.title = "GeoFaceTrack";

  // Subscription to track idle state
  private idleSubscription?: Subscription;

  constructor(
    private idleService: IdleserviceService,  // Inject idle detection service
    private router: Router                    // Inject router for navigation
  ) {}

  // Called when component is initialized
  ngOnInit(): void {
    // Subscribe to idle state changes
    this.idleSubscription = this.idleService.idleState.subscribe((isIdle) => {
      if (isIdle) {
        console.log("User is Idle");
        console.log("Moving back to login");
        this.router.navigate(['/login']);  // Redirect to login on idle
      }
    });
  }

  // Called on any user interaction to reset the idle timer
  onUserAction(): void {
    this.idleService.resetTimer();
  }

  // Clean up subscription when component is destroyed
  ngOnDestroy(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }
}
