import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { EditCharComponent } from './components/edit-char/edit-char.component';
import { NoEditComponent } from './components/no-edit/no-edit.component';
import { StatsComponent } from './components/no-edit/stats/stats.component';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CharactersComponent,
    EditCharComponent,
    NoEditComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    { provide: 'Swal', useValue: Swal }
  ]
})
export class CharactersModule { }
