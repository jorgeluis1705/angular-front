import { IUser } from './../../user/shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const getUserActions = createAction(
  '[Login Page] Login',
  props<{ usersFetch: IUser[] }>()
);
