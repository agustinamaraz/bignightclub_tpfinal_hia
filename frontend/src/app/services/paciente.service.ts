import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Paciente } from '../models/paciente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  hostBase: string;

  constructor(private http:HttpClient) {
    //this.hostBase = "http://localhost:3000/api/paciente/";
    this.hostBase = `${environment.url_base}api/paciente/`;
   }

  getPaciente(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get(this.hostBase+id,httpOptions);

  }


  //todos los pacientes
  getPacientes():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get(this.hostBase,httpOptions);

  }
  //paciente por dni
  getPacienteDni(dni:string){
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
      .append("dniP",dni)
    }
    return this.http.get(this.hostBase+"dni",httpOptions);
  }

  //paciente por NyA
  getPacienteN(nombre:string){
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
      .append("nombrE",nombre)
    }
    return this.http.get(this.hostBase+"nombre",httpOptions);
  }

  getPacienteA(apellido:string){
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
      .append("apellidoE",apellido)
    }
    return this.http.get(this.hostBase+"apellido",httpOptions);
  }

  getOnePacienteByDni(dni:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.hostBase+'/dniOne/'+dni, httpOptions)
  }
  getPacienteById(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get(this.hostBase+id,httpOptions);
  }
  createPaciente(paciente:Paciente):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(paciente);

    return this.http.post(this.hostBase,body,httpOptions);
  }
  deletePaciente(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }

    return this.http.delete(this.hostBase+id,httpOptions);
  }

  editPaciente(paciente:Paciente):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(paciente);

    return this.http.put(this.hostBase+paciente._id,body,httpOptions);
  }
}
