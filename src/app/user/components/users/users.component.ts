import { IUser } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {}
}
