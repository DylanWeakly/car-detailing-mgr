import { Injectable } from '@angular/core';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, user => {
      this.currentUserSubject.next(user);
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}
