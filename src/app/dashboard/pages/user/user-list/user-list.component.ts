import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../../../models/alumno';
import { AlumnosService } from '../../../service/alumnos-service.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  register = localStorage.getItem('reg') == 'true' ? false : true;
  name: string;
  animal: boolean;
  data: Alumno;
  alumnosList: Alumno[];
  displayedColumns: string[] = ['first_name', 'last_name', 'age','rol', 'actions'];
  admin = localStorage.getItem('admin') == 'true' ? true : false
  user:Alumno

  constructor(
    private usersService: AlumnosService,
    private route: Router,
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
  deleteUser(id: number) {
    this.usersService.deleteAlumno(id).subscribe(() => {
      this.getUsers();
    });
  }
  goToUserById(id: number): void {
    this.animal = true;
  }
  updateUser(id: number) {
    this.alumnosList.forEach(e=>{
      if(e.id==id){
        this.user=e
      }})
    let userToUpdate=this.user;
    if (userToUpdate.admin==true) {
      userToUpdate.admin=false
    } else {
      userToUpdate.admin=true
    }
    this.usersService.updateAlumno(userToUpdate).subscribe(
      (data)=>{
            alert('Rol editado');
      }
    )
  }
}
