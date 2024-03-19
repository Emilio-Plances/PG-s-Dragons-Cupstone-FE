import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { EditCharComponent } from './components/edit-char/edit-char.component';
import { NoEditComponent } from './components/no-edit/no-edit.component';
import { StatsComponent } from './components/no-edit/stats/stats.component';

@NgModule({
  declarations: [
    CharactersComponent,
    EditCharComponent,
    NoEditComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
  ]
})
export class CharactersModule { }
