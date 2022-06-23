import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  root_url='https://62a7cc4797b6156bff931c13.mockapi.io/api/v1/users/'
  AlumnoDetailed:Alumno;
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

  getAlumnosList(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.root_url)
    .pipe(catchError(this.handleError));
  }

  getSingleAlumno(id:number): Observable<Alumno>{
    return this.http.get<Alumno>(this.root_url + id)
  }

  createAlumno(Alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.root_url, Alumno, this.configurationOptions);
  }

  updateAlumno(Alumno: Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(this.root_url + Alumno.id, Alumno)
  }

  deleteAlumno(id:number):Observable<Alumno>{
    return this.http.delete<Alumno>(this.root_url + id);
  }
}
