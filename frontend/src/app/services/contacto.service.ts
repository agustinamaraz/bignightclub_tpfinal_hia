
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  urlBase:string
  constructor(private http:HttpClient) {
    this.urlBase = `${environment.url_base}api/contacto/`;
  }
  getContactos():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }
    return this.http.get(this.urlBase,httpOptions)
  }
  getContacto(id :string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }
    return this.http.get(this.urlBase + id ,httpOptions);
  }
  createContacto(contacto:Contacto):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(contacto);
    return this.http.post(this.urlBase,body,httpOptions);
  }
  deleteContacto(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.delete(this.urlBase+id,httpOptions)
  }
  editContacto(contacto:Contacto,id: string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(contacto);
    return this.http.put(this.urlBase+"editarContacto/" + id, body, httpOptions);
  }
}
