import { Component, Input } from '@angular/core';
import { ISpell } from '../../../../interfaces/ispell';

@Component({
  selector: 'app-spell-block',
  templateUrl: './spell-block.component.html',
  styleUrl: './spell-block.component.scss'
})
export class SpellBlockComponent {
  @Input() spell!:ISpell
}
