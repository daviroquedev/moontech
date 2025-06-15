import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_KEY } from '../constants/storage.constants';

// A boa prática é manter a chave do token num ficheiro de constantes partilhado,
// mas para simplicidade, vamos defini-la aqui.
const TOKEN_KEY = 'auth_token';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Já não injetamos o AuthService. Obtemos o token diretamente do localStorage.
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  // A lógica permanece a mesma: se houver um token, anexa-o.
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }

  return next(req);
};
