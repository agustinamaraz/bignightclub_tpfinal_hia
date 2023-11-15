import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Usuario } from 'src/app/models/usuario';
import { GooService } from 'src/app/services/goo.service';
import { LoginService } from 'src/app/services/login.service';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  resetUrl!:string;
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
    private readonly oAuthService: OAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private gooService: GooService) {
  }

  ngOnInit() {

    this.gooService.configureSingleSignOne();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/reset';
  }
  verificarTexto(texto:any):boolean {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,9}$/;
    if (emailRegex.test(texto)) {
      console.log('El texto ingresado corresponde a un email');
      return true;
    } else {
      console.log('El texto ingresado corresponde a un texto normal');
      return false;
    }
  }
  login() {
    if(!this.verificarTexto(this.userform.username)){
    this.loginService.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log("usuarioooooooooooooooooooooooLOGIN"+JSON.stringify(result)
          );
          if (user.status == 1) {
            console.log(user.usuario.dni)
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("userDni",user.usuario.dni);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
  else if(this.verificarTexto(this.userform.username)){
    this.loginService.loginEmail(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log("usuarioooooooooooooooooooooooLOGIN"+JSON.stringify(result)
          );
          if (user.status == 1) {
            console.log(user.usuario.dni)
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("userDni",user.usuario.dni);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });

  }
}
  signup(){
    this.router.navigate(['signUp',0]);
  }
  callLogin(){
    this.gooService.login();
  }
  cortarStringPorEspacio(texto: string): string {
    const indiceEspacio = texto.indexOf(' ');
    if (indiceEspacio !== -1) {
      return texto.substring(0, indiceEspacio);
    } else {
      return texto;
    }
  }
  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '989832783745-cp1uiv1g4hhf3qh0bkgcilbls624cpb7.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.loadGoogleAuth();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
  loadGoogleAuth() {
    if (this.auth2) {
      this.callLogin();
    } else {
      // La biblioteca de autenticación de Google no se cargó correctamente
      console.error('Error: Google Auth library not loaded');
    }
  }

}
