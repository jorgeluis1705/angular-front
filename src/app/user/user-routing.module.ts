import { UsersResolver } from './shared/resolvers/users.resolver';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    resolve: [UsersResolver],
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'detalles',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
