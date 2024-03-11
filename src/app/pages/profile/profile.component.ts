import { Component, Inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { LogService } from '../log-system/service/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  logged!:boolean;
  user!:IUser|undefined;
  photo!:string;
  deleting!:boolean;
  deletingName!:String;
  editMode:boolean=false;

  constructor(
    private ls:LogService,
    @Inject('Swal') private swal: any,
    private router:Router
  ){}
  ngOnInit():void{
    this.ls.isLogged$.subscribe(logged=>this.logged= logged)
    this.ls.user$.subscribe(user=>{this.user=user?.user} )
  }

  startDelete(){
    this.swal.fire({
      title: "Enter your username to confirm",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm:(username:string)=>{
        if(username!=this.user?.username) this.wrongUsername();
        else this.deleteUser();
      }
    });
  }
  wrongUsername(){
    this.swal.fire({
      position: "top-end",
      icon: "error",
      title: `Wrong username!`,
      showConfirmButton: false,
      timer: 3000
    });
  }
  deleteUser(){
    if(!this.user)return;
    this.ls.deleteUser(this.user.id)
    .subscribe(()=>{
      this.swal.fire({
        position: "top-end",
        icon: "success",
        title: `Account deleted! See you next time ${this.user?.name}! We're sorry to see you're going!`,
        showConfirmButton: false,
        timer: 3000
      }).then(()=>{
        this.ls.logout()
      });
    });

  }
}
