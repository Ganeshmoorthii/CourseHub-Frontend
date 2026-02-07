import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, of } from 'rxjs';
import { map, delay, startWith } from 'rxjs/operators';

/**
 * Component demonstrating async pipe
 * The async pipe automatically subscribes to observables and handles cleanup
 */
@Component({
  selector: 'app-async-pipe-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Async Pipe Demo</h3>

      <!-- Basic Observable -->
      <div class="card mb-3">
        <div class="card-header">Basic Observable (No async pipe - manual subscription)</div>
        <div class="card-body">
          <p><strong>Message:</strong> {{ manualMessage }}</p>
          <button class="btn btn-sm btn-primary" (click)="loadManualMessage()">
            Load Message
          </button>
        </div>
      </div>

      <!-- Async Pipe Example 1: Simple Observable -->
      <div class="card mb-3">
        <div class="card-header">Async Pipe: Simple Observable</div>
        <div class="card-body">
          <p><strong>Delayed Message:</strong> {{ delayedMessage$ | async }}</p>
          <button class="btn btn-sm btn-primary" (click)="delayedMessage$ = createDelayedMessage()">
            Load Message
          </button>
        </div>
      </div>

      <!-- Async Pipe Example 2: With Loading State -->
      <div class="card mb-3">
        <div class="card-header">Async Pipe: With Loading State</div>
        <div class="card-body">
          <div *ngIf="(dataWithLoading$ | async) as data; else loading">
            <p><strong>Data:</strong> {{ data }}</p>
          </div>
          <ng-template #loading>
            <p class="text-muted">Loading...</p>
          </ng-template>
          <button class="btn btn-sm btn-primary" (click)="dataWithLoading$ = createDataWithLoading()">
            Load Data
          </button>
        </div>
      </div>

      <!-- Async Pipe Example 3: Multiple Async Pipes -->
      <div class="card mb-3">
        <div class="card-header">Multiple Async Pipes</div>
        <div class="card-body">
          <p><strong>Current Time:</strong> {{ currentTime$ | async | date:'HH:mm:ss' }}</p>
          <p><strong>Count:</strong> {{ count$ | async }}</p>
        </div>
      </div>

      <!-- Async Pipe Example 4: With BehaviorSubject -->
      <div class="card mb-3">
        <div class="card-header">Async Pipe with BehaviorSubject</div>
        <div class="card-body">
          <p><strong>User Count (from BehaviorSubject):</strong> {{ userCount$ | async }}</p>
          <input type="number" class="form-control mb-2" 
                 [value]="userCount$ | async"
                 (change)="onUserCountChange($event)" />
        </div>
      </div>

      <!-- Async Pipe Example 5: Array with ngFor -->
      <div class="card mb-3">
        <div class="card-header">Async Pipe with Arrays</div>
        <div class="card-body">
          <ul>
            <li *ngFor="let num of evenNumbers$ | async">
              {{ num }}
            </li>
          </ul>
          <button class="btn btn-sm btn-primary" (click)="loadEvenNumbers()">
            Load Even Numbers
          </button>
        </div>
      </div>

      <!-- Benefits Summary -->
      <div class="alert alert-success">
        <strong>Benefits of Async Pipe:</strong>
        <ul class="mb-0">
          <li>✓ Automatic subscription management</li>
          <li>✓ Automatic unsubscription on component destroy</li>
          <li>✓ Reduces boilerplate code</li>
          <li>✓ Triggers change detection</li>
          <li>✓ Works with OnPush change detection</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
    }
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AsyncPipeDemoComponent implements OnInit {
  // Manual subscription (NOT using async pipe)
  manualMessage = '';

  // Async pipe examples
  delayedMessage$: Observable<string> | null = null;
  dataWithLoading$: Observable<string> | null = null;
  currentTime$!: Observable<Date>;
  count$!: Observable<number>;
  userCount$!: Observable<number>;
  evenNumbers$: Observable<number[]> | null = null;

  ngOnInit(): void {
    console.log('AsyncPipeDemoComponent initialized');
    // Initialize observables
    this.currentTime$ = interval(1000).pipe(
      startWith(new Date()),
      map(() => new Date())
    );

    this.count$ = interval(1000).pipe(
      startWith(0),
      map((i: number) => i + 1)
    );

    this.userCount$ = of(0);
  }

  /**
   * Manual subscription example (NOT using async pipe)
   * Requires manual cleanup
   */
  loadManualMessage(): void {
    of('Manually loaded message!')
      .pipe(delay(2000))
      .subscribe((msg: string) => {
        this.manualMessage = msg;
        console.log('Manual message:', msg);
      });
  }

  /**
   * Create delayed message observable for async pipe
   */
  createDelayedMessage(): Observable<string> {
    return of('This message is displayed via async pipe!').pipe(
      delay(1500)
    );
  }

  /**
   * Create data observable with simulated loading
   */
  createDataWithLoading(): Observable<string> {
    return of('Data loaded successfully!').pipe(
      delay(2000)
    );
  }

  /**
   * Load even numbers
   */
  loadEvenNumbers(): void {
    this.evenNumbers$ = new Observable(observer => {
      observer.next([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
      observer.complete();
    });
  }

  /**
   * Handle user count change
   */
  onUserCountChange(event: any): void {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount)) {
      console.log('User count changed to:', newCount);
    }
  }
}
