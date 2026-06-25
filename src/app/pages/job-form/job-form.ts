import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../services/job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.scss'
})
export class JobFormComponent {
  job = {
    customerName: '',
    vehicle: '',
    serviceType: '',
    dateCompleted: '',
    price: 0,
    notes: ''
  };

  isSaving = false;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  async saveJob(): Promise<void> {
    this.isSaving = true;
    this.errorMessage = '';

    try {
      await this.jobService.addJob(this.job);
      await this.router.navigate(['/jobs']);
    } catch (error) {
      this.errorMessage = 'Could not save job. Make sure you are logged in.';
      console.error(error);
    } finally {
      this.isSaving = false;
    }
  }
}
