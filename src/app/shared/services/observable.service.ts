import { Injectable } from '@angular/core';
import { Observable, interval, timer, of, from, throwError } from 'rxjs';
import { map, filter, delay, take, tap, catchError, startWith, shareReplay } from 'rxjs/operators';

/**
 * Service demonstrating RxJS Observables
 * Shows various ways to create and manipulate observables
 */
@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  /**
   * Example 1: Create observable from array
   */
  getUsers(): Observable<any> {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
    return from(users).pipe(
      delay(1000), // Simulate API call
      tap((user: any) => console.log('Processing user:', user))
    );
  }

  /**
   * Example 2: Observable with interval
   * Emits values continuously at intervals
   */
  getCountdown(startValue: number = 10): Observable<number> {
    return interval(1000).pipe(
      startWith(startValue),
      map((i: number) => startValue - i),
      take(startValue + 1),
      tap((value: number) => console.log('Countdown:', value))
    );
  }

  /**
   * Example 3: Observable with timer
   * Emits after delay then completes
   */
  getDelayedMessage(message: string, delayMs: number = 2000): Observable<string> {
    return timer(delayMs).pipe(
      map(() => message),
      tap((msg: string) => console.log('Message received:', msg))
    );
  }

  /**
   * Example 4: Observable with filtering
   */
  getEvenNumbers(maxNumber: number = 20): Observable<number> {
    return from(Array.from({ length: maxNumber }, (_, i: number) => i + 1)).pipe(
      filter((num: number) => num % 2 === 0),
      tap((num: number) => console.log('Even number:', num))
    );
  }

  /**
   * Example 5: Observable with error handling
   */
  getDataWithError(shouldFail: boolean = false): Observable<string> {
    if (shouldFail) {
      return throwError(() => new Error('Data fetch failed!'));
    }
    return of('Data loaded successfully!').pipe(
      delay(1000),
      tap((msg: string) => console.log('Success:', msg))
    );
  }

  /**
   * Example 6: Shared observable (cached)
   * Multiple subscriptions share the same source
   */
  getSharedData(): Observable<number> {
    return interval(1000).pipe(
      take(5),
      tap((value: number) => console.log('Data emitted:', value)),
      shareReplay(1) // Share and replay last value
    );
  }

  /**
   * Example 7: Taking specific number of emissions
   */
  getLimitedEmissions(limit: number = 3): Observable<number> {
    return interval(500).pipe(
      take(limit),
      tap((value: number) => console.log('Emission:', value))
    );
  }

  /**
   * Example 8: Observable from promise
   */
  getFromPromise(): Observable<string> {
    const promise = new Promise<string>((resolve: (value: string) => void) => {
      setTimeout(() => resolve('Promise resolved!'), 2000);
    });
    return from(promise).pipe(
      tap((msg: string) => console.log('Promise result:', msg))
    );
  }
}
