import { Component, OnInit, Inject } from '@angular/core';
import { AlumnosService } from '../../service/alumnos-service.service';
import { Alumno, Alumno2 } from '../../models/alumno';
import { Router } from '@angular/router';
import { CursoServiceService } from '../../service/curso-service.service';
import { curso } from '../../models/curso';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css'],
})
export class AlumnosListComponent implements OnInit {
  register = localStorage.getItem('reg') == 'true' ? false : true;
  name: string;
  animal: boolean;
  data: Alumno;
  alumnosList: Alumno[];
  displayedColumns: string[] = ['first_name', 'last_name', 'age', 'actions'];
  admin = localStorage.getItem('admin') == 'true' ? true : false;
  constructor(
    private usersService: AlumnosService,
    private route: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    console.log(this.alumnosList);
    if (this.register) {
      alert('debes registrarte pimero :)');
      this.route.navigate(['/dashboard/alumnos-new']);
      console.log('esta escrito a posta pimero porque me aburria');
    }
  }

  getUsers() {
    this.usersService.getAlumnosList().subscribe((data) => {
      this.alumnosList = data;
    });

  }

  getUserDetails(id: number) {
    this.usersService.getSingleAlumno(id).subscribe((data) => {
      this.usersService.AlumnoDetailed = data;
      this.data = data;
    });
    setTimeout(() => {
      console.log(this.data);
    }, 1000);
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
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: { animal: this.animal, data: this.data },
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }, 400);
  }

  updateUser(id: number) {
    this.route.navigate(['/dashboard/alumnos-list/', id]);
  }
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    private route: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno2,
    private CursoServiceService:CursoServiceService
  ) {}
  cursosList: curso[];

  ngOnInit(): void {
    this.CursoServiceService.getAlumnosList().subscribe((data) => {
      this.cursosList = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateUser(id: number) {
    this.route.navigate(['/dashboard/alumnos-list/', id]);
    this.dialogRef.close();
  }
}
