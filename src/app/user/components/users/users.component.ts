import { IUser } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  constructor(private activate: ActivatedRoute) {
    console.log(this.activate.snapshot.data);
    this.users = (this.activate.snapshot.data as any).users as IUser[];
  }

  dataSource: MatTableDataSource<IUser> | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }
  displayedColumns: string[] = [
    'position',
    'nombre',
    'apellidoP',
    'apellidoM',
    'telefono',
    'direccion',
  ];
}
