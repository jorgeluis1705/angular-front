import { IDireccion } from './direccion.model';
export interface IUser {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  direccion: IDireccion;
}
