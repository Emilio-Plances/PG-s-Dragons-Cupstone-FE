import { Component, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrl: './userblock.component.scss'
})
export class UserblockComponent {
  @Input() user!:IUser
}
