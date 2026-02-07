/**
 * NOTE: This file is for reference on NgRx reducer patterns
 * For actual implementation, use CourseStateService in src/app/shared/services/course-state.service.ts
 * 
 * If you want to use NgRx in the future:
 * 1. npm install @ngrx/store @ngrx/effects
 * 2. Import createReducer, on, createAction, props
 * 3. Create actions, reducers, and selectors as shown below
 */

/**
 * Course State Interface (Reference)
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
  searchTerm: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export interface UIState {
  loading: boolean;
  error: string | null;
}

export interface AppState {
  courses: CourseState;
  users: UserState;
  ui: UIState;
}

/**
 * EXAMPLE: How to create reducer with @ngrx/store
 * 
 * import { createReducer, on } from '@ngrx/store';
 * import * as CourseActions from '../actions/course.actions';
 * 
 * const initialState: CourseState = {
 *   courses: [],
 *   totalCount: 0,
 *   selectedCourse: null,
 *   loading: false,
 *   error: null,
 *   searchTerm: ''
 * };
 * 
 * export const courseReducer = createReducer(
 *   initialState,
 *   on(CourseActions.loadCourses, (state: CourseState) => ({
 *     ...state,
 *     loading: true,
 *     error: null
 *   })),
 *   on(CourseActions.loadCoursesSuccess, (state: CourseState, { courses, totalCount }: any) => ({
 *     ...state,
 *     courses,
 *     totalCount,
 *     loading: false,
 *     error: null
 *   }))
 * );
 */

/**
 * Helper function: Filter users by search term (Reference)
 */
export function filterUsersBySearchTerm(users: User[], searchTerm: string): User[] {
  if (!searchTerm) return users;
  return users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
