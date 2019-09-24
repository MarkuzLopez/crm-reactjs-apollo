import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Clientes_Query } from '../../queries';
import { Link } from 'react-router-dom';
import { Eliminar_Cliente } from '../../mutations';

import Swal from 'sweetalert2'
import Paginador from '../Paginador';


class Clientes extends  Component {
    // se cambio del componente de funcion a claases 
    // y se agregaráa el estaado paraa poder realizaar la paginación
    limite  =  5;
    state = { 
        paginador: {
            offset: 0,
            actual: 1
        }
    }

    paginaAnterior = () => {
        this.setState({ 
            paginador:{
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })      
    }
    paginaSiguiente = () => {        
        this.setState({
            paginador:{
                offset: this.state.paginador.offset +  this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }
    render() {
        const {actual} = this.state.paginador;        
        return (
            // TODO se pasara el pollInterval (Query) para que tenga la senssacion de que sea en tiempo real , y se agregaran doss parametros en el callback
            <Query query={Clientes_Query} pollInterval={800} variables={{limite: this.limite, offset: this.state.paginador.offset}} >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return "Cargando..."
                    if (error) return `Error: ${error.message}`                    
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
                                                <Link to={`/pedidos/nuevo/${cliente.id}`} className="btn btn-warning d-block d-md-inline-block mr-2" >Nuevo Pedido</Link>
                                                <Mutation mutation={Eliminar_Cliente} >
                                                    {eliminarCliente => (
                                                        <button className="btn btn-danger d-block d-md-inline-block mr-2"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: '¿Estas Seguro?',
                                                                    text: "Puedes eliminarlo, pero no habra marcha atras!",
                                                                    type: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: '#3085d6',
                                                                    cancelButtonColor: '#d33',
                                                                    confirmButtonText: 'Si, Eliminarlo!!'
                                                                }).then((result) => {
                                                                    if (result.value) {
                                                                        var id = cliente.id;
                                                                        eliminarCliente({
                                                                            variables: { id }
                                                                        })
                                                                        Swal.fire(
                                                                            'Eliminado Correctaamente!',
                                                                            '',
                                                                            'success'
                                                                        )
                                                                    }
                                                                })
                                                            }}
                                                        >&times; Borrar </button>
                                                    )}
                                                </Mutation>
                                                <Link className="btn btn-success d-block" to={`/clientes/editar/${cliente.id}`} >Editar Cliente</Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Paginador 
                                actual={actual}
                                totalClientes={data.totalClientes}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </React.Fragment>
                    );
                }}

            </Query>

        )
    }   
}
 
export default Clientes;