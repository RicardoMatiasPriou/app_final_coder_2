import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { CursoServiceService } from '../../../service/curso-service.service';
import { curso } from '../../../models/curso';
import { AuthService } from '../../../../services/auth.service';
import { Alumno } from '../../../models/alumno';
import { AlumnosService } from '../../../service/alumnos-service.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  register = localStorage.getItem('reg') == 'true' ? false : true;
  name: string;
  animal: boolean;
  data: curso;
  alumnosList: curso[];
  displayedColumns: string[] = ['name', 'duracion', 'a_inscriptos', 'actions'];
  admin = localStorage.getItem('admin') == 'true' ? true : false;
  alumnoActual: Alumno;
  cursosRegistrados: number[] = [];

  constructor(
    private usersService: CursoServiceService,
    private AlumnosService: AlumnosService,
    private route: Router,
    public dialog: MatDialog,
    public AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    if (this.register) {
      alert('debes registrarte pimero :)');
      this.route.navigate(['/dashboard/alumnos-new']);
      console.log('esta escrito a posta pimero porque me aburria');
    }
  }

  async SubscribeUser(e: any) {
    let isncripto;

    await this.alumnosList.forEach((b) => {
      if (b.id == e) {
        b.a_inscriptos.forEach((item) => {
          if (item === this.alumnoActual.email) {
            isncripto= true;
          }
        });
      }
    });

    if (isncripto == true) {
      this.alumnosList.forEach((i) => {
        if (i.id == e) {
          let cursoDesSuscripto = i;
          cursoDesSuscripto.a_inscriptos = i.a_inscriptos.filter(
            (e) => e !== this.alumnoActual.email
          );


          this.usersService
            .updateAlumno(cursoDesSuscripto)
            .subscribe((data) => {
              alert('Te dessuscibiste a ' + i.name);
              this.getCursosRegistrados()
            });
        }
      });
    } else {
      this.alumnosList.forEach((i) => {
        if (i.id == e) {
          let cursoASuscribir = i;
          cursoASuscribir.a_inscriptos.push(this.alumnoActual.email);
          this.usersService.updateAlumno(cursoASuscribir).subscribe((data) => {
            alert('Te suscibiste a ' + i.name);
            this.getCursosRegistrados()
          });
        }
      });
    }
  }

  getUsers() {
    this.usersService.getAlumnosList().subscribe((data) => {
      this.alumnosList = data;
    });
    this.AuthService.getUserLoged().subscribe(async (res) => {
      await this.AlumnosService.getAlumnosList().subscribe((data) => {
        data.forEach((u) => {
          if (u.email == res?.email) {
            this.alumnoActual = u;
          }
        });
      });
    });
    this.getCursosRegistrados()
  }
  getCursosRegistrados(){
    this.cursosRegistrados=[]
    setTimeout(() => {
      this.alumnosList.forEach(e=>{
        e.a_inscriptos.forEach(a=>{
          if (a==this.alumnoActual.email) {
            this.cursosRegistrados.push(e.id)
          }
        })
      })
    }, 2000);
  }

  getUserDetails(id: number) {
    this.usersService.getSingleAlumno(id).subscribe((data) => {
      this.usersService.AlumnoDetailed = data;
      this.data = data;
    });

  }

  // updateUser(user: Alumno) {
  //   let userToUpdate = user;
  //   userToUpdate.first_name = 'Andres';
  //   userToUpdate.last_name = 'Gonzales';
  //   userToUpdate.age = 90;

  //   this.usersService.updateAlumno(userToUpdate).subscribe((data) => {
  //     this.getUsers();
  //   });
  // }

  deleteUser(id: number) {
    this.usersService.deleteAlumno(id).subscribe(() => {
      this.getUsers();
    });
  }

  goToUserById(id: number): void {
    this.animal = true;
    this.usersService.getSingleAlumno(id).subscribe((data) => {
      this.usersService.AlumnoDetailed = data;
      this.data = data;
    });
    setTimeout(() => {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogC, {
        data: this.data,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }, 400);
  }

  updateUser(id: number) {
    this.route.navigate(['/dashboard/cursos/edit/', id]);
  }
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialogC',
  templateUrl: 'dialog-elements-example-dialogC.html',
})
export class DialogOverviewExampleDialogC {
  constructor(
    private route: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogC>,
    @Inject(MAT_DIALOG_DATA) public data: curso
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateUser(id: number) {
    this.route.navigate(['/dashboard/alumnos-list/', id]);
    this.dialogRef.close();
  }
}
