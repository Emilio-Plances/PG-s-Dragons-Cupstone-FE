import { Component, Inject, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogService } from '../../../log-system/service/log.service';
import { catchError, map,} from 'rxjs';
import { IUserAuth } from '../../../../interfaces/iuser-auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  @Input() user!:IUser|undefined
  @Input() auth!:IUserAuth|null
  form!:FormGroup
  loading:boolean=false;
  checking:boolean=false;
  file!:File
  linkFile:string|ArrayBuffer|null=null
  constructor(
    private fb:FormBuilder,
    private ls:LogService,
    @Inject('Swal') private swal: any,
  ){}
  ngOnInit():void{
    this.form=this.fb.group({
      photo:[null],
      name:[this.user?.name,[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      surname:[this.user?.surname,[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      publicUsername:[this.user?.publicUsername,[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      birthday:[this.user?.birthday],
      email:[this.user?.email,[Validators.required,Validators.email],[this.emailCheckValidator]],
      info:[this.user?.info]
    })
  }
  onFileSelected(event: any) {
      this.linkFile=null;
      this.file = event.target.files[0];
      if(this.file){
        const READER=new FileReader();
        READER.onload=()=>{
        this.linkFile = READER.result as string;
      };
      READER.readAsDataURL(this.file);
    }
  }

  emailCheckValidator=(formC:FormControl):ValidationErrors|null=>{
    this.checking=true;
    return this.ls.checkEmail(formC.value).pipe(map(response => {
      this.checking=false;
      if(this.user?.email==formC.value){
        this.checking=false;
        return null;
      }
      if (response.message == "Exist") {
        return {
          invalid: true,
          message: "Email already exists"
        };
      }
      return null;
    })
  )}
  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }
  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }
  isNotValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }
  save():void{
    this.loading=true;
    this.form.value.name= this.form.value.name.charAt(0).toUpperCase()+this.form.value.name.slice(1).toLowerCase();
    this.form.value.surame= this.form.value.surname.charAt(0).toUpperCase()+this.form.value.surname.slice(1).toLowerCase();
    this.form.value.email=this.form.value.email.toLowerCase();
    if(!this.user) return;
    this.user.name=this.form.value.name;
    this.user.surname=this.form.value.surname;
    this.user.email=this.form.value.email;
    this.user.birthday=this.form.value.birthday;
    this.user.publicUsername=this.form.value.publicUsername;
    this.user.info=this.form.value.info;

    if(this.file) {
        if(!this.user) return
        this.ls.upload(this.user.id, this.file)
        .pipe(
        catchError(error=>{
        console.log(`Error`);
        throw error;
      }))
      .subscribe((data)=> {
        if(!this.user)return
        console.log("Success");
        if(!data.response)return
        this.user.linkPhoto=data.response.linkPhoto;

        if(!this.auth) return;
        this.auth.user=this.user;

        this.ls.edit(this.auth).subscribe(()=>{
          this.swal.fire({
            position: "top-end",
            icon: "success",
            title: `Account updated!`,
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            location.reload()
          });
        })
      });
    }else{
      if(!this.auth) return;
      this.auth.user=this.user;

      this.ls.edit(this.auth).subscribe(()=>
        this.swal.fire({
          position: "top-end",
          icon: "success",
          title: `Account updated!`,
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          location.reload()
      }))
    }
  }

}
