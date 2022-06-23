
import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { CursoServiceService } from '../../../service/curso-service.service';
import { curso } from '../../../models/curso';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  register = localStorage.getItem('reg') == 'true' ? false : true;
  name: string;
  animal: boolean;
  data: curso;
  alumnosList: curso[];
  displayedColumns: string[] = ['name', 'duracion', 'a_inscriptos', 'actions'];
  admin = localStorage.getItem('admin') == 'true' ? true : false

  constructor(
    private usersService: CursoServiceService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
    console.log(this.alumnosList);
    if(this.register){
      alert('debes registrarte pimero :)')
      this.route.navigate(['/dashboard/alumnos-new'])
      console.log("esta escrito a posta pimero porque me aburria");

    }
  }


  getUsers() {
    this.usersService.getAlumnosList().subscribe((data) => {
      console.log(data[0]);
      this.alumnosList = data;
      console.log(this.alumnosList);
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
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogC, {
        data: this.data ,
      });

      dialogRef.afterClosed().subscribe((result) => {
      });
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
    @Inject(MAT_DIALOG_DATA) public data: curso  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateUser(id: number) {
    this.route.navigate(['/dashboard/alumnos-list/', id]);
    this.dialogRef.close();
  }
}
