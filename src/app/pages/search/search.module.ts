import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { UserblockComponent } from './components/userblock/userblock.component';
import { CharacterblockComponent } from './components/characterblock/characterblock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './components/filter/filter.component';
import { OrderComponent } from './components/order/order.component';
import { SpellBlockComponent } from './components/spell-block/spell-block.component';


@NgModule({
  declarations: [
    SearchComponent,
    UserblockComponent,
    CharacterblockComponent,
    FilterComponent,
    OrderComponent,
    SpellBlockComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    NgbModule,
  ]
})
export class SearchModule { }
