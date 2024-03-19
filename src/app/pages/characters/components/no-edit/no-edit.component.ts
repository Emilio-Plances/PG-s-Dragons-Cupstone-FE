import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from '../../../../interfaces/i-character';
import { CharacterService } from '../../../../services/character.service';

@Component({
  selector: 'app-no-edit',
  templateUrl: './no-edit.component.html',
  styleUrl: './no-edit.component.scss'
})
export class NoEditComponent {
  loading!:boolean

  char!:ICharacter|undefined

  constructor(
    private route:ActivatedRoute,
    private cs:CharacterService
  ){this.loading=true;}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let idString:string|null = params.get('id');
      if (!idString) return;
      let id:number=parseInt(idString);
      this.cs.getById(id).subscribe(data=>{
        this.char=data.response
        this.loading=false;
      })
    })
  }
  printClass(){
    if(this.char?.pgClass[1]==null) return this.char?.pgClass[0];
    return this.char?.pgClass;
  }
}
