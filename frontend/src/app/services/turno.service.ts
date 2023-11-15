import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  hostBase: string;
  constructor(private http: HttpClient) {
    //localhost:
    this.hostBase = `${environment.url_base}api/turno/`;
  }

  getTurno(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    };

    return this.http.get(this.hostBase + id, httpOptions);
  }

  getTurnosDisponibles(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams().append("estado", "libre")
    };

    return this.http.get(this.hostBase + "turnosDisponibles", httpOptions);
  }

  getTurnos(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    };
    return this.http.get(this.hostBase, httpOptions);
  }

  getMisTurnos(dni: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams().append("dni", dni)
    };
    return this.http.get(this.hostBase + "misTurnos", httpOptions);
  }

  createTurno(t: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };

    let body = JSON.stringify(t);
    console.log(body);

    return this.http.post(this.hostBase, body, httpOptions);
  }

  deleteTurno(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    };

    return this.http.delete(this.hostBase + id, httpOptions);
  }

  editTurno(t: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };

    let body = JSON.stringify(t);

    return this.http.put(this.hostBase + t._id, body, httpOptions);
  }
}
