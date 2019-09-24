import React, { Component } from 'react';
import DatosClientes from './DatosCliente';
import { Query } from 'react-apollo';
import { Products_Query } from '../../queries';
import ContenidoPedido from './ContenidoPedido';

class NuevoPedido extends Component{ 
    render() {        
        const { id } = this.props.match.params;
       // console.log(id);
        
        return(
            <React.Fragment>
                <h1 className="text-center mb-5">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <DatosClientes id={id} />
                    </div>
                    <div className="col-md-9" >
                         <Query query={Products_Query} >
                             {({loading, error, data }) => { 
                                 if(loading) return 'Cargando...';
                                 if(error) return `Eerror ${error}`;
                                 // console.log(data.obtainProducts);

                                 return(
                                     <ContenidoPedido  
                                        productos={data.obtainProducts}
                                        id={id}
                                     />
                                 )
                             }}

                         </Query>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NuevoPedido;