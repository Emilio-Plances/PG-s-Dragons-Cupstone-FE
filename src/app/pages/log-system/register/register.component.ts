import { map } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogService } from '../service/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!:FormGroup;
  eye1:boolean=false;
  eye2:boolean=false;
  input1:string="password";
  input2:string="password";
  loading:boolean=false;
  regEx: string=`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$`;
  checking:boolean=false;
  capsLockActive: boolean = false;

  minNumberMessage="Too short (min 3)";
  maxNumberMessage="Too long (max 15)";
  emptyMessage="Can't be empty";

  constructor(
    private fb:FormBuilder,
    private ls:LogService,
    private router:Router
  ){}

  ngOnInit(){
    this.form=this.fb.group({
      name:[null,[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      surname:[null,[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      username:[null,[Validators.required, Validators.minLength(3),Validators.maxLength(15)],[this.usernameCheckValidator]],
      birthday:[null],
      email:[null,[Validators.required,Validators.email],[this.emailCheckValidator]],
      password: [null,[Validators.required,Validators.pattern(this.regEx)]],
      confirmPassword: [null,[Validators.required,this.passwordMatchValidator]]
    })
  }
  passwordMatchValidator=(formC:FormControl):ValidationErrors|null=>{
    if(formC.value!= this.form?.get(`password`)?.value){
      return {
        invalid: true,
        message: "Passwords don't match!"
      }
    }
    return null;
  }
  emailCheckValidator=(formC:FormControl):ValidationErrors|null=>{
    this.checking=true;
    return this.ls.checkEmail(formC.value).pipe(map(response => {
      this.checking=false;
      if (response.message == "Exist") {
        return {
          invalid: true,
          message: "Email already exists"
        };
      }
      return null;
    })
  )}
  usernameCheckValidator=(formC:FormControl):ValidationErrors|null=>{
    this.checking=true;
    return this.ls.checkUsername(formC.value).pipe(map(response => {
      this.checking=false;
      if (response.message == "Exist") {
        return {
          invalid: true,
          message: "Username already exists"
        };
      }
      return null;
    })
  )}
  checkCapsLock(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsLockActive = true;
    } else {
      this.capsLockActive = false;
    }
  }
  switch1():void{
    if(this.input1=="password") this.input1="text";
    else this.input1="password";
  }
  switch2():void{
    if(this.input2=="password") this.input2="text";
    else this.input2="password";
  }
  getCustomMessage(nameForm:string){
    return this.form.get(nameForm)?.errors!['message']
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
  submit():void{
    this.loading=true;
    delete this.form.value.confirmPassword;
    this.form.value.name= this.form.value.name.charAt(0).toUpperCase()+this.form.value.name.slice(1).toLowerCase();
    this.form.value.surame= this.form.value.surname.charAt(0).toUpperCase()+this.form.value.surname.slice(1).toLowerCase();
    this.form.value.email=this.form.value.email.toLowerCase();
    this.ls.register(this.form.value)
    .subscribe(()=>{
      this.loading=false;
      this.router.navigate(['/logSystem/login']);
    });
  }
}
