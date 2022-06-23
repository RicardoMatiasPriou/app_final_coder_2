import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { CheckloginGuardash } from './guards/checklogin.guard';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { AlumnosDetailsComponent } from './pages/alumnos-details/alumnos-details.component';
import { AlumnosNewComponent } from './pages/alumnos-new/alumnos-new.component';
import { CheckRegisterGuard } from './guards/check-register.guard';
import { CheckAdminGuard } from './guards/check-admin.guard';
import { ListComponent } from './pages/cursos/list/list.component';
import { EditComponent } from './pages/cursos/edit/edit.component';
import { NewComponent } from './pages/cursos/new/new.component';
import { AlumnosEditComponent } from './pages/alumnos-edit/alumnos-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

const routes: Routes = [
  {path:'', canActivate:[CheckloginGuardash],component:SidenavComponent,
    children:[
      {path:'', component:AlumnosListComponent},
      {path:'alumnos-list', component:AlumnosListComponent},
      {path:'alumnos-list/:id', component:AlumnosEditComponent},
      {path:'alumnos-new',canActivate:[CheckRegisterGuard], component:AlumnosNewComponent},
      {path:'cursos', component:ListComponent},
      {path:'cursos/edit/:id', component:EditComponent},
      {path:'cursos/new',canActivate:[CheckAdminGuard], component:NewComponent},
      {path:'users', component:UserListComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
