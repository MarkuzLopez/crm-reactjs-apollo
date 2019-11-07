import React from 'react';
import { Query } from 'react-apollo';
import { getPedidos } from '../../queries';
import Pedido from './Pedido';

const PedidosClientes = (props) => {

    const cliente =  props.match.params.id;
    
    return (
        <React.Fragment>
            <h1 className="text-center mb-5">Pedidos de cliente</h1>
            <div className="row">
                <Query query={getPedidos} variables={{cliente}} pollInterval={500}>
                    {({loading, error,  data, startPolling, stopPolling}) => {
                        if(loading) return 'Cargando...';
                        if(error) return `Error: ${error.message}`;
                        // console.log(data);
                       return(
                         data.obtenerPedidos.map( pedido => (
                             <Pedido
                                key={pedido.id}
                                pedido={pedido}
                                cliente={cliente}
                             />
                         ))
                       )
                    }}
                </Query>
            </div>
        </React.Fragment>
     );
}
 
export default PedidosClientes;