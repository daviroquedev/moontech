import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AgvMonitorComponent } from './pages/agv-monitor/agv-monitor.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: UserManagementComponent },
      { path: 'agv', component: AgvMonitorComponent },
      { path: 'logs', component: LogsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
