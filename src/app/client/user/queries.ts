import { gql } from 'apollo-angular';
export const GET_USERS = gql`
  query getUsers {
    getUsers {
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

export const GET_USER = gql`
  query getUser($id: String) {
    getUser(id: $id) {
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
