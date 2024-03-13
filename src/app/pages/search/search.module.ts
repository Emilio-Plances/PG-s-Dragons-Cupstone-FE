import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { UserblockComponent } from './components/userblock/userblock.component';
import { CharacterblockComponent } from './components/characterblock/characterblock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SearchComponent,
    UserblockComponent,
    CharacterblockComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    NgbModule,
  ]
})
export class SearchModule { }
