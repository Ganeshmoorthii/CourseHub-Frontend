import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'users',
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./users/create-user/create-user.component')
            .then(m => m.UserCreateComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./users/user-profile/user-profile.component')
            .then(m => m.UserProfileComponent)
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./users/user-search/user-search.component')
            .then(m => m.UserSearchComponent)
      },
      {
        path: 'search-results',
        loadComponent: () =>
          import('./users/user-search-result/user-search-result.component')
            .then(m => m.UserSearchResultComponent)
      }
    ]
  },

  {
    path: 'courses/create',
    loadComponent: () =>
      import('./courses/courses.component')
        .then(m => m.CoursesComponent)
  },

  {
    path: 'instructor/create',
    loadComponent: () =>
      import('./instructor/instructor.component')
        .then(m => m.InstructorComponent)
  },

  {
    path: 'enrollments/create',
    loadComponent: () =>
      import('./enrollments/enrollments.component')
        .then(m => m.EnrollmentsComponent)
  }
];
