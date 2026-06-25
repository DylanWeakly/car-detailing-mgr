import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  async register() {
    this.errorMessage = '';

    try {
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Account creation failed. Try a stronger password.';
      console.error(error);
    }
  }
}
