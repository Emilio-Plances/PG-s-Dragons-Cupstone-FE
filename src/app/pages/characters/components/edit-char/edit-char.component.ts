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
  loading:boolean=true;
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
        this.char=data.response;

        this.mod("str");  this.mod("dex");
        this.mod("con");  this.mod("int");
        this.mod("cha");  this.mod("wis");

        this.loading=false;
      })
    })
  }
  changeStatus(){
    if(this.char.status==Status.Private) this.char.status=Status.Public;
    else this.char.status=Status.Private
  }
  setClass(){
    this.setHP();
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
  mod(stat:string){
    switch(stat){
      case "str":
        this.modStr=Math.floor((this.char.strenght-10)/2);
        break;
      case "dex":
        this.modDex=Math.floor((this.char.dexterity-10)/2);
        break;
      case "con":
        this.modCon=Math.floor((this.char.constitution-10)/2);
        this.setHP();
        break;
      case "int":
        this.modInt=Math.floor((this.char.intelligence-10)/2);
        break;
      case "cha":
        this.modCha=Math.floor((this.char.charisma-10)/2);
        break;
      case "wis":
        this.modWis=Math.floor((this.char.wisdom-10)/2);
        break;
    }
  }
}
