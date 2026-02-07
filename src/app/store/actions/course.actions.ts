/**
 * NOTE: This file is for reference on NgRx action patterns
 * For actual implementation without NgRx, use CourseStateService in src/app/shared/services/course-state.service.ts
 * 
 * If you want to use NgRx in the future:
 * 1. npm install @ngrx/store @ngrx/effects
 * 2. Import createAction and props
 * 3. Create and dispatch actions as shown below
 */

/**
 * EXAMPLE: How to create actions with @ngrx/store
 * 
 * import { createAction, props } from '@ngrx/store';
 * 
 * // Course Actions
 * export const loadCourses = createAction(
 *   '[Course Page] Load Courses',
 *   props<{ pageNumber: number; pageSize: number }>()
 * );
 * 
 * export const loadCoursesSuccess = createAction(
 *   '[Course API] Load Courses Success',
 *   props<{ courses: Course[]; totalCount: number }>()
 * );
 * 
 * export const loadCoursesError = createAction(
 *   '[Course API] Load Courses Error',
 *   props<{ error: string }>()
 * );
 * 
 * export const selectCourse = createAction(
 *   '[Course Page] Select Course',
 *   props<{ id: string }>()
 * );
 */

// Placeholder file for NgRx action patterns
export const COURSE_ACTIONS = {
  loadCourses: '[Course Page] Load Courses',
  loadCoursesSuccess: '[Course API] Load Courses Success',
  loadCoursesError: '[Course API] Load Courses Error',
  selectCourse: '[Course Page] Select Course',
  addCourse: '[Course Page] Add Course',
  addCourseSuccess: '[Course API] Add Course Success',
  addCourseError: '[Course API] Add Course Error',
  deleteCourse: '[Course Page] Delete Course',
  deleteCourseSuccess: '[Course API] Delete Course Success',
  deleteCourseError: '[Course API] Delete Course Error',
  loadUsers: '[User Page] Load Users',
  loadUsersSuccess: '[User API] Load Users Success',
  loadUsersError: '[User API] Load Users Error',
  filterUsers: '[User Page] Filter Users',
  setLoading: '[App] Set Loading',
  setError: '[App] Set Error',
  clearError: '[App] Clear Error'
};
