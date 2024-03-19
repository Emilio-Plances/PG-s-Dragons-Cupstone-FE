import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoLogGuard } from './guards/noLog.guard';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'logSystem', loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule),canActivate: [NoLogGuard] },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'characters', loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule)},
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'search/:searchValue', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule) },
  { path: 'spellDetails/:id', loadChildren: () => import('./pages/spell-details/spell-details.module').then(m => m.SpellDetailsModule) },
  { path: '**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
