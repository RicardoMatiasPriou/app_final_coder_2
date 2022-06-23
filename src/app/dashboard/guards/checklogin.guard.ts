import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Routes,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class CheckloginGuardash implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private rutes: Router,
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = localStorage.getItem('log')

    const isAutenticated = user == 'true' ? true : false;

    if (!isAutenticated) {
      alert('tienes que iniciar sesion para ingresar a esta paguina');
      this.rutes.navigate(['/']);
    }

    return isAutenticated;
  }
}
