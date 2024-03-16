import { Component } from '@angular/core';
import { LogService } from '../log-system/service/log.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-my-characters',
  templateUrl: './my-characters.component.html',
  styleUrl: './my-characters.component.scss'
})
export class MyCharactersComponent {
  logged!:boolean
  user!:IUser|undefined

  constructor(
    private ls:LogService
  ){}
  ngOnInit():void{
    this.ls.isLogged$.subscribe(logged=>this.logged= logged)
    this.ls.user$.subscribe(user=>this.user=user?.user )

  }


}
