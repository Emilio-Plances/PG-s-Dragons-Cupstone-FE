import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { IUserList } from "../../../interfaces/iresponselist";


import { IUserAuth, IUserResponse } from "../../../interfaces/iresponses";
import { IRegister, ILogin, IPassword } from "../../../interfaces/irequest";


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
  pageSize:number=10

  constructor(
    private http:HttpClient,
    private router:Router
  ){this.logged()}

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
  checkUsername(username:string):Observable<IUserResponse>{
    return this.http.get<IUserResponse>(`${this.authURL}/checkUsername?username=${username}`);
  }
  checkEmail(email:string):Observable<IUserResponse>{
    return this.http.get<IUserResponse>(`${this.authURL}/checkEmail?email=${email}`);
  }

  /*___________________USERS CALLS_______________________*/

  getAll(pageNumber:number): Observable<IUserList> {
    return this.http.get<IUserList>(`${this.noLogUserURL}?page=${pageNumber}&size=${this.pageSize}`);
  }
  searchByName(publicUsername:String, pageNumber:number=0):Observable<IUserList>{
    return this.http.get<IUserList>(`${this.noLogUserURL}/publicUsername?publicUsername=${publicUsername}&page=${pageNumber}&size=${this.pageSize}`);
  }
  getById(id:number):Observable<IUserResponse>{
    return this.http.get<IUserResponse>(`${this.noLogUserURL}/${id}`);
  }
  getByrealUsername(username:string,):Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.noLogUserURL}/param?username=${username}`);
  }
  edit(auth:IUserAuth):Observable<IUserResponse> {
    this.loggedUser.next(auth);
    localStorage.setItem(`login`,JSON.stringify(auth));
    return this.http.patch<IUserResponse>(`${this.logUserURL}/${auth.user.id}`,auth.user)
  }
  upload(id:number,file:File):Observable<IUserResponse>{
    const formData = new FormData();
    formData.append('upload', file);
    return this.http.patch<IUserResponse>(`${this.logUserURL}/${id}/upload`,formData);
  }
  changePassword(id:number,passwords:IPassword):Observable<IUserResponse>{
    return this.http.patch<IUserResponse>(`${this.logUserURL}/${id}/password`,passwords);
  }
  deleteUser(id:number):Observable<IUserResponse>{
    return this.http.delete<IUserResponse>(`${this.logUserURL}/${id}`);
  }
}
