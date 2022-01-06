import { gql } from 'apollo-angular';
export const CREATE_USER = gql`
  mutation createUser(
    $nombre: String
    $apellidoPaterno: String
    $apellidoMaterno: String
    $telefono: String
    $direccion: DireccionInput
  ) {
    createUser(
      nombre: $nombre
      apellidoPaterno: $apellidoPaterno
      apellidoMaterno: $apellidoMaterno
      telefono: $telefono
      direccion: $direccion
    ) {
      nombre
      apellidoPaterno
      apellidoMaterno
      id
      telefono
      direccion {
        calle
        numero
        ciudad
        estado
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String
    $nombre: String
    $apellidoPaterno: String
    $apellidoMaterno: String
    $telefono: String
    $direccion: DireccionInput
  ) {
    updateUser(
      id: $id
      nombre: $nombre
      apellidoPaterno: $apellidoPaterno
      apellidoMaterno: $apellidoMaterno
      telefono: $telefono
      direccion: $direccion
    ) {
      nombre
      apellidoPaterno
      apellidoMaterno
      id
      telefono
      direccion {
        calle
        numero
        ciudad
        estado
      }
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: String) {
    deleteUser(id: $id)
  }
`;
