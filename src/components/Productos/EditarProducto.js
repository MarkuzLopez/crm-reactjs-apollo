import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { getProducto } from '../../queries';
import FormularioEditarProducto from './FormularioEditarProducto';

class EditarProducto extends Component { 
    render() {         
        // obtener el id del parametro de la url 
        const { id } = this.props.match.params;

        return(
            <React.Fragment>
                <h2 className="text-center">Editar Producto </h2>
                <div className="row justify-content-center">
                 <Query query={getProducto} variables={{id}} >
                     {({loading, error, data, refetch}) => { 
                         if(loading) return 'Cargando...';
                         if(error) return `Error ${error}`;                         
                         
                         return(
                             <FormularioEditarProducto 
                                product={data}
                                id={id}
                                refetch={refetch}
                             />
                         )
                     }}

                 </Query>
                </div>
            </React.Fragment>
        )
    }
}

export default EditarProducto;