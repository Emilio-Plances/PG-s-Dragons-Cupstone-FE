import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCharactersComponent } from './my-characters.component';
import { LogService } from '../log-system/service/log.service';

const routes: Routes = [{ path: '', component: MyCharactersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCharactersRoutingModule {}
