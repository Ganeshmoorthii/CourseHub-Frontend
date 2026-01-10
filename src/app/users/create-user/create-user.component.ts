import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './create-user.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserCreateComponent {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  get passwordMismatch(): boolean {
    const { password, confirmPassword } = this.userForm.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid || this.passwordMismatch) {
      return;
    }

    const payload = {
      userName: this.userForm.value.userName,
      email: this.userForm.value.email,
      passwordHash: this.userForm.value.password,
    };

    this.http.post('https://localhost:7055/api/User', payload).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('User creation failed', err),
    });
  }

  onReset() {
    this.userForm.reset();
    this.submitted = false;
  }
}
