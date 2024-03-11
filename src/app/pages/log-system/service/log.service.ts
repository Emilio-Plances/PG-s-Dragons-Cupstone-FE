import { IRegister } from '../../../interfaces/iregister';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../../../interfaces/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILogin } from '../../../interfaces/ilogin';
import { Router } from '@angular/router';
import { IResponse } from '../../../interfaces/iresponse';
import { IUser } from '../../../interfaces/iuser';
import { IPassword } from '../../../interfaces/ipassword';

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
  noLogUserURL=`${environment.URL}/noAuth/users`;
  logUserURL= `${environment.URL}/users`;

  jwt:JwtHelperService=new JwtHelperService();

  constructor(
    private http:HttpClient,
    private router:Router
  ){this.logged();}

  /*___________________AUTHENTICATION CALLS_______________________*/

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
    this.loggedUser.next(null);
    this.router.navigate(['/home']);
  }
  checkUsername(username:string):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.authURL}/checkUsername?username=${username}`);
  }
  checkEmail(email:string):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.authURL}/checkEmail?email=${email}`);
  }

  /*___________________USERS CALLS_______________________*/

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.noLogUserURL);
  }
  getById(id:number):Observable<IUser> {
    return this.http.get<IUser>(`${this.noLogUserURL}/${id}`);
  }
  getByUsername(username:string):Observable<IUser> {
    return this.http.get<IUser>(`${this.noLogUserURL}/param?username=${username}`);
  }
  edit(user:IUser):Observable<IUser> {
    return this.http.patch<IUser>(`${this.noLogUserURL}/${user.id}`,user);
  }
  upload(id:number,file:any):Observable<IUser>{
    return this.http.patch<IUser>(`${this.logUserURL}/${id}/upload`,file);
  }
  changePassword(passwords:IPassword):Observable<IUser>{
    return this.http.patch<IUser>(`${this.logUserURL}/password`,passwords);
  }
  deleteUser(id:number):Observable<IUser>{
    return this.http.delete<IUser>(`${this.logUserURL}/${id}`);
  }
}
