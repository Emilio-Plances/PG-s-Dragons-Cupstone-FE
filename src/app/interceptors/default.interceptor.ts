import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUserAuth } from '../interfaces/iresponses';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      let userString:string|null=localStorage.getItem('login');
      if (!userString) return next.handle(req);
      let user:IUserAuth= JSON.parse(userString);
      let newReq=req.clone({
        setHeaders: {
          Authorization:user.token
        }
      })
    return next.handle(newReq);
  }
}

