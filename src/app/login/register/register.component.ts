import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Alumno } from '../../dashboard/models/alumno';
import { AlumnosService } from '../../dashboard/service/alumnos-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
  };
  alumnosList:Alumno[]
  constructor(
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private AlumnosService:AlumnosService
  ) { }

  ngOnInit(
  ): void {
    this.getUsers()
  }
  Registrarse() {
    const { email, password } = this.usuario;

    this.AuthService.register(email, password).then((res) => {
      this.AuthService.login(email, password).then((r) => {
        localStorage.setItem('log', 'true');

        this.alumnosList.forEach((e) => {
          if (r?.user?.email == e.email) {
            localStorage.setItem('reg', 'true');
            console.log(true);

            if (e.admin == true) {
              console.log(true);

              localStorage.setItem('admin', 'true');
            }
          }
        });
        this.router.navigate(['/dashboard']);
      });
    })
  }

  getUsers() {
    this.AlumnosService.getAlumnosList().subscribe((data) => {
      this.alumnosList = data;
    });
  }

}
