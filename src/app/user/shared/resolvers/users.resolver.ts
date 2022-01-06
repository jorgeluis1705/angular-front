import { GET_USERS } from './../../../client/user/mutations';
import { Apollo } from 'apollo-angular';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<IUser[]> {
  constructor(private apollo: Apollo) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser[]> {
    return new Observable((obs) => {
      this.apollo
        .watchQuery({
          query: GET_USERS,
        })
        .valueChanges.subscribe((result: any) => {
          console.log(result);
        });
      obs.next([]);
      obs.complete();
    });
  }
}
