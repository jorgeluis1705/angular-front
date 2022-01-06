import { IUser } from './../../user/shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const getUsersActions = createAction(
  '[Fetch Users] Fetching',
  props<{ usersFetch: IUser[] }>()
);
export const getUserActions = createAction(
  '[get User] user find one',
  props<{ user: IUser }>()
);
