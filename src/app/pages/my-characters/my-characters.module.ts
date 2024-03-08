import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCharactersRoutingModule } from './my-characters-routing.module';
import { MyCharactersComponent } from './my-characters.component';


@NgModule({
  declarations: [
    MyCharactersComponent
  ],
  imports: [
    CommonModule,
    MyCharactersRoutingModule
  ]
})
export class MyCharactersModule { }
