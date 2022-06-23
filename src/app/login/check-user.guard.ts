
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CheckloginlogGuard implements CanActivate {
  constructor(private afAuth:AngularFireAuth, private rutes:Router){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean| UrlTree> {
      const user = await this.afAuth.currentUser;
      const isAutenticated = user? true:false
      const isAutenticated1= !isAutenticated
      if(!isAutenticated1){
        alert ('tienes que cerrar la sesion para ingresar a esta pagina')
        // this.rutes.navigate(['/dashboard'])

      }

      return isAutenticated1;
  }

}
