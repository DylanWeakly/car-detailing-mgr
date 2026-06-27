import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { JobListComponent } from './pages/job-list/job-list';
import { JobFormComponent } from './pages/job-form/job-form';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobListComponent, canActivate: [authGuard] },
  { path: 'add-job', component: JobFormComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
