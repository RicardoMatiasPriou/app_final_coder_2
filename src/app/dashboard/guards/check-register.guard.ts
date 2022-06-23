import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckRegisterGuard implements CanActivate {
  constructor(private rute:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('reg')

    const isAutenticated = user == 'true' ? false : true;

    if (!isAutenticated) {
      alert('Ya estas registrado');
      this.rute.navigate(['/dashboard']);
    }

    return isAutenticated;
  }
  }
