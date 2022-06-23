import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CursoServiceService } from '../../../service/curso-service.service';
import { curso } from '../../../models/curso';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  cursosList: curso[];
  user:curso
  id=this.rutaActiva.snapshot.params['id']
  CursosForm = this.fb.group({
    Name: [null, Validators.required],
    Duracion: [null, Validators.required],
  });
  constructor(private fb: FormBuilder, private rute:Router,  private CursoServiceService:CursoServiceService, private rutaActiva: ActivatedRoute) {}
  ngOnInit(): void {
    this.getCursos()
  }
  getCursos() {
    this.CursoServiceService.getAlumnosList().subscribe((data) => {
      this.cursosList = data;
      this.cursosList.forEach(e=>{
        if(e.id==this.id){
          this.user=e
          this.CursosForm.controls['Name'].setValue(e.name)
          this.CursosForm.controls['Duracion'].setValue(e.duracion)
        }
      })
    });
  }
  onSubmit(): void {
    let userToUpdate=this.user;
    userToUpdate.name=this.CursosForm.controls['Name']?.value;
    userToUpdate.duracion=this.CursosForm.controls['Duracion']?.value;

    this.CursoServiceService.updateAlumno(userToUpdate).subscribe(
      (data)=>{
            this.rute.navigate(['/dashboard/cursos']);
            alert('Curso Editado');
      }
    )
  }
}
