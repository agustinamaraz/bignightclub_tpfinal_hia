import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'path';
import { Observable } from 'rxjs';
import { GooService } from './goo.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBase: string;

  constructor(private http: HttpClient, private gooService:GooService) {
    this.hostBase = `${environment.url_base}api/usuario/`
  }
  public getRoles():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(`${environment.url_base}api/rol/`, httpOption)
  }
  public signUp(username:string, password:string, email:string, rol:string, dni:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    //console.log(JSON.stringify({ username: username, password: password, email:email, rol:rol, dni:dni }))
    let body = JSON.stringify({ username: username, password: password, email:email, rol:rol, dni:dni });
    return this.http.post(this.hostBase, body, httpOption)
  }
  public confirm(token:string){
    const httpOption = {
      headers: new HttpHeaders({
      })
    }

    return this.http.get(`${environment.url_base}api/usuario/confirm/`+token, httpOption)

  }
  loginEmailGoogle(email:string):Observable<any>{
    const httpOption ={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    let body = JSON.stringify({email:email});
    return this.http.post(this.hostBase +'gmail', body, httpOption);
  }
  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'access-control-allow-origin': `${environment.url_base}`,
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    //console.log(body);
    return this.http.post(this.hostBase + 'login', body, httpOption);
  }
  public loginEmail(email: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ email: email, password: password });
    //console.log(body);
    return this.http.post(this.hostBase + 'login-email', body, httpOption);
  }
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userid");
    //borro el token almacenado mediante el storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userDni");
    sessionStorage.clear()
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }
  public userLoggedInGoogle() {
    var resultado = false;
    var usuario = sessionStorage.getItem("googleIsLoggedIn");
    if(usuario === 'true'){
      resultado = true
    }
    return resultado;
  }
  public userLoggedGoogle() {
    var usuario = sessionStorage.getItem("username");
    return usuario;
  }
  public getEmailGoogle(){
    let email = sessionStorage.getItem("emailGmail")
    return email;
  }
  public getUser(): string | null {
    const isAdmin = sessionStorage.getItem("usuario");
    const parsedAdmin = isAdmin ? JSON.stringify(isAdmin) : null;

    return parsedAdmin !== null ? JSON.parse(parsedAdmin) : null;
  }

  public esAdmin(){ //funciona
    let isAdmin = sessionStorage.getItem("usuario");
    const parsedAdmin = isAdmin ? JSON.parse(isAdmin) : null;
    if(parsedAdmin && parsedAdmin.rol && parsedAdmin.rol.descripcion === "administrador"){
        return true;
    }
    return false;
  }
  public esPaciente(){ //funciona
    let isPatient = sessionStorage.getItem("usuario");
    const parsePatient = isPatient ? JSON.parse(isPatient) : null;
    if(parsePatient && parsePatient.rol && parsePatient.rol.descripcion === "paciente"){
        return true;
    }
    return false;
  }
  public esVisitante(){ //funciona
    let isVisitante = sessionStorage.getItem("rol");
    if(isVisitante === "visitante"){
        return true;
    }
    return false;
  }

  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public getUserStatus(): boolean {
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        const status = JSON.parse(user).status;
        return status === "VERIFIED";
      } catch (error) {
        console.log("Error al analizar la cadena JSON:", error);
      }
    }
    return false;
  }
  getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token")!;
    } else {
      return "";
    }
  }
  resetPassword(password:string, token:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({password: password });
    //console.log(body);
    return this.http.post(this.hostBase + 'reset/'+token, body, httpOption);
  }
  resetAsk(email:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({email:email });
    //console.log(body);
    return this.http.post(this.hostBase + 'reset-ask', body, httpOption);
  }

  userLoggedDNI(){ //nose quien lo puso en el menu asi q lo tuve q poner aca
    var dni = sessionStorage.getItem("userDni");
    return dni;
  }
}
