import { Component } from '@angular/core';
import { LogService } from '../../pages/log-system/service/log.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  collapse:boolean=true;
  logged!:boolean;
  logSystem!:boolean;
  value:string="";
  counter:number=0;

  constructor(
    private ls:LogService,
    private router: Router
  ){this.logSystem=this.router.url.includes("logSystem");}

  ngOnInit():void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.updateLogSystemFlag(event.url);
    });
    this.ls.isLogged$.subscribe(logged=>this.logged=logged);
  }
  private updateLogSystemFlag(url: string): void {
    this.logSystem = url.includes("logSystem");
  }
  logout(){
    this.ls.logout();
  }
  search(){
    if(this.value) this.router.navigate([`/search/${this.value}`]);
    this.counter=0;
  }
}
