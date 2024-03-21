import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../../../../pages/log-system/service/log.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  value!:string;
  logged!:boolean;
  constructor(
    private router: Router,
    private ls:LogService
  ){}
  ngOnInit():void{
    this.ls.isLogged$.subscribe(logged=>this.logged=logged);
  }
  search(){
    if(this.value) this.router.navigate([`/search/${this.value}`]);
  }
  logout(){
    this.ls.logout();
  }
}
