import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError, Observable } from 'rxjs';
import { curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoServiceService {
  AlumnoDetailed:curso;

  root_url='https://62a7cc4797b6156bff931c13.mockapi.io/api/v1/cursos/'
  configurationOptions={
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error){
      console.warn(`Error de backend tipo ${error.status} con el mensaje de ${error.message}`)
    }
    return throwError('Error de comunicacion http');
  }

  getAlumnosList(): Observable<curso[]>{
    return this.http.get<curso[]>(this.root_url)
    .pipe(catchError(this.handleError));
  }

  getSingleAlumno(id:number): Observable<curso>{
    return this.http.get<curso>(this.root_url + id)
  }

  createAlumno(curso:curso):Observable<curso>{
    return this.http.post<curso>(this.root_url, curso, this.configurationOptions);
  }

  updateAlumno(curso: curso):Observable<curso>{
    return this.http.put<curso>(this.root_url + curso.id, curso)
  }

  deleteAlumno(id:number):Observable<curso>{
    return this.http.delete<curso>(this.root_url + id);
  }
}
