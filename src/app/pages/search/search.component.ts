import { ISpell } from '../../interfaces/ispell';
import { SpellService } from '../../services/spell.service';
import { LogService } from '../log-system/service/log.service';
import { IUser } from './../../interfaces/iuser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search!:string|null;
  users:IUser[]=[];
  spells:ISpell[]=[];
  usersPages!:number;
  spellPages!:number;

  open:boolean=false;
  boolCharacters:boolean=false;
  boolUsers:boolean=false;
  boolSpells:boolean=false;
  filterType:boolean= false

  constructor(
    private route:ActivatedRoute,
    private ls:LogService,
    private ss:SpellService
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let searchValue = params.get('searchValue');
      if (searchValue) this.search=searchValue;
      if(!this.search) return;
      this.ls.searchByName(this.search).subscribe(data=>{
        this.users=data.response.content
        this.usersPages=data.response.totalPages
      });
      this.ss.searchByName(this.search).subscribe(data=>{
        this.spells=data.response.content;
        this.spellPages=data.response.totalPages;
      });
    });
  }
  isFilterActive(){
    this.filterType= this.boolCharacters || this.boolUsers || this.boolSpells;
  }
  changeCharacters(event:boolean){
    this.boolCharacters=event;
    this.isFilterActive();
  }
  changeUsers(event:boolean){
    this.boolUsers=event;
    this.isFilterActive();
  }
  changeSpells(event:boolean){
    this.boolSpells=event;
    this.isFilterActive();
  }
  orderNameDesc(){
    if(!this.search) return;

    this.ls.searchByName(this.search).subscribe(data=>{
      this.users=data.response.content
    });

    this.ss.searchByName(this.search).subscribe(data=>{
      this.spells=data.response.content;
    });
  }
  ordernameAsc(){
    if(!this.search) return;

    this.ls.searchByName(this.search).subscribe(data=>{
      this.users=data.response.content
      this.users.reverse();
    });
    this.ss.searchByName(this.search).subscribe(data=>{
      this.spells=data.response.content;
      this.spells.reverse();
    });
  }
}
