import { Apollo } from 'apollo-angular';
import { getUsersActions, getUserActions } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/user/shared/models/user.model';

interface IinitialState {
  users: IUser[];
  userSelected: IUser;
}
export const initialState: IinitialState = {
  users: [],
  userSelected: {
    id: '',
    nombre: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    telefono: '',
    direccion: {
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
    },
  },
};

const _userReducer = createReducer(
  initialState,
  on(getUsersActions, (state, action) => {
    return {
      ...state,
      users: action.usersFetch,
    };
  }),
  on(getUserActions, (state, actions) => {
    return {
      ...state,
      userSelected: actions.user,
    };
  })
);

export function userReducer(state = initialState, action: any) {
  return _userReducer(state, action);
}
