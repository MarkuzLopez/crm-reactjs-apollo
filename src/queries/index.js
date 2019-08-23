import gql from "graphql-tag";

export const Clientes_Query = gql `{ 
	getClientes{
    id
    nombre
    apellidos
    edad
    empresa
  }
}`;


export const Cliente_Query = gql `
  query consultarCliente($id: ID) { 
    getCliente(id: $id) { 
      id
      nombre
      apellidos
      empresa
      edad
      tipo
      emails { 
        email
      }
    }
}`;