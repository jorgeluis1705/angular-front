import { GET_USERS } from './../../../client/user/queries';
import { DELETE_USER } from './../../../client/user/mutations';
import { Apollo } from 'apollo-angular';
import {
  deleteUserAction,
  getUsersActions,
} from './../../../store/actions/user.actions';
import { IUser } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userStore: Observable<any>;
  constructor(
    private activate: ActivatedRoute,
    private store: Store<{ users: any }>,
    protected router: Router,
    private apollo: Apollo
  ) {
    this.store.dispatch(
      getUsersActions({
        usersFetch: (this.activate.snapshot.data as any).users as IUser[],
      })
    );
    this.userStore = store.select('users');
  }

  dataSource: MatTableDataSource<IUser> | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.userStore.subscribe({
      next: (e) => (this.dataSource = new MatTableDataSource(e.users)),
      error: () => (this.dataSource = new MatTableDataSource([] as IUser[])),
    });
  }
  displayedColumns: string[] = [
    'position',
    'nombre',
    'apellidoP',
    'apellidoM',
    'telefono',
    'direccion',
    'acciones',
  ];
  onName(id: string): void {
    this.router.navigate(['/users', id]);
  }
  onDelte(id: string): void {
    this.store.dispatch(
      deleteUserAction({
        id,
      })
    );
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: { id },
        update: (cache, { data }) => {
          if (data) {
            const existing: any = cache.readQuery({
              query: GET_USERS,
            });
            if (existing) {
              cache.writeQuery({
                query: GET_USERS,

                data: {
                  getUsers: (existing.getUsers as IUser[]).filter(
                    (e) => e.id !== id
                  ),
                },
              });
            }
          }
        },
      })
      .subscribe((e) => e);
  }
  click() {}
}
