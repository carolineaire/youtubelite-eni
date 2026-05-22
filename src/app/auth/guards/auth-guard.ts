import { inject } from '@angular/core';
import {CanActivateChildFn,Router,UrlTree} from '@angular/router';
import { AuthS } from '../services/auth-s';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthS);

  return authService.isLoggedIn$.pipe(
    take(1),
    map((isAuth): boolean | UrlTree => {
      if (isAuth) {
        return true;
      }

      return router.createUrlTree(['/login'], {
        queryParams: {
          returnUrl: state.url,
          message:
            'Vous devez être connecté pour accéder à cette page.',
        },
      });
    })
  );
};