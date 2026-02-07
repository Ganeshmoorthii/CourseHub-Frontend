/**
 * Simple State Management Service (Alternative to NgRx)
 * Demonstrates state management principles without NgRx dependency
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Course State Interface
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrolledCount: number;
  createdDate: Date;
}

export interface CourseState {
  courses: Course[];
  totalCount: number;
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CourseStateService {
  private initialState: CourseState = {
    courses: [],
    totalCount: 0,
    selectedCourse: null,
    loading: false,
    error: null
  };

  private courseStateSubject = new BehaviorSubject<CourseState>(this.initialState);
  courseState$: Observable<CourseState> = this.courseStateSubject.asObservable();

  constructor() {}

  /**
   * Get all courses
   */
  getCourses(): Observable<Course[]> {
    return new Observable(observer => {
      observer.next(this.courseStateSubject.value.courses);
      observer.complete();
    });
  }

  /**
   * Load courses
   */
  loadCourses(courses: Course[]): void {
    const currentState = this.courseStateSubject.value;
    this.courseStateSubject.next({
      ...currentState,
      courses,
      totalCount: courses.length,
      loading: false,
      error: null
    });
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    const currentState = this.courseStateSubject.value;
    this.courseStateSubject.next({
      ...currentState,
      loading
    });
  }

  /**
   * Set error
   */
  setError(error: string | null): void {
    const currentState = this.courseStateSubject.value;
    this.courseStateSubject.next({
      ...currentState,
      error
    });
  }

  /**
   * Add course
   */
  addCourse(course: Course): void {
    const currentState = this.courseStateSubject.value;
    this.courseStateSubject.next({
      ...currentState,
      courses: [...currentState.courses, course],
      totalCount: currentState.totalCount + 1
    });
  }

  /**
   * Delete course
   */
  deleteCourse(id: string): void {
    const currentState = this.courseStateSubject.value;
    this.courseStateSubject.next({
      ...currentState,
      courses: currentState.courses.filter(c => c.id !== id),
      totalCount: currentState.totalCount - 1
    });
  }

  /**
   * Select course
   */
  selectCourse(id: string): void {
    const currentState = this.courseStateSubject.value;
    const selected = currentState.courses.find(c => c.id === id) || null;
    this.courseStateSubject.next({
      ...currentState,
      selectedCourse: selected
    });
  }

  /**
   * Get current state
   */
  getCurrentState(): CourseState {
    return this.courseStateSubject.value;
  }

  /**
   * Reset state
   */
  resetState(): void {
    this.courseStateSubject.next(this.initialState);
  }
}
