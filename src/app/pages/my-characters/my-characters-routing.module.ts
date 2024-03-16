import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCharactersComponent } from './my-characters.component';


const routes: Routes = [
  { path: '', component: MyCharactersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCharactersRoutingModule {}
