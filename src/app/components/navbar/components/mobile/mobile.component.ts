import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LogService } from '../../../../pages/log-system/service/log.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss'
})
export class MobileComponent {
  collapse:boolean=true;
  logged!:boolean;
  logSystem!:boolean;
  value:string="";
  counter:number=0;
  show!:boolean

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
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menuElement = document.querySelector('#navbarMobile');
    if (!menuElement?.contains(event.target as Node)) {
      if (this.show) {
        this.show = false;
      }
    }
  }
  updateLogSystemFlag(url: string): void {
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
