import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import Swal from 'sweetalert2';
import { NoEditComponent } from './components/no-edit/no-edit.component';
import { EditComponent } from './components/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NoEditComponent,
    EditComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'Swal', useValue: Swal }
  ]
})
export class ProfileModule { }
