import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  totalJobs = 0;
  totalRevenue = 0;

  constructor(private jobService: JobService) {}

  async ngOnInit(): Promise<void> {
    const jobs = await this.jobService.getJobs();

    this.totalJobs = jobs.length;
    this.totalRevenue = await this.jobService.getTotalRevenue();
  }
}
