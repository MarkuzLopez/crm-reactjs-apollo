import React, { Component } from 'react';
// importacion de apollo y las consultaa 
import { Query } from 'react-apollo';
import { Cliente_Query } from '../queries';
import FormularioEditar from './FormularioEditar';

class EditarCliente extends Component { 
    state = { }
    
    render(){ 
        // obtenner el idd, por medio del paaraams 
        const { id } = this.props.match.params;        
        return (
            <React.Fragment>
                <h2 className="text-center">Editar Cliente</h2>
                <div className="row justify-content-center">                    
                <Query query={Cliente_Query} variables={{id}} >
                    {({loading, error, data } ) => {
                        if(loading) return 'Caargando...';
                        if(error) return `Error ${error.message}`;                        
                       ///s console.log(data);
                       console.log(this.props);
                       
                        return(
                            <FormularioEditar 
                              cliente={data.getCliente}                              
                            />
                        )                                         
                    }}
                </Query>
                </div>
            </React.Fragment>
        )
    }
}

export default EditarCliente;