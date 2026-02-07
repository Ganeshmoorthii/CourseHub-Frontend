/**
 * NOTE: This file is for reference on NgRx selector patterns
 * For actual implementation without NgRx, use CourseStateService in src/app/shared/services/course-state.service.ts
 * 
 * If you want to use NgRx in the future:
 * 1. npm install @ngrx/store
 * 2. Import createFeatureSelector and createSelector
 * 3. Create selectors as shown below
 */

/**
 * EXAMPLE: How to create selectors with @ngrx/store
 * 
 * import { createFeatureSelector, createSelector } from '@ngrx/store';
 * 
 * export const selectCourseState = createFeatureSelector('courses');
 * 
 * export const selectAllCourses = createSelector(
 *   selectCourseState,
 *   (state: CourseState) => state.courses
 * );
 * 
 * export const selectCourseLoading = createSelector(
 *   selectCourseState,
 *   (state: CourseState) => state.loading
 * );
 * 
 * export const selectFilteredCourses = createSelector(
 *   selectAllCourses,
 *   selectCourseSearchTerm,
 *   (courses, searchTerm) => {
 *     if (!searchTerm) return courses;
 *     return courses.filter(course =>
 *       course.title.toLowerCase().includes(searchTerm.toLowerCase())
 *     );
 *   }
 * );
 */

// Placeholder file for NgRx selector patterns
export const SELECTOR_EXAMPLES = {
  selectCourseState: 'selectCourseState',
  selectAllCourses: 'selectAllCourses',
  selectCourseLoading: 'selectCourseLoading',
  selectCourseError: 'selectCourseError',
  selectSelectedCourse: 'selectSelectedCourse',
  selectFilteredCourses: 'selectFilteredCourses',
  selectCourseStats: 'selectCourseStats'
};
