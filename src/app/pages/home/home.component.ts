import { Component } from '@angular/core';
import { LogService } from '../log-system/service/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logged!:boolean;
  constructor(
    private ls:LogService
  ){}
  ngOnInit():void{

  }
}
