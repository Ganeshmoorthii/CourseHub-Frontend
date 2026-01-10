import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSearchComponent } from './users/user-search/user-search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Coursehub-Frontend';
}
