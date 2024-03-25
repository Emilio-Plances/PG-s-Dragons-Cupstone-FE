import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterblockComponent } from './components/characterblock/characterblock.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CharacterblockComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CharacterblockComponent,
  ]
})
export class SharedModule { }
