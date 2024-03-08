import { IRegister } from './../interfaces/iregister';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../interfaces/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILogin } from '../interfaces/ilogin';
import { Router } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  loggedUser:BehaviorSubject<IUserAuth|null>=new BehaviorSubject<IUserAuth|null>(null);
  user$=this.loggedUser.asObservable();
  isLogged$=this.user$.pipe(map(user=>!!user));

  authURL:string=`${environment.URL}/auth`
  loginURL:string= `${this.authURL}/login`;
  registerURL:string=`${this.authURL}/register`;

  jwt:JwtHelperService=new JwtHelperService();

  constructor(
    private http:HttpClient,
    private router:Router
  ){this.logged();}

  logged(){
    let localLogin:string|null=localStorage.getItem(`login`);
    if(!localLogin) return;

    let user:IUserAuth=JSON.parse(localLogin);
    if(this.jwt.isTokenExpired(user.token)) return;

    this.autoLogOut(user.token);
    this.loggedUser.next(user);
  }
  autoLogOut(token:string){
    let expiringDate=this.jwt.getTokenExpirationDate(token) as Date;
    let remainingTime=expiringDate.getTime()-new Date().getTime();
    setTimeout(() =>this.logout(),remainingTime);
  }
  register(user:IRegister):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.registerURL,user);
  }
  login(user:ILogin):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.loginURL,user)
    .pipe(tap(data=>{
      this.loggedUser.next(data);
      this.autoLogOut(data.token);
      localStorage.setItem(`login`,JSON.stringify(data));
    }))
  }
  logout():void{
    localStorage.removeItem(`login`);
    this.router.navigate(['/home']);
  }
  checkUsername(username:string):Observable<IResponse>{
    return this.http.post<IResponse>(`${this.authURL}/checkUsername?username=${username}`,username);
  }
  checkEmail(email:string):Observable<IResponse>{
    return this.http.post<IResponse>(`${this.authURL}/checkEmail?email=${email}`,email);
  }
}
