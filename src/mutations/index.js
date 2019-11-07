import gql from 'graphql-tag';

export const Crear_Cliente = 
gql `mutation crearCliente($input: ClienteInput) {
    crearCliente(input: $input) { 
      id
      nombre
      apellidos
    }
}`;

export const Actualizar_Cliente = gql `
  mutation actualizarCliente($input : ClienteInput) { 
	actualizarCliente(input: $input) { 
  	id
    nombre
    apellidos
    edad
    empresa
    tipo
    emails { 
    	email
    }
  }
}`;

export const Eliminar_Cliente = gql `
    mutation eliminarCliente($id: ID!) { 
    	eliminarCliente(id: $id)
}`;


export const new_Product = gql `
  mutation nuevoProducto($input: ProductoInput) { 
    nuevoProducto(input: $input){ 
    nombre,
    precio
  }
}`;

export const delete_Product = gql `
  mutation deleteProduct($id: ID!) { 
	  deleteProduct(id: $id)
}`;

export const update_Product = gql `
  mutation updateProduct($input: ProductoInput) { 
      updateProduct(input: $input) { 
      nombre
      precio
      stock
    }
}`;


export const Nuevo_Pedido = gql `
mutation nuevoPedido($input: PedidoInput ){
  nuevoPedido(input: $input) {
    total
    fecha
    pedido {
      cantidad
      id
    }
  }
}`;

export const Actualizar_Estado = gql `
mutation actualizarEstado($input : PedidoInput) {
  actualizarEstado(input: $input) 
}`;
