import { Component } from '@angular/core';
import { LogService } from '../log-system/service/log.service';
import { IUser } from '../../interfaces/iuser';
import { CharacterService } from '../../services/character.service';
import { ICharacterRequest } from '../../interfaces/irequest';
import { Router } from '@angular/router';
import { ICharacter } from '../../interfaces/i-character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  logged!:boolean
  user!:IUser|undefined
  characters:ICharacter[]=[]

  constructor(
    private ls:LogService,
    private cs:CharacterService,
    private router:Router
  ){}
  ngOnInit():void{
    this.ls.isLogged$.subscribe(logged=>this.logged= logged)
    this.ls.user$.subscribe(user=>{
      if(!user)return;
      this.user=user.user;
      this.cs.getByUserId(this.user.id).subscribe(data=>this.characters=data.response)
    } )

  }
  addChar(event:any){
    event.stopPropagation();
    if(!this.user) return;
    let newChar:ICharacterRequest={
      userId: this.user?.id
    }
    this.cs.create(newChar).subscribe(data=>{
      this.router.navigate([`/characters/edit`,data.response.id]);
    })
  }
  deleteChar(id:number,event:any){
    event.stopPropagation();
    this.cs.delete(id).subscribe(()=> this.characters=this.characters.filter(el=>el.id != id));
  }
  printClass(char:ICharacter):string{
    if(char.pgClass.length==0) return 'None';
    if(!char.pgClass[1]) return char.pgClass[0];
    return char.pgClass.toString();
  }
}
