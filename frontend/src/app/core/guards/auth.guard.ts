import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o serviço de autenticação disser que o usuário está logado, permita o acesso.
  if (authService.isLoggedIn()) {
    return true;
  }

  // Se não, redirecione para a página de login e bloqueie a rota atual.
  router.navigate(['/login']);
  return false;
};
