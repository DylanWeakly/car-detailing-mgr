import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  async login() {
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Login failed. Check your email and password.';
      console.error(error);
    }
  }
}
