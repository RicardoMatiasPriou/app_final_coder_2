import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/users.model';
import { AuthService } from '../../services/auth.service';
import { Alumno } from '../../dashboard/models/alumno';
import { AlumnosService } from '../../dashboard/service/alumnos-service.service';
@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css'],
})
export class LoginnComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
  };
  alumnosList: Alumno[];

  constructor(
    private AuthService: AuthService,
    private route: Router,
    private AlumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.AuthService.logOut();
    this.getUsers();
  }
  getUsers() {
    this.AlumnosService.getAlumnosList().subscribe((data) => {
      this.alumnosList = data;
    });
  }

  Ingresar() {
    console.log(this.usuario);
    const { email, password } = this.usuario;

    this.AuthService.login(email, password).then((res) => {
      localStorage.setItem('log', 'true');

      this.alumnosList.forEach((e) => {
        if (res?.user?.email == e.email) {
          localStorage.setItem('reg', 'true');

          if (e.admin == true) {
            localStorage.setItem('admin', 'true');
          }
        }

      });
      this.route.navigate(['dashboard']);
    });
  }

  IngresarConGoogle() {
    console.log(this.usuario);
    const { email, password } = this.usuario;

    this.AuthService.loginWhitGoogle(email, password).then((res) => {
      localStorage.setItem('log', 'true');


        this.alumnosList.forEach((e) => {
          if (res?.user?.email == e.email) {
            localStorage.setItem('reg', 'true');
            if (e.admin == true) {
              localStorage.setItem('admin', 'true');
            }
          }
        });

      this.route.navigate(['dashboard']);
    });
  }

  obtnerUsuarioLogeado() {
    this.AuthService.getUserLoged().subscribe((res) => {
      this.route.navigate(['dashboard']);
    });
  }

  logOut() {
    this.AuthService.logOut();
  }
}
