import { getUserActions } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
export const initialState = 0;

const _userReducer = createReducer(
  initialState,
  on(getUserActions, (state) => state + 1)
);

export function userReducer(state = initialState, action: any) {
  return _userReducer(state, action);
}
