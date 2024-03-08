import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ilogin';
import { LogService } from '../service/log.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!:FormGroup
  input:string="password";
  eye:boolean=false;
  loading:boolean=false;
  regEx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  notFound:boolean=false;
  anotherProblem:boolean=false
  loginData:ILogin={
    username: null,
    email: null,
    password: ''
  }

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private LS:LogService
  ){}

  ngOnInit(){
    this.form= this.fb.group({
      usernameEmail:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  switch():void{
    this.eye=!this.eye;
    if(this.input=="password") this.input="text"
    else this.input="password";
  }

  submit():void{
    this.loading=true;

    if(this.regEx.test(this.form.value.usernameEmail)) this.loginData.email=this.form.value.usernameEmail.toLowerCase();
    else this.loginData.username=this.form.value.usernameEmail;
    this.loginData.password=this.form.value.password;

    this.LS.login(this.loginData)
    .pipe(map(()=>this.loading=false),
    catchError(error=>{
      this.loading=false;
      console.log(error.error.errorMessage)
      switch(error.error.errorMessage){
        case "User not found":
          this.notFound=true;
          break;
        case "Wrong username/password" :
          this.notFound=true;
          break;
        default:
          this.anotherProblem=true
          break;
      }
      throw error;
    })).subscribe(()=>this.router.navigate(["/home"]));
  }
  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }
  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }
  isValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }
}
