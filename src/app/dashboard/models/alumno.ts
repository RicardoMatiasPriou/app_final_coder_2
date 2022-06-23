export interface Alumno {
  id:number;
  first_name:string;
  last_name:string;
  age:number;
  img:any;
email:string;
admin:boolean
  cursos_realizados:string[];

}
export interface Alumno2 {
  animal:boolean;
  data:{id:number;
    first_name:string;
    last_name:string;
    age:number;
    img:any;
    email:string;
    admin:boolean
    cursos_realizados:string[];}



}
