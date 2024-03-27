import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ISpell } from '../../../../../interfaces/ispell';

@Component({
  selector: 'app-check-spell',
  templateUrl: './check-spell.component.html',
  styleUrl: './check-spell.component.scss'
})
export class CheckSpellComponent {
  @Input() spell!:ISpell;
  @Input() charSpell!:number[];
  @Output() cantripAction:EventEmitter<number>=new EventEmitter();
  @Output() spellAction:EventEmitter<number>=new EventEmitter();
  timeout!:any;

  constructor(
    @Inject('Swal') private swal: any,
  ){}
  description(name:string,description:string){
    this.swal.fire({
      title: name,
      text: description,
    });
  }
  descriptionFocus(name:string,description:string){
    this.timeout=setTimeout(() =>this.description(name,description), 1000);
  }
  clean(){
    clearTimeout(this.timeout);
  }
  isChecked(spellId:number):boolean{
    return this.charSpell.some(id => id==spellId);
  }
  action(){
    if(this.spell.level==0) this.cantripAction.emit(this.spell.id);
    else this.spellAction.emit(this.spell.id);
  }
}
