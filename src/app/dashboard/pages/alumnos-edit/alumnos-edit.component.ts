import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../service/alumnos-service.service';
import { Alumno } from '../../models/alumno';
@Component({
  selector: 'app-alumnos-edit',
  templateUrl: './alumnos-edit.component.html',
  styleUrls: ['./alumnos-edit.component.css']
})
export class AlumnosEditComponent implements OnInit {

  AlumnoList: Alumno[];
  user:Alumno
  id=this.rutaActiva.snapshot.params['id']
  AlumnoForm = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    age: [null, Validators.required],
    img: [null, Validators.required],

  });
  constructor(private fb: FormBuilder, private rute:Router,  private AlumnosService:AlumnosService, private rutaActiva: ActivatedRoute) {}
  ngOnInit(): void {
    this.getCursos()
  }
  getCursos() {
    this.AlumnosService.getAlumnosList().subscribe((data) => {

      this.AlumnoList = data;
      this.AlumnoList.forEach(e=>{
        if(e.id==this.id){
          this.user=e
          this.AlumnoForm.controls['first_name'].setValue(e.first_name)
          this.AlumnoForm.controls['last_name'].setValue(e.last_name)
           this.AlumnoForm.controls['age'].setValue(e.age)
          this.AlumnoForm.controls['img'].setValue(e.img)
        }
      })
    });
  }
  onSubmit(): void {
    let userToUpdate=this.user;
    userToUpdate.first_name=this.AlumnoForm.controls['first_name']?.value;
    userToUpdate.last_name=this.AlumnoForm.controls['last_name']?.value;
    userToUpdate.age=this.AlumnoForm.controls['age']?.value;
    userToUpdate.img=this.AlumnoForm.controls['img']?.value;

    this.AlumnosService.updateAlumno(userToUpdate).subscribe(
      (data)=>{
            this.rute.navigate(['/dashboard']);
            alert('Alumno Editado');
      }
    )
  }
}
