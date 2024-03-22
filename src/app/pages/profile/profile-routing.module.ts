import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NoEditComponent } from './components/no-edit/no-edit.component';
import { LogGuard } from '../../guards/log.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent,canActivate:[LogGuard],title: 'Profile | P&D' },
  { path: 'changePassword', component: ChangePasswordComponent,canActivate:[LogGuard],title: 'Change Password | P&D'},
  { path: 'noEdit/:id', component: NoEditComponent,title: 'Profile | P&D'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
