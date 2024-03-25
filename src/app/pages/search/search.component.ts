import { ICharacter } from '../../interfaces/i-character';
import { ISpell } from '../../interfaces/ispell';
import { CharacterService } from '../../services/character.service';
import { PaginatorService } from '../../services/paginator.service';
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
  allUsers:IUser[]=[];
  allSpells:ISpell[]=[];
  allCharacters:ICharacter[]=[];

  usersPage:IUser[]=[];
  spellsPage:ISpell[]=[];
  charactersPage: ICharacter[]=[];

  currentCharacterPage: number = 1;
  currentUserPage: number=1;
  currentSpellPage: number=1;

  open:boolean=false;
  boolCharacters:boolean=false;
  boolUsers:boolean=false;
  boolSpells:boolean=false;
  filterType:boolean= false
  spellsMaxPage!: number;
  usersMaxPage!: number;
  charactersMaxPage!: number;

  constructor(
    private route:ActivatedRoute,
    private ls:LogService,
    private ss:SpellService,
    private cs:CharacterService,
    private ps:PaginatorService
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let searchValue = params.get('searchValue');
      if (searchValue) this.search=searchValue;
      if(!this.search) return;
      this.ls.searchByName(this.search).subscribe(data=>{
        this.allUsers=data.response;
        this.usersMaxPage=this.maxPages(this.allUsers);
        this.selectUsersPage();
        this.changeUsersPage(1);
      });
      this.ss.searchByName(this.search).subscribe(data=>{
        this.allSpells=data.response;
        this.spellsMaxPage=this.maxPages(this.allSpells);
        this.selectSpellsPage();
        this.changeSpellsPage(1);
      });
      this.cs.searchByName(this.search).subscribe(data=>{
        this.allCharacters=data.response;
        this.charactersMaxPage=this.maxPages(this.allCharacters);
        this.selectCharactersPage();
        this.changeCharactersPage(1);
      });
    });
  }
  selectCharactersPage(elements=5){
    this.charactersPage=this.ps.paginate(this.allCharacters,this.currentCharacterPage,elements);
  }
  selectUsersPage(elements=5){
    this.usersPage=this.ps.paginate(this.allUsers,this.currentUserPage,elements);
  }
  selectSpellsPage(elements=5){
    this.spellsPage=this.ps.paginate(this.allSpells,this.currentSpellPage,elements);
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
  ordernameAsc(){
    this.allSpells.reverse();
  }
  orderNameDesc(){
    this.allSpells.reverse();
  }
  changeSpellsPage(page:number) {
    this.currentSpellPage=page;
    this.selectSpellsPage();
  }
  changeUsersPage(page:number) {
    this.currentUserPage=page;
    this.selectUsersPage();
  }
  changeCharactersPage(page:number) {
    this.currentCharacterPage=page;
    this.selectCharactersPage();
  }
  maxPages(array:any[]):number{
    return this.ps.maxPages(array, 5);
  }
}
