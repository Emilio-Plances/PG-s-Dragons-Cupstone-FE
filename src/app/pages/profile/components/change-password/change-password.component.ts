import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../../../log-system/service/log.service';
import { map, catchError } from 'rxjs';
import { IUser } from '../../../../interfaces/iuser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  user!:IUser
  form!:FormGroup;
  eye1:boolean=false;
  eye2:boolean=false;
  eye3:boolean=false;
  input1:string="password";
  input2:string="password";
  input3:string="password";
  loading:boolean=false;
  regEx: string=`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$`;
  wrong!:boolean;
  anotherProblem!:boolean;
  emptyMessage="Can't be empty";
  capsLockActive: boolean = false;

  constructor(
    private fb:FormBuilder,
    private ls:LogService,
    private router:Router
  ){}
  ngOnInit(){
    this.ls.user$.subscribe(auth=>{
      if(!auth)return;
      this.user=auth.user
    })
    this.form=this.fb.group({
      oldPassword: [null,[Validators.required,Validators.pattern(this.regEx)]],
      newPassword: [null,[Validators.required,Validators.pattern(this.regEx),this.passwordDontMatchValidator]],
      confirmNewPassword: [null,[Validators.required,this.passwordMatchValidator]]
    })
  }
  checkCapsLock(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsLockActive = true;
    } else {
      this.capsLockActive = false;
    }
  }
  passwordDontMatchValidator=(formC:FormControl):ValidationErrors|null=>{
    if(formC.value== this.form?.get(`oldPassword`)?.value){
      return {
        invalid: true,
        message: "Enter a new password!"
      }
    }
    return null;
  }
  passwordMatchValidator=(formC:FormControl):ValidationErrors|null=>{
    if(formC.value!= this.form?.get(`newPassword`)?.value){
      return {
        invalid: true,
        message: "Passwords don't match!"
      }
    }
    return null;
  }
  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }
  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }
  isNotValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }
  switch1():void{
    if(this.input1=="password") this.input1="text";
    else this.input1="password";
  }
  switch2():void{
    if(this.input2=="password") this.input2="text";
    else this.input2="password";
  }
  switch3():void{
    if(this.input3=="password") this.input3="text";
    else this.input3="password";
  }
  getCustomMessage(nameForm:string){
    return this.form.get(nameForm)?.errors!['message']
  }
  save(){
    this.loading=true;
    delete this.form.value.confirmNewPassword;
    this.ls.changePassword(this.user.id,this.form.value)
    .pipe(map(()=>this.loading=false),
    catchError(error=>{
      this.loading=false;
      switch(error.error.errorMessage){
        case "Wrong username/password" :
          this.wrong=true;
          break;
        default:
          this.anotherProblem=true
          break;
      }
      throw error;
    })).subscribe(()=>this.router.navigate(["/profile"]))
  }
}
