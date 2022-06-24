import { Alumno } from './alumno';
export interface curso {
  id:number;
  name:string;
  duracion:number|null;
  a_inscriptos:string[];
  img:string;
}
export interface subcrip{
  id:number
  curso:number
  Alumnos:number[]
}
