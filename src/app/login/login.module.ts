import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginnComponent } from './loginn/loginn.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginnComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports:[

  ],
  providers:[

  ]
})
export class LoginModule { }
