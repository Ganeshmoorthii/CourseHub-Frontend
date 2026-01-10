import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
