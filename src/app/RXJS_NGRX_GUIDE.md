# RxJS & NgRx Complete Guide

## Table of Contents
1. [RxJS Basics](#rxjs-basics)
2. [Observables](#observables)
3. [Subjects](#subjects)
4. [Subscriptions](#subscriptions)
5. [Async Pipe](#async-pipe)
6. [NgRx Fundamentals](#ngrx-fundamentals)
7. [Complete Examples](#complete-examples)

---

## RxJS Basics

RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs using observable sequences.

### Key Concepts
- **Reactive Programming**: Think in terms of data flows and transformations
- **Observables**: Represent async data streams
- **Operators**: Transform, filter, combine observables
- **Subscriptions**: Connect to observable streams

---

## Observables

An Observable is a lazy collection of multiple values over time.

### Creating Observables

```typescript
// From array
import { from } from 'rxjs';
const observable = from([1, 2, 3]);

// From promise
const promise = new Promise(resolve => resolve('data'));
const observable = from(promise);

// Using Observable constructor
const observable = new Observable(observer => {
  observer.next('value1');
  observer.next('value2');
  observer.complete();
});

// Interval
import { interval } from 'rxjs';
const observable = interval(1000); // Emit every 1 second

// Timer
import { timer } from 'rxjs';
const observable = timer(2000); // Emit after 2 seconds
```

### Key Characteristics
- **Lazy**: Don't execute until subscribed
- **Cancellable**: Can unsubscribe anytime
- **Multiple Values**: Emit many values over time
- **Error Handling**: Can emit errors

### Common Operators

```typescript
import { map, filter, take, delay, tap } from 'rxjs/operators';

// map: Transform values
observable.pipe(map(x => x * 2));

// filter: Keep only matching values
observable.pipe(filter(x => x > 5));

// take: Take only first N values
observable.pipe(take(3));

// delay: Delay emission
observable.pipe(delay(1000));

// tap: Side effects (logging)
observable.pipe(tap(x => console.log(x)));

// Chaining operators
observable.pipe(
  filter(x => x > 5),
  map(x => x * 2),
  take(3),
  tap(x => console.log(x))
);
```

---

## Subjects

A Subject is both an Observable and an Observer. It broadcasts values to multiple subscribers.

### Types of Subjects

#### 1. Subject (Basic)
```typescript
const subject = new Subject<string>();

// Subscribe
subject.subscribe(value => console.log('Sub1:', value));
subject.subscribe(value => console.log('Sub2:', value));

// Emit
subject.next('Hello'); // Both subscribers receive 'Hello'

// Note: Late subscribers won't get previous values
subject.next('World');
```

**Use Case**: Event emitting, real-time updates

#### 2. BehaviorSubject
```typescript
const subject = new BehaviorSubject<number>(0); // Requires initial value

subject.subscribe(value => console.log('Sub1:', value)); // Immediately receives 0
subject.next(5);

// Late subscriber gets last value (5)
subject.subscribe(value => console.log('Sub2:', value)); // Immediately receives 5

// Get current value synchronously
const current = subject.getValue(); // 5
```

**Use Case**: State management, settings, user preferences

#### 3. ReplaySubject
```typescript
const subject = new ReplaySubject<string>(3); // Replay last 3 values

subject.next('A');
subject.next('B');
subject.next('C');
subject.next('D');

// Late subscriber gets last 3 values: B, C, D
subject.subscribe(value => console.log('Sub:', value));
```

**Use Case**: Caching recent data, recovery

#### 4. AsyncSubject
```typescript
const subject = new AsyncSubject<string>();

subject.subscribe(value => console.log('Sub:', value));
subject.next('A');
subject.next('B');
subject.next('C');
subject.complete(); // Only then emits last value

// Output: Only 'C' is emitted
```

**Use Case**: One-time operations, completion signals

---

## Subscriptions

A Subscription represents a disposable resource, typically the execution of an Observable.

### Manual Subscription Management

```typescript
// Bad: Memory Leak
@Component({...})
export class MyComponent implements OnInit {
  ngOnInit() {
    this.observable.subscribe(value => {
      this.data = value;
    });
    // Never unsubscribed!
  }
}

// Good: Manual unsubscribe
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    const sub = this.observable.subscribe(value => {
      this.data = value;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

// Even Better: Subscription object with add()
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.observable1.subscribe(...)
    );
    this.subscriptions.add(
      this.observable2.subscribe(...)
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Unsubscribes all
  }
}
```

### Unsubscription Patterns

#### Pattern 1: takeUntil (Recommended)
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.observable
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => this.data = value);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**Why it's good:**
- Clean, composable pattern
- Works with multiple subscriptions
- Declarative

#### Pattern 2: Async Pipe (Best for templates)
```typescript
// No manual subscription needed!
data$ = this.dataService.getData();

// In template:
// {{ data$ | async }}
```

#### Pattern 3: First Operator
```typescript
this.observable
  .pipe(first())
  .subscribe(value => console.log(value));
// Automatically unsubscribes after first value
```

---

## Async Pipe

The async pipe subscribes to an Observable/Promise and returns its latest value.

### Benefits
1. **Automatic unsubscription** - No memory leaks
2. **Automatic subscription** - Less boilerplate
3. **Change detection** - Marks component for check
4. **Works with OnPush** - More efficient change detection

### Usage Examples

```html
<!-- Simple value -->
<div>{{ data$ | async }}</div>

<!-- With loading state -->
<div *ngIf="(data$ | async) as data; else loading">
  <p>{{ data.name }}</p>
</div>
<ng-template #loading>
  <p>Loading...</p>
</ng-template>

<!-- Multiple async pipes -->
<div>Name: {{ user$ | async | name }}</div>
<div>Email: {{ user$ | async | email }}</div>

<!-- With arrays and ngFor -->
<ul>
  <li *ngFor="let item of items$ | async">{{ item }}</li>
</ul>

<!-- Chaining operators before async pipe -->
<div>{{ (search$ | async) }}</div>
```

### Performance Note
Multiple `| async` pipes create multiple subscriptions. Optimize with:

```typescript
// Instead of:
<div>{{ user$ | async | name }}</div>
<div>{{ user$ | async | email }}</div>

// Do this:
<ng-container *ngIf="user$ | async as user">
  <div>{{ user.name }}</div>
  <div>{{ user.email }}</div>
</ng-container>
```

---

## NgRx Fundamentals

NgRx is a state management library for Angular based on Redux pattern.

### Core Concepts

#### 1. Store
Central state container. Read-only, accessed through selectors.

```typescript
// Inject store
constructor(private store: Store) {}

// Select state
this.store.select(selectCourses).subscribe(courses => {
  console.log(courses);
});

// Dispatch action
this.store.dispatch(loadCourses({ pageNumber: 1, pageSize: 10 }));
```

#### 2. Actions
Events that describe what happened. Dispatched to update state.

```typescript
// Creating actions
export const loadCourses = createAction(
  '[Course Page] Load Courses',
  props<{ pageNumber: number; pageSize: number }>()
);

export const loadCoursesSuccess = createAction(
  '[Course API] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesError = createAction(
  '[Course API] Load Courses Error',
  props<{ error: string }>()
);

// Dispatching
this.store.dispatch(loadCourses({ pageNumber: 1, pageSize: 10 }));
```

**Convention**: `[Source] Event Description`
- Source: Where action originates (Page, API, etc.)
- Description: What happened

#### 3. Reducer
Pure function that takes current state + action → new state

```typescript
const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialState,

  on(loadCourses, (state) => ({
    ...state,
    loading: true
  })),

  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),

  on(loadCoursesError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
```

**Rules**:
- Must be pure (same input → same output)
- No side effects
- No async operations
- Immutable updates

#### 4. Selectors
Memoized functions that select state slices. Used to read state.

```typescript
// Feature selector
export const selectCourseState = 
  createFeatureSelector<CourseState>('courses');

// Simple selector
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

// Composed selector
export const selectFilteredCourses = createSelector(
  selectAllCourses,
  selectSearchTerm,
  (courses, searchTerm) => 
    courses.filter(c => 
      c.title.includes(searchTerm)
    )
);

// Using selector
this.store.select(selectAllCourses).subscribe(courses => {
  console.log(courses);
});
```

### Unidirectional Data Flow

```
Component Dispatch Action
        ↓
    Action
        ↓
    Reducer (Pure function)
        ↓
    New State
        ↓
    Selectors
        ↓
Component Receives New State
```

---

## Complete Examples

### Example 1: Observable Service Usage

**Service**:
```typescript
@Injectable({ providedIn: 'root' })
export class CourseService {
  getCourses(page: number): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/courses?page=${page}`)
      .pipe(
        delay(1000), // Simulate network delay
        tap(courses => console.log('Courses loaded:', courses)),
        catchError(error => {
          console.error('Error loading courses:', error);
          return throwError(() => new Error('Failed to load courses'));
        })
      );
  }
}
```

**Component**:
```typescript
@Component({...})
export class CourseListComponent implements OnInit, OnDestroy {
  courses$ = new Observable<Course[]>();
  loading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(1);
  }

  loadCourses(page: number): void {
    this.loading$.next(true);
    this.courses$ = this.courseService.getCourses(page)
      .pipe(
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Template**:
```html
<div *ngIf="loading$ | async; else content">
  Loading...
</div>

<ng-template #content>
  <div *ngFor="let course of courses$ | async">
    {{ course.title }}
  </div>
</ng-template>
```

### Example 2: Subject for Component Communication

```typescript
// Service
@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  search(term: string): void {
    this.searchSubject.next(term);
  }
}

// Component 1: Search input
@Component({...})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  onSearch(term: string): void {
    this.searchService.search(term);
  }
}

// Component 2: Results
@Component({...})
export class SearchResultsComponent implements OnInit {
  results$: Observable<any[]>;

  constructor(
    private searchService: SearchService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.results$ = this.searchService.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.courseService.search(term))
      );
  }
}
```

### Example 3: NgRx Store Usage

**Setup app.config.ts**:
```typescript
import { provideStore } from '@ngrx/store';
import { courseReducer } from './store/reducers/course.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      courses: courseReducer
    })
  ]
};
```

**Component**:
```typescript
@Component({...})
export class CourseListComponent implements OnInit {
  courses$ = this.store.select(selectAllCourses);
  loading$ = this.store.select(selectCourseLoading);
  error$ = this.store.select(selectCourseError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCourses({ pageNumber: 1, pageSize: 10 }));
  }

  onCourseSelect(id: string): void {
    this.store.dispatch(selectCourse({ id }));
  }
}
```

**Template**:
```html
<div *ngIf="loading$ | async" class="spinner">Loading...</div>

<div *ngIf="error$ | async as error" class="alert alert-danger">
  {{ error }}
</div>

<div *ngFor="let course of courses$ | async" (click)="onCourseSelect(course.id)">
  {{ course.title }}
</div>
```

---

## Best Practices

1. **Always unsubscribe**: Use `takeUntil` pattern or async pipe
2. **Use Selectors**: Don't access state directly
3. **Keep Reducers Pure**: No side effects, no async
4. **Use Effects for Side Effects**: (Advanced - Effects middleware)
5. **Type Everything**: Use TypeScript for safety
6. **Memoize Selectors**: Use `createSelector` for performance
7. **Error Handling**: Always handle observable errors
8. **Share Subscriptions**: Use `shareReplay()` when appropriate

---

## Troubleshooting

### Memory Leak: Observable Never Completes
```typescript
// Bad - never completes
this.observable.subscribe(...);

// Good - completes on destroy
this.observable.pipe(takeUntil(this.destroy$)).subscribe(...);

// Or use async pipe
{{ observable$ | async }}
```

### State Not Updating
```typescript
// Bad - mutating state
state.courses.push(newCourse);

// Good - immutable update
{ ...state, courses: [...state.courses, newCourse] }
```

### Stale Data in Component
```typescript
// Bad
data = this.service.getData();

// Good - updates automatically
data$ = this.service.getData();
```

---

## Resources

- [RxJS Official Documentation](https://rxjs.dev)
- [NgRx Official Documentation](https://ngrx.io)
- [Angular State Management Guide](https://angular.io/guide/rx-library)
- [Reactive Programming Guide](https://reactivex.io)
