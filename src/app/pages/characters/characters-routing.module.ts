import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { EditCharComponent } from './components/edit-char/edit-char.component';
import { LogGuard } from '../../guards/log.guard';
import { NoEditComponent } from './components/no-edit/no-edit.component';


const routes: Routes = [
  { path: '', component: CharactersComponent, title: 'My characters | P&D',canActivate:[LogGuard] },
  { path:'edit/:id', component: EditCharComponent, title: 'Edit | P&D',canActivate:[LogGuard] },
  { path:'noEdit/:id', component: NoEditComponent, title: 'No Edit | P&D'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule {}
