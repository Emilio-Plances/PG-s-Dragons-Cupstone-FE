import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'logSystem', loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'myCharacters', loadChildren: () => import('./pages/my-characters/my-characters.module').then(m => m.MyCharactersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
