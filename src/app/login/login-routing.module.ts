import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginnComponent } from './loginn/loginn.component';
import { RegisterComponent } from './register/register.component';
import { CheckloginlogGuard } from './check-user.guard';

const routes: Routes = [
  {
    path: '',canActivate:[CheckloginlogGuard],
    children: [
      {path: '',component:LoginnComponent},
      {path: 'register',component:RegisterComponent},
      {path:'**', redirectTo:''}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
