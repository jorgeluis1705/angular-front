import { getUserActions } from './../../../store/actions/user.actions';
import { IUser } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private store: Store<{ users: any }>
  ) {
    this.store.dispatch(
      getUserActions({
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
    console.log(id);
  }
  onDelte(id: string): void {
    console.log(id);
  }
  click() {}
}
