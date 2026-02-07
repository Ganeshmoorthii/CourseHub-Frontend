import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject, of, interval } from 'rxjs';
import { takeUntil, delay, startWith, map, take } from 'rxjs/operators';

/**
 * Component demonstrating subscription management patterns
 * Shows proper cleanup to avoid memory leaks
 */
@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h3>Subscription Management Patterns</h3>

      <!-- Pattern 1: Manual Subscription Management -->
      <div class="card mb-3">
        <div class="card-header">Pattern 1: Manual Subscriptions</div>
        <div class="card-body">
          <p><strong>Users:</strong></p>
          <ul>
            <li *ngFor="let user of users">
              {{ user.name }} ({{ user.email }})
            </li>
          </ul>
          <button class="btn btn-sm btn-primary" (click)="loadUsers()">
            Load Users
          </button>
        </div>
      </div>

      <!-- Pattern 2: Async Pipe (No Manual Cleanup) -->
      <div class="card mb-3">
        <div class="card-header">Pattern 2: Async Pipe (Auto Cleanup)</div>
        <div class="card-body">
          <p><strong>Countdown:</strong> {{ countdown$ | async }}</p>
          <button class="btn btn-sm btn-primary" (click)="startCountdown()">
            Start Countdown
          </button>
        </div>
      </div>

      <!-- Pattern 3: takeUntil Pattern -->
      <div class="card mb-3">
        <div class="card-header">Pattern 3: takeUntil Pattern</div>
        <div class="card-body">
          <p><strong>Message:</strong> {{ delayedMessage }}</p>
          <button class="btn btn-sm btn-primary" (click)="loadMessage()">
            Load Message
          </button>
        </div>
      </div>

      <!-- Pattern 4: Subject Emissions -->
      <div class="card mb-3">
        <div class="card-header">Pattern 4: Subject Usage</div>
        <div class="card-body">
          <p><strong>User Count:</strong> {{ userCount }}</p>
          <input type="number" [(ngModel)]="newCount" class="form-control mb-2" />
          <button class="btn btn-sm btn-primary" (click)="updateCount()">
            Update Count
          </button>
        </div>
      </div>

      <!-- Subscription Status -->
      <div class="alert alert-info">
        <strong>Active Subscriptions:</strong> {{ activeSubscriptions }} / 
        <strong>Completed:</strong> {{ completedSubscriptions }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
    }
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class SubscriptionManagementComponent implements OnInit, OnDestroy {
  users: any[] = [];
  countdown$: any;
  delayedMessage = '';
  userCount = 0;
  newCount = 0;
  activeSubscriptions = 0;
  completedSubscriptions = 0;

  // Pattern 1: Manual subscriptions array
  private subscriptions: Subscription[] = [];

  // Pattern 3: Subject for unsubscribe
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    // Removed service calls to avoid import issues
    console.log('Subscription Management Component initialized');
  }

  /**
   * Pattern 1: Manual subscription management
   * Add to array and unsubscribe in ngOnDestroy
   */
  loadUsers(): void {
    const subscription = of([
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ]).subscribe({
      next: (users: any[]) => {
        this.users = users;
        console.log('Users loaded:', users);
      },
      error: (err: any) => console.error('Error loading users:', err),
      complete: () => console.log('Users loading complete')
    });

    // Store subscription for cleanup
    this.subscriptions.push(subscription);
    this.trackSubscription();
  }

  /**
   * Pattern 2: Using async pipe (handles cleanup automatically)
   * No manual subscription needed
   */
  startCountdown(): void {
    this.countdown$ = interval(1000).pipe(
      startWith(10),
      map((i: number) => 10 - i),
      take(11)
    );
  }

  /**
   * Pattern 3: takeUntil pattern (modern approach)
   * Unsubscribes when destroy$ emits
   */
  loadMessage(): void {
    of('Hello from delayed observable!')
      .pipe(
        delay(2000),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (msg: string) => {
          this.delayedMessage = msg;
          console.log('Message:', msg);
        },
        error: (err: any) => console.error('Error:', err),
        complete: () => console.log('Message observable complete')
      });

    this.trackSubscription();
  }

  /**
   * Pattern 4: Using Subjects
   */
  updateCount(): void {
    this.userCount = this.newCount;
    console.log('User count updated:', this.newCount);
  }

  /**
   * Helper: Track active subscriptions
   */
  private trackSubscription(): void {
    this.activeSubscriptions = this.subscriptions.filter(s => !s.closed).length;
    this.completedSubscriptions = this.subscriptions.filter(s => s.closed).length;
  }

  /**
   * CRITICAL: Cleanup on component destroy
   * Pattern 1: Unsubscribe from all manual subscriptions
   */
  ngOnDestroy(): void {
    console.log('Component destroyed - cleaning up subscriptions');
    
    // Manual cleanup
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    // takeUntil cleanup (emit to trigger unsubscription)
    this.destroy$.next();
    this.destroy$.complete();
  }
}
