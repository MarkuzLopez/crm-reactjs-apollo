import React, { Component } from 'react';
import DatosClientes from './DatosCliente';
import { Query } from 'react-apollo';
import { Products_Query } from '../../queries';
import ContenidoPedido from './ContenidoPedido';
import { withRouter } from 'react-router-dom';

class NuevoPedido extends Component{ 
    render() {        
        const { id } = this.props.match.params;
        
        const idVendedor = this.props.session.obtenerUsuario.id;
       console.log(idVendedor); 
       return(
            <React.Fragment>
                <h1 className="text-center mb-5">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <DatosClientes id={id} />
                    </div>
                    <div className="col-md-9" >
                         <Query query={Products_Query} variables={{stock: true}} >
                             {({loading, error, data }) => { 
                                 if(loading) return 'Cargando...';
                                 if(error) return `Eerror ${error}`;
                                 // console.log(data.obtainProducts);

                                 return(
                                     <ContenidoPedido  
                                        productos={data.obtainProducts}
                                        id={id}
                                        idVendedor={idVendedor}
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

export default withRouter (NuevoPedido);