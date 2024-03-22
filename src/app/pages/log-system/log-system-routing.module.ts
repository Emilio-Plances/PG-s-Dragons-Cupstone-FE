import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '',pathMatch:"full", redirectTo:"/logSystem/login" },
  { path: 'login', component:LoginComponent, title: 'Login | P&D'},
  { path: 'register', component:RegisterComponent, title: 'Register | P&D'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSystemRoutingModule {}
