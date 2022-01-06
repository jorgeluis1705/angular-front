import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UsersMainComponent } from './components/users-main/users-main.component';

@NgModule({
  declarations: [UserComponent, UsersComponent, UsersMainComponent],
  imports: [CommonModule, MaterialModule, UserRoutingModule],
})
export class UserModule {}
