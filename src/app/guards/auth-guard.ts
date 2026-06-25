import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return new Promise<boolean | ReturnType<Router['createUrlTree']>>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();

      if (user) {
        resolve(true);
      } else {
        resolve(router.createUrlTree(['/login']));
      }
    });
  });
};
