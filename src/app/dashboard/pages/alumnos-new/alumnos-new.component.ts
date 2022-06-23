import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../../service/alumnos-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-alumnos-new',
  templateUrl: './alumnos-new.component.html',
  styleUrls: ['./alumnos-new.component.css'],
})
export class AlumnosNewComponent implements OnInit {
  constructor(
    private AlumnosService: AlumnosService,
    private rute: Router,
    private afAuth: AngularFireAuth,
    private AuthService: AuthService
  ) {
    this.afAuth.authState.subscribe((auth) => {
      console.log(auth);
      this.userLogged = auth;
    });

  }
  usuarioRegistrados: boolean;
  alumnosListEmail: string[] = [];
  alumnosList: Alumno[];
  Alumno = {
    id: 0,
    first_name: '',
    last_name: '',
    age: 0,
    img: '',
    cursos_realizados: ['', ''],
  };
  a:any
  userLogged: any;

  ngOnInit(): void {
    this.getUsers()
  }
   getUsers() {
    this.AlumnosService.getAlumnosList().subscribe((data) => {
      this.alumnosList = data;
      this.usuarioRegistrado();

    });
  }
  usuarioRegistrado() {
    setTimeout(() => {
      this.alumnosList.forEach((e) => {
        this.alumnosListEmail.push(e.email);
      });

      this.usuarioRegistrados = this.alumnosListEmail.includes(
        this.userLogged.email
      );
    }, 1000);
  }

  addUser() {
    this.usuarioRegistrado();

    const totalDeUsusarios: number = this.alumnosList.length + 2;
    let user = {
      first_name: this.Alumno.first_name,
      last_name: this.Alumno.last_name,
      age: this.Alumno.age,
      id: totalDeUsusarios,
      img: this.userLogged.photoURL,
      cursos_realizados: [],
      email: this.userLogged.email,
      admin:false
    };
    localStorage.setItem('log', 'true')
    this.AlumnosService.createAlumno(user).subscribe((data) => {
      this.rute.navigate(['/dashboard/alumnos-list']);
      alert('Te registraste con exito');

    });
  }
}
