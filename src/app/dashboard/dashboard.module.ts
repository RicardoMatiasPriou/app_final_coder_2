import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosListComponent, DialogOverviewExampleDialog } from './pages/alumnos-list/alumnos-list.component';
import { AlumnosNewComponent } from './pages/alumnos-new/alumnos-new.component';
import { AlumnosEditComponent } from './pages/alumnos-edit/alumnos-edit.component';
import { NewComponent } from './pages/cursos/new/new.component';
import { EditComponent } from './pages/cursos/edit/edit.component';
import { ListComponent, DialogOverviewExampleDialog } from './pages/cursos/list/list.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { MaterialModule } from '../material/material.module';
import { AlumnosDetailsComponent } from './pages/alumnos-details/alumnos-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlumnosListComponent,
    AlumnosNewComponent,
    AlumnosEditComponent,
    NewComponent,
    EditComponent,
    ListComponent,
    SidenavComponent,
    AlumnosDetailsComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog
  ],
  imports: [
    MaterialModule,
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class DashboardModule { }
