import { Background, Alignment, Classes } from './../../../../interfaces/enum';
import { Component } from '@angular/core';
import { ICharacter } from '../../../../interfaces/i-character';
import { Dice, Race, Status } from '../../../../interfaces/enum';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';

@Component({
  selector: 'app-edit-char',
  templateUrl: './edit-char.component.html',
  styleUrl: './edit-char.component.scss'
})
export class EditCharComponent {
  char!:ICharacter;
  loading!:boolean;
  races:Race[]=Object.values(Race);
  classes:Classes[]=Object.values(Classes);
  modStr!:number;
  modDex!:number;
  modCon!:number;
  modInt!:number;
  modCha!:number;
  modWis!:number;

  constructor(
    private route:ActivatedRoute,
    private cs:CharacterService,
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let idString:string|null = params.get('id');
      if (!idString) return;
      let id:number=parseInt(idString);
      this.cs.getById(id).subscribe(data=>{
        this.modStr=Math.floor((data.response.strenght-10)/2);
        this.modDex=Math.floor((data.response.dexterity-10)/2);
        this.modCon=Math.floor((data.response.constitution-10)/2);
        this.modInt=Math.floor((data.response.intelligence-10)/2);
        this.modCha=Math.floor((data.response.charisma-10)/2);
        this.modWis=Math.floor((data.response.wisdom-10)/2);
        this.char=data.response;

        this.loading=false;
      })
    })
  }
  changeStatus(){
    if(this.char.status==Status.Private) this.char.status=Status.Public;
    else this.char.status=Status.Private
  }
  setClass(){
    this.setHP()
  }
  setHP(){
    switch(this.char.pgClass[0]){
      case Classes.Barbarian:
        this.char.dice=Dice.D12;
        break;
      case Classes.Fighter:
      case Classes.Paladin:
      case Classes.Ranger:
        this.char.dice=Dice.D10;
        break;
      case Classes.Bard:
      case Classes.Cleric:
      case Classes.Druid:
      case Classes.Rogue:
      case Classes.Monk:
      case Classes.Warlock:

        this.char.dice=Dice.D8;
        break;
      case Classes.Sorcerer:
      case Classes.Wizard:
        this.char.dice=Dice.D6;
        break;
    }
    this.char.hp=this.char.dice+this.modCon
  }

}
