import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGuard } from './guards/log.guard';
import { NoLogGuard } from './guards/noLog.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'logSystem', loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule),canActivate: [NoLogGuard] },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'myCharacters', loadChildren: () => import('./pages/my-characters/my-characters.module').then(m => m.MyCharactersModule),canActivate:[LogGuard] },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),canActivate:[LogGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
