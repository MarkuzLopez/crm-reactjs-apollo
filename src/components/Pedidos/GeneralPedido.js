import React from 'react'
import { Mutation } from 'react-apollo';
import { Nuevo_Pedido } from '../../mutations';
import { withRouter } from 'react-router-dom';

// funcion 
const validarPedido = (props) => { 
    /// que no puedaa generar el pedido  cuaando tenga cero y cuando sea numeros negaativos
    let noValido = !props.productos || props.total <= 0;
    return noValido;
}

const GenerarPedido = (props) => {
   // console.log(props);
    
    return (  
      <Mutation 
        mutation={Nuevo_Pedido}
        onCompleted={ ()  => props.history.push('/clientes')}
      >
          { nuevoPedido => (
              <button
                disabled={validarPedido(props)}
                type="button"
                className="btn btn-warning mt-4"
                onClick={ e => {
                    // console.log(props.productos);

                    const productosInput =  props.productos.map(({nombre, precio, stock, ...objeto}) => objeto);
                   // console.log(productosInput);
                    
                    const input = {
                        pedido: productosInput,
                        total: props.total,
                        cliente: props.idCliente,
                        vendedor: props.idVendedor
                    }
                     console.log(input);

                    nuevoPedido({
                        variables: {input}
                    })

                }}                 
              >
               Generar Pedido
              </button>
          )}
      </Mutation>
    );
}
 
export default withRouter(GenerarPedido);