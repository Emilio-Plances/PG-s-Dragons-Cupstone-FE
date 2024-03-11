import { Component, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser';

@Component({
  selector: 'app-no-edit',
  templateUrl: './no-edit.component.html',
  styleUrl: './no-edit.component.scss'
})
export class NoEditComponent {
  @Input() user!:IUser|undefined;
  photo!:string;

  ngOnInit(){
  this.photo=this.user?.linkPhoto? this.user?.linkPhoto:'../../../assets/images/user-missing.png';
  }
}
