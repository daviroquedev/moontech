import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';


export const routes: Routes = [
  // Rota para a página de login
  { path: 'login', component: LoginComponent },
  
  // Rota para o layout principal (que conterá o simulador)
  // Esta rota é protegida pelo nosso 'authGuard'
  { 
    path: '', 
    component: MainLayoutComponent,
    canActivate: [authGuard]
  },
   {
    path: 'admin/users',
    component: UserManagementComponent,
    canActivate: [authGuard]
  },

  // Redireciona qualquer rota não encontrada para a página principal
  { path: '**', redirectTo: '' }
];
