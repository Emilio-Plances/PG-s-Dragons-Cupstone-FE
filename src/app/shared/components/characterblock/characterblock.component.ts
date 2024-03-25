import { Component, Input } from '@angular/core';
import { ICharacter } from '../../../interfaces/i-character';

@Component({
  selector: 'app-characterblock',
  templateUrl: './characterblock.component.html',
  styleUrl: './characterblock.component.scss'
})
export class CharacterblockComponent {
  @Input() char!:ICharacter;

  printClass(char:ICharacter):string{
    if(char.pgClass.length==0) return 'None';
    if(!char.pgClass[1]) return char.pgClass[0];
    return char.pgClass.toString();
  }
}
