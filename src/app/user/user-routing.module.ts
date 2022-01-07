import { UserNewComponent } from './components/user-new/user-new.component';
import { UserResolver } from './shared/resolvers/user.resolver';
import { UsersMainComponent } from './components/users-main/users-main.component';
import { UsersResolver } from './shared/resolvers/users.resolver';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: UsersMainComponent,
    children: [
      {
        path: 'new',
        component: UserNewComponent,
      },
      {
        path: 'list',
        component: UsersComponent,
        resolve: { users: UsersResolver },
      },
      {
        path: ':id',
        component: UserComponent,
        resolve: { user: UserResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
