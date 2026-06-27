import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function waitForAuthState(): Promise<User | null> {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
}

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const user = await waitForAuthState();

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};
