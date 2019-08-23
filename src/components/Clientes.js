import React from 'react';
import { Query } from 'react-apollo';
import { Clientes_Query } from '../queries';
import { Link } from 'react-router-dom';

const  Clientes = () => (
    // TODO se pasara el pollInterval (Query) para que tenga la senssacion de que sea en tiempo real , y se agregaran doss parametros en el callback
    <Query query={Clientes_Query} pollInterval={800} >
            {({loading, error, data, startPolling, stopPolling}) => { 
                if (loading) return "Cargando..."
                if (error) return `Error: ${error.message}`
                console.log(data.getClientes);
                return (
                    <React.Fragment>
                        <h2 className="text-center">Listado de Clientes </h2>
                        <ul className="list-group mt-4">
                            {data.getClientes.map(cliente => (
                                <li key={cliente.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center" >
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                {cliente.nombre} {cliente.apellidos}
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Link className="btn btn-success d-block" to={`/cliente/editar/${cliente.id}`} >Editar Cliente</Link>                                            
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                );
            }}        

    </Query>

 )
 
export default Clientes;