import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserRol(route);
  }

  constructor(private router:Router, private login: LoginService){}

  checkUserRol(route:ActivatedRouteSnapshot):boolean{
    const scopes:any = this.login.getUser()!;

    //console.log("vigilanteeeee: "+ scopes);

    if(scopes.includes(route.data["rol"])){
      return true;
    }else{
      //alert("no tienes lo permisos para acceder a esta seccion")
      this.router.navigate(["/home"])
      return false;
    }
  }

}
