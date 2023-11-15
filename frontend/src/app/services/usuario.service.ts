import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  hostBase: string;

  constructor(private http:HttpClient) {
    this.hostBase = `${environment.url_base}api/usuario/`;
   }

  //todos los pacientes
  getUsuarios():Observable<any>{
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
  getUsuarioDni(dni:string){
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
      .append("dniU",dni)
    }
    return this.http.get(this.hostBase+"dni",httpOptions);
  }

  deleteUsuario(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }

    return this.http.delete(this.hostBase+id,httpOptions);
  }

  editUsuario(usuario:Usuario):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(usuario);

    return this.http.put(this.hostBase+usuario._id,body,httpOptions);
  }
}
