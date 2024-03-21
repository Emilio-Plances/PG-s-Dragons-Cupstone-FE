import { Background, Alignment, Classes } from './../../../../interfaces/enum';
import { Component, Inject } from '@angular/core';
import { ICharacter } from '../../../../interfaces/i-character';
import { Dice, Race, Status } from '../../../../interfaces/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { ISpell } from '../../../../interfaces/ispell';
import { SpellService } from '../../../../services/spell.service';
import { LogService } from '../../../log-system/service/log.service';
import { ISpellList } from '../../../../interfaces/iresponselist';

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
  dice!:number
  modStr!:number;
  modDex!:number;
  modCon!:number;
  modInt!:number;
  modCha!:number;
  modWis!:number;
  spells:ISpell[]=[];
  spellLvl:number=0;
  filteredSpells:ISpell[]=[];
  numberSpells!:number
  cantrips!:number

  constructor(
    @Inject('Swal') private swal: any,
    private route:ActivatedRoute,
    private cs:CharacterService,
    private ss:SpellService,
    private router:Router
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let idString:string|null = params.get('id');
      if (!idString) return;
      let id:number=parseInt(idString);

      this.cs.getById(id).subscribe(data=>{
        this.char=data.response;
        this.getSpells(this.char.pgClass[0]);
        this.mod("str");  this.mod("dex");
        this.mod("con");  this.mod("int");
        this.mod("cha");  this.mod("wis");
        this.setNumberSpell()
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
    this.getSpells(this.char.pgClass[0]);
    this.setNumberSpell()
  }
  setHP():void{
    switch(this.char.pgClass[0]){
      case Classes.Barbarian:
        this.dice=12;
        this.char.dice=Dice.D12;
        break;
      case Classes.Fighter:
      case Classes.Paladin:
      case Classes.Ranger:
        this.dice=10;
        this.char.dice=Dice.D10;
        break;
      case Classes.Bard:
      case Classes.Cleric:
      case Classes.Druid:
      case Classes.Rogue:
      case Classes.Monk:
      case Classes.Warlock:
        this.dice=8;
        this.char.dice=Dice.D8;
        break;
      case Classes.Sorcerer:
      case Classes.Wizard:
        this.dice=6;
        this.char.dice=Dice.D6;
        break;
    }
    this.char.hp=this.dice+this.modCon
  }
  setNumberSpell(){
    switch(this.char.pgClass[0]){
      case Classes.Barbarian:
      case Classes.Fighter:
      case Classes.Monk:
      case Classes.Rogue:
      case Classes.Paladin:
      case Classes.Ranger:
        this.numberSpells=0;
        this.cantrips=0;
        break;
      case Classes.Bard:
        this.numberSpells=4;
        this.cantrips=2;
        break;
      case Classes.Cleric:
        this.numberSpells=1+this.modCha;
        this.cantrips=3;
        break;
      case Classes.Druid:
        this.numberSpells=1+this.modWis;
        this.cantrips=2;
        break;
      case Classes.Sorcerer:
        this.numberSpells=1+this.modInt;
        this.cantrips=3;
        break;
      case Classes.Wizard:
        this.numberSpells=2;
        this.cantrips=4;
        break;
      case Classes.Warlock:
        this.numberSpells=2;
        this.cantrips=2;
        break;
    }
  }
  getSpells(pgClass:Classes):void{
    if(this.char.pgClass[0]==Classes.Paladin
      ||this.char.pgClass[0]==Classes.Ranger){
        this.spells=[];
        return
      }
    this.ss.getByClass(pgClass).subscribe(data=>{
      this.spells=data.response;
      this.filter();
    })
  }
  mod(stat:string):void{
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
  save():void{
    this.cs.edit(this.char).subscribe(() =>{
      this.swal.fire({
        position: "top-end",
        icon: "success",
        title: `Account updated!`,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/characters'])
    })
    })
  }
  filter():void{
    this.filteredSpells= this.spells.filter(el=>el.level==this.spellLvl);
  }

}
