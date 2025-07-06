import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription, throttle } from 'rxjs';

// Mark the service as injectable and available throughout the application
@Injectable({
  providedIn: 'root'
})
export class IdleserviceService {

  // Subject to emit idle state changes (true = idle, false = active)
  private idleSubject = new Subject<boolean>();

  // Timeout duration in seconds after which the user is considered idle
  private timeout = 300; // 5 minutes

  // Stores the timestamp of the last user activity
  private lastActivity?: Date;

  // Interval in seconds to check for user idleness
  private idleCheckInterval = 250;

  // Subscription to manage the interval observable
  private idleSubscription?: Subscription;

  // Constructor initializes the timer and starts watching for idleness
  constructor() {
    this.resetTimer();      // Set the initial activity time
    this.startWatching();   // Begin checking for idle state
  }

  // Expose the idle state as an observable for other components to subscribe to
  get idleState(): Observable<boolean> {
    return this.idleSubject.asObservable();
  }

  // Starts the interval that checks if the user has been idle for too long
  private startWatching(): void {
    this.idleSubscription = interval(this.idleCheckInterval * 1000) // Convert interval to milliseconds
      .pipe(throttle(() => interval(1000))) // Throttle to prevent rapid emissions
      .subscribe(() => {
        const now = new Date();

        // If the time since last activity exceeds the timeout, emit idle state
        if (now.getTime() - this.lastActivity?.getTime()! > this.timeout * 1000) {
          this.idleSubject.next(true);
        }
      });
  }

  // Resets the activity timer and emits that the user is active
  resetTimer(): void {
    this.lastActivity = new Date();
    this.idleSubject.next(false);
  }

  // Stops the idle checking interval
  stopWatching(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }
}
