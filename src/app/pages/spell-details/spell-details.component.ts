import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpellService } from '../../services/spell.service';
import { ISpell, School } from '../../interfaces/ispell';

@Component({
  selector: 'app-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrl: './spell-details.component.scss'
})
export class SpellDetailsComponent {

  spell:ISpell={
    id: 0,
    name: '',
    pgClasses: [],
    level: 0,
    castTime: '',
    range: '',
    duration: '',
    components: [],
    materialCost: '',
    description: '',
    school: School.Abjuration
  }

  constructor(
    private route:ActivatedRoute,
    private ss:SpellService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let spellId:string|null = params.get('id');
      if(!spellId) return;
      let id:number=Number(spellId);
      this.ss.getSingleById(id).subscribe(data=>this.spell=data.response)
    });
  }
}
