import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {
  constructor(private rute:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = localStorage.getItem('reg')

      const isAutenticated = user == 'true' ? false : true;

      if (!isAutenticated) {
        alert('No tienes permisos para acceder a esta paguina');
        this.rute.navigate(['/dashboard']);
      }
    return isAutenticated;
  }

}
