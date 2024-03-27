import { Classes } from './../../../../interfaces/enum';
import { Component, Inject } from '@angular/core';
import { ICharacter } from '../../../../interfaces/i-character';
import { Dice, Race, Status } from '../../../../interfaces/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { ISpell } from '../../../../interfaces/ispell';
import { SpellService } from '../../../../services/spell.service';
import { LogService } from '../../../log-system/service/log.service';
import { IPutCharacterRequest } from '../../../../interfaces/irequest';

@Component({
  selector: 'app-edit-char',
  templateUrl: './edit-char.component.html',
  styleUrl: './edit-char.component.scss'
})
export class EditCharComponent {
  isCollapsed:boolean=true;
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
  totalNumberSpells!:number;
  totalCantrips!:number;
  numberSpells:number=0;
  cantrips:number=0;
  stop:boolean=false;
  timeout!:any;
  spellsId!:number[];
  request!:IPutCharacterRequest;
  selectedSpells!:ISpell[]

  constructor(
    @Inject('Swal') private swal: any,
    private route:ActivatedRoute,
    private cs:CharacterService,
    private ss:SpellService,
    private router:Router,
    private ls:LogService,
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let idString:string|null = params.get('id');
      if (!idString) return;
      let id:number=parseInt(idString);
        this.cs.getById(id).subscribe(data=>{
        this.char=data.response;
        this.ls.user$.subscribe(auth=>{
          if(!auth) return;
          if(auth?.user.id!=this.char.user?.id) {
            this.stop=true
            this.swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You can't stay here!",
            }).then(()=>this.router.navigate(['']));
          }
          this.mod("str");  this.mod("dex");
          this.mod("con");  this.mod("int");
          this.mod("cha");  this.mod("wis");
          this.selectedSpells=this.char.spells;
          this.getSpellsId();
          if(this.char.pgClass[0]==null) return;
          this.getSpells(this.char.pgClass[0]);
          this.setNumberSpell()
        });
        this.loading=false;
      })
    })
  }
  changeStatus(){
    if(this.char.status==Status.Private) this.char.status=Status.Public;
    else this.char.status=Status.Private
  }
  setClass(){
    this.cantrips=0;
    this.numberSpells=0;
    this.spellsId=[];
    this.selectedSpells=[];
    this.setHP();
    this.getSpells(this.char.pgClass[0]);
    this.setNumberSpell();
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
        this.totalNumberSpells=0;
        this.totalCantrips=0;
        break;
      case Classes.Bard:
        this.totalNumberSpells=4;
        this.totalCantrips=2;
        break;
      case Classes.Cleric:
        this.totalNumberSpells=1+this.modCha;
        this.totalCantrips=3;
        break;
      case Classes.Druid:
        this.totalNumberSpells=1+this.modWis;
        this.totalCantrips=2;
        break;
      case Classes.Sorcerer:
        this.totalNumberSpells=1+this.modInt;
        this.totalCantrips=3;
        break;
      case Classes.Wizard:
        this.totalNumberSpells=2;
        this.totalCantrips=4;
        break;
      case Classes.Warlock:
        this.totalNumberSpells=2;
        this.totalCantrips=2;
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
  filter():void{
    this.filteredSpells= this.spells.filter(el=>el.level==this.spellLvl);
  }
  getSpellsId(){
    this.spellsId= this.char.spells.map(spell=>{
      if(spell.level==0) this.cantrips++;
      else this.numberSpells++;
      return spell.id;
    });
  }
  cantripAction(id:number) {
    if(this.spellsId.some(el=>el==id)) {
      this.spellsId=this.spellsId.filter(el=>el!=id);
      this.selectedSpells=this.selectedSpells.filter(el=>el.id!=id);
      this.cantrips--;
    } else {
      this.spellsId.push(id);
      let spell:ISpell|undefined=this.spells.find(el=>el.id==id)
      if(spell) this.selectedSpells.push(spell);
      this.cantrips++;
    }
  }
  spellAction(id:number) {
    if(this.spellsId.some(el=>el==id)){
      this.spellsId=this.spellsId.filter(el=>el!=id);
      this.selectedSpells=this.selectedSpells.filter(el=>el.id!=id);
      this.numberSpells--;
    } else{
      this.spellsId.push(id);
      let spell:ISpell|undefined=this.spells.find(el=>el.id==id)
      if(spell) this.selectedSpells.push(spell);
      this.numberSpells++;
    }
  }
  save():void{
    if(this.cantrips>this.totalCantrips||this.numberSpells>this.totalNumberSpells){
      this.swal.fire({
        position: "top-end",
        icon: "error",
        title: `Can't save! You must respect spell limits!`,
        showConfirmButton: false,
        timer: 2000
      })
      return
    }
    this.request={...this.char,spellsId: this.spellsId};
    this.cs.edit(this.request).subscribe(() =>{
      this.swal.fire({
        position: "top-end",
        icon: "success",
        title: `Character updated!`,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/characters'])
      })
    })
  }
}
