import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthS } from "../services/auth-s";

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthS);

  //Simulation d'une vérification d'authentification
  const isAuth: boolean = authService.getCurrentStatus();

  if(isAuth){
    return true;
  }

  //Navigation
  router.navigate(['/auth/login',
    {
      queryParams:{
        returnUrl: state.url,
        message: "Vous devez être connecté pour accéder à cette page."
      }
    }
  ]);
  return false;
};
