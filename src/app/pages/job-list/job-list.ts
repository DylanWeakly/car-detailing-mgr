import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-list',
  imports: [CommonModule],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  isDeleting = false;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadJobs();
  }

  async loadJobs(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    let timeoutId: ReturnType<typeof setTimeout>;

    try {
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('Loading jobs timed out.'));
        }, 10000);
      });

      this.jobs = await Promise.race([
        this.jobService.getJobs(),
        timeout
      ]);
    } catch (error) {
      this.errorMessage = 'Could not load jobs. Check your internet connection or browser extensions.';
      console.error(error);
    } finally {
      clearTimeout(timeoutId!);
      this.isLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  async deleteJob(id?: string): Promise<void> {
    if (!id) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await this.jobService.deleteJob(id);
      await this.loadJobs();
    } catch (error) {
      this.errorMessage = 'Could not delete job.';
      console.error(error);
    } finally {
      this.isDeleting = false;
      this.changeDetectorRef.detectChanges();
    }
  }
}
