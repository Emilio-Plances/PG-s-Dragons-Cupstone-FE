import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() charactersEvent = new EventEmitter<boolean>();
  @Output() usersEvent = new EventEmitter<boolean>();
  @Output() spellsEvent = new EventEmitter<boolean>();

  boolCharacters:boolean=false;
  boolUsers:boolean=false;
  boolSpells:boolean=false;

  changeCharacters(){
    this.charactersEvent.emit(this.boolCharacters);
  }
  changeUsers(){
    this.usersEvent.emit(this.boolUsers);
  }
  changeSpells(){
    this.spellsEvent.emit(this.boolSpells);;
  }
}
