import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CheckloginlogGuard } from './login/check-user.guard';
import { FormpruevaComponent } from './formprueva/formprueva.component';

const routes: Routes = [
  { path: ''  ,component: LandingComponent,canActivate:[CheckloginlogGuard], },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path:'dashboard', loadChildren:()=>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: 'll'  ,component: FormpruevaComponent },


];
@Injectable({providedIn:'root'})
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
