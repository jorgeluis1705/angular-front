import { getUserActions } from './../../../store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userStore!: Observable<any>;

  constructor(
    private activate: ActivatedRoute,
    private store: Store<{ users: any }>,
    protected router: Router
  ) {
    this.store.dispatch(
      getUserActions({
        user: (this.activate.snapshot.data as any).user as IUser,
      })
    );
    this.userStore = store.select('users');
    this.userStore.subscribe((e) => console.log(e));
  }

  ngOnInit(): void {}
}
