import { getUserActions } from './../actions/user.actions';
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
  on(getUserActions, (state) => {
    return {
      ...state,
      users: [],
    };
  })
);

export function userReducer(state = initialState, action: any) {
  return _userReducer(state, action);
}
