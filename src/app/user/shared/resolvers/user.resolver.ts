import { GET_USER } from './../../../client/user/queries';
import { IUser } from 'src/app/user/shared/models/user.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<IUser> {
  constructor(private apollo: Apollo) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser> {
    return new Observable((obs) => {
      this.apollo
        .watchQuery({
          query: GET_USER,
          variables: { id: route.params['id'] },
        })
        .valueChanges.subscribe({
          next: (e: any) => {
            obs.next(e.data?.getUser);
            obs.complete();
          },
          error: (err) => obs.error(err),
        });
    });
  }
}
