import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSearchStateService } from '../services/user-search-state.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-search.component.html'
})
export class UserSearchComponent {

  searchForm: FormGroup;
  private http = inject(HttpClient);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchState: UserSearchStateService
  ) {
    this.searchForm = this.fb.group({
      id: [''],
      userName: [''],
      email: [''],
      dateOfBirth: [''],
      instructorName: [''],
      courseTitle: [''],
      priceFrom: [''],
      priceTo: [''],
      enrolledFrom: [''],
      enrolledTo: [''],
      page: [1],
      pageSize: [10]
    });
  }

  onSearch(): void {
    const payload = this.cleanPayload(this.searchForm.value);

    this.http.post<any>('https://localhost:7055/api/User/search', payload)
      .subscribe({
        next: res => {
          this.searchState.setResult(res.data);

          this.router.navigate(['/users/search-results']);
        },
        error: err => {
          console.error('Search error:', err);
        }
      });
  }

  onReset(): void {
    this.searchForm.reset({ page: 1, pageSize: 10 });
  }

  private cleanPayload(data: any) {
    return Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== null && v !== '')
    );
  }
}
