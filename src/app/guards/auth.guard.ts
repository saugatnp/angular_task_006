import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * 
 * @param route current route
 * @param state  current state
 * @returns checks if the token is still valid and returns true else returns false
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // TODO : check for token validity
  if (true) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }
};