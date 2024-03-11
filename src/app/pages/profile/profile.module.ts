import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import Swal from 'sweetalert2';
import { NoEditComponent } from './components/no-edit/no-edit.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NoEditComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    { provide: 'Swal', useValue: Swal }
  ]
})
export class ProfileModule { }
