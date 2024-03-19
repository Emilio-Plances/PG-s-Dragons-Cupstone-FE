import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  @Input() input!:number|undefined
  stat!:number

  ngOnInit(){
    if(!this.input) this.stat =0;
    else this.stat=this.input;
  }
  modifier(stat:number):number{
    return Math.floor((stat-10)/2);
  }
}
