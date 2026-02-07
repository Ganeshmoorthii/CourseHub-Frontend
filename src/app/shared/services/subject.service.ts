import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject, AsyncSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Service demonstrating RxJS Subjects
 * Subjects act as both Observable and Observer
 */
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  /**
   * Subject: Basic subject (hot observable)
   * Emits values to current subscribers only
   * Lost values if no one is subscribed
   */
  private userSearchSubject = new Subject<string>();
  userSearch$ = this.userSearchSubject.asObservable().pipe(
    tap(term => console.log('Search term:', term))
  );

  /**
   * BehaviorSubject: Requires initial value
   * Replays last emitted value to new subscribers
   * Great for state management
   */
  private userCountSubject = new BehaviorSubject<number>(0);
  userCount$ = this.userCountSubject.asObservable().pipe(
    tap(count => console.log('User count:', count))
  );

  /**
   * ReplaySubject: Buffers and replays specified number of values
   * New subscribers get the last N emitted values
   */
  private notificationSubject = new ReplaySubject<string>(3); // Replay last 3
  notification$ = this.notificationSubject.asObservable().pipe(
    tap(msg => console.log('Notification:', msg))
  );

  /**
   * AsyncSubject: Only emits last value when completed
   * Great for one-time operations
   */
  private completionSubject = new AsyncSubject<string>();
  completion$ = this.completionSubject.asObservable().pipe(
    tap(msg => console.log('Completion:', msg))
  );

  constructor() {
    // Initialize BehaviorSubject with default value
    this.userCountSubject.next(0);
  }

  /**
   * Emit search term
   */
  searchUsers(term: string): void {
    this.userSearchSubject.next(term);
  }

  /**
   * Update user count
   */
  updateUserCount(count: number): void {
    this.userCountSubject.next(count);
  }

  /**
   * Get current user count (synchronous)
   */
  getCurrentUserCount(): number {
    return this.userCountSubject.getValue();
  }

  /**
   * Emit notification
   */
  notify(message: string): void {
    this.notificationSubject.next(message);
  }

  /**
   * Emit final completion value
   */
  complete(message: string): void {
    this.completionSubject.next(message);
    this.completionSubject.complete();
  }

  /**
   * Get BehaviorSubject reference (for advanced usage)
   */
  getUserCountSubject(): BehaviorSubject<number> {
    return this.userCountSubject;
  }
}
