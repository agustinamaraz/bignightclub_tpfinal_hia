import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('localhost', 0) >= 0) {
    //if (req.url.indexOf('localhost', 0) >= 0) {
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.getToken()}`,
        },
      });
      return next.handle(tokenizeReq);
    } else {
      const tokenizeReq = req.clone({
        setHeaders: {
          //Authorization: `Bearer ${this.loginService.getToken()}`
        },
      });
      return next.handle(tokenizeReq);
    }
  }
}
