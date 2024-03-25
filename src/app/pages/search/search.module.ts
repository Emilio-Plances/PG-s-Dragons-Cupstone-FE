import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { UserblockComponent } from './components/userblock/userblock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './components/filter/filter.component';
import { OrderComponent } from './components/order/order.component';
import { SpellBlockComponent } from './components/spell-block/spell-block.component';
import { PageChangerComponent } from './components/page-changer/page-changer.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SearchComponent,
    UserblockComponent,
    FilterComponent,
    OrderComponent,
    SpellBlockComponent,
    PageChangerComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class SearchModule { }
