import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSearchStateService } from '../services/user-search-state.service';

@Component({
  standalone: true,
  selector: 'app-user-search-result',
  imports: [CommonModule],
  templateUrl: './user-search-result.component.html'
})
export class UserSearchResultComponent implements OnInit {

  users: any[] = [];
  totalCount = 0;

  constructor(
    private searchState: UserSearchStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const result = this.searchState.getResult();

    if (!result) {
      this.router.navigate(['/users/search']);
      return;
    }

    this.users = result.items;
    this.totalCount = result.totalCount;
  }
}
