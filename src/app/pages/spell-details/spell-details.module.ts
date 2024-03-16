import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpellDetailsRoutingModule } from './spell-details-routing.module';
import { SpellDetailsComponent } from './spell-details.component';


@NgModule({
  declarations: [
    SpellDetailsComponent
  ],
  imports: [
    CommonModule,
    SpellDetailsRoutingModule
  ]
})
export class SpellDetailsModule { }
