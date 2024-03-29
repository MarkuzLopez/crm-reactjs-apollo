import gql from "graphql-tag";

// export const Clientes_Query = gql `{ 
// 	getClientes{
//     id
//     nombre
//     apellidos
//     edad
//     empresa
//   }
 /// instalarr dragula 
//  video https://www.youtube.com/watch?v=1TEeCJwXmVE
/// https://stackblitz.com/edit/ng2-dragula-base?file=src%2Fapp%2Fapp.component.ts
//   totalClientes
// }`;
export const Clientes_Query = gql `
   query getClientes($limite: Int, $offset: Int, $vendedor: String){
     getClientes(limite: $limite, offset: $offset, vendedor:  $vendedor) {
       id
       nombre
       apellidos
       empresa
     }
     totalClientes(vendedor: $vendedor)

   }
`;


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

export const Products_Query = gql `
 query obtainProducts($limite: Int, $offset: Int, $stock: Boolean ) { 
	obtainProducts(limite: $limite, offset: $offset, stock: $stock) { 
  	id
    nombre
    precio
    stock
  }
  totalProducts
} `;


export const getProducto = gql `
query obtenerProducto($id: ID) { 
	getProduct(id: $id) { 
  	nombre
    precio
    stock
  }
}`;

export const getPedidos = gql `
query obtenerPedidos($cliente: String) {
  obtenerPedidos(cliente: $cliente) {
    id
    total
    fecha
    estado
    pedido {
      id
      cantidad
    }
  }
}`;


export const TOP_CLIENTES = gql `
  query topClientes{ 
    topClientes{
      total
      cliente { 
      nombre
      }
    }
  }`;

//  Usuaarios 
export const Usuario_Actual = gql`
 query obtenerUsuario{ 
  obtenerUsuario {
    id,
    usuario,
    nombre,
    rol
  }
 }`; 