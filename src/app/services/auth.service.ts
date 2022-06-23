import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import { AlumnosService } from '../dashboard/service/alumnos-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afauth: AngularFireAuth, private AlumnosService:AlumnosService) {}

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error en login:', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error en login:', error);
      return null;
    }
  }

  async loginWhitGoogle(email: string, password: string) {
    try {
      return await this.afauth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log('Error en login con google:', error);
      return null;
    }
  }

   getUserLoged() {
    return this.afauth.authState;
  }

  logOut() {
    this.afauth.signOut();
    localStorage.clear()

  }
  authStateAdmin() {
    setTimeout(() => {
      const user =     this.afauth.authState.subscribe((auth) => {
        console.log(auth);
      });;
        console.log(user)
        return

    }, 800);
  }



}
