import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { LogsComponent } from './pages/logs/logs.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component:  UserManagementComponent,
    canActivate: [authGuard]
  },
   {
    path: 'agv',
    component: MainLayoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'logs',
    component: LogsComponent, 
    canActivate: [authGuard]
  },
  {
    path: '**', 
    redirectTo: '' 
  }
];
