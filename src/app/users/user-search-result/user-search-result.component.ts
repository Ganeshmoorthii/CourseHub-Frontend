import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSearchStateService } from '../services/user-search-state.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HighlightOnHoverDirective } from '../../shared/directives/highlight-on-hover.directive';

@Component({
  standalone: true,
  selector: 'app-user-search-result',
  imports: [CommonModule, MatSlideToggleModule, HighlightOnHoverDirective],
  templateUrl: './user-search-result.component.html'
})
export class UserSearchResultComponent implements OnInit {

  users: any[] = [];
  totalCount = 0;
  selectedUserName: string | null = null;

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
  onBackToSearch(): void {
    this.router.navigate(['/users/search']);
  }

  onRowClick(userName: string): void {
    this.selectedUserName = userName;
    console.log(`Selected user: ${userName}`);
  }
}
