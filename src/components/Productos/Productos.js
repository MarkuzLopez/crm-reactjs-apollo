import React, { Component } from 'react';
// consulta de queries y de schema
import { Query, Mutation } from 'react-apollo';
import { Products_Query } from '../../queries';

import { Link } from 'react-router-dom';
import { delete_Product } from '../../mutations';
import Exito from '../shared/Exito';
import Paginador from '../Paginador';

class Productos extends Component  { 
    state = { 
        paginador: { 
            offset: 0,
            actual: 1
        },
        alerta: { 
            mostrar: false,
            mensaje: ''
        }
    }

    limite = 4;

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
        // obtener los valores del estado su inicializacion 
        const {alerta: { mostrar, mensaje} } = this.state;
        // evalua el status si la alerta se encuentra en true mandara el mensaje de exito y pasara a tru el mostrar sino de lo contrario mandara el menssaje  vacio
        const alerta =  (mostrar) ? <Exito mensaje={mensaje} /> : '';        

        return(
            <React.Fragment>
                <h1 className="text-center mb-5">Productos </h1>
                {alerta}
                <Query
                    query={Products_Query} pollInterval={1000}
                    variables={{limite: this.limite, offset: this.state.paginador.offset}}
                >
                {({ loading, error, data,  startPolling, stopPolling }) => { 
                    if(loading) return 'Cargando...'
                    if(error) return `Error: ${error.message}`
                   // console.log(data);

                    return(
                        <React.Fragment>
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Existencia</th>
                                    <th scope="col">Eliminar</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.obtainProducts.map(product => (
                                    <tr key={product.id} >
                                        <th>{product.nombre}</th>
                                        <th>{product.precio}</th>
                                        <th>{product.stock}</th>
                                        <th>
                                            <Mutation mutation={delete_Product} 
                                             onCompleted={(data) => {
                                                 this.setState({ 
                                                     alerta: {
                                                         mostrar: true,
                                                         mensaje: data.deleteProduct
                                                     }
                                                 }, () => {
                                                    setTimeout(() => {
                                                        this.setState({
                                                          alerta: { 
                                                              mostrar: false,
                                                              mensaje: ''
                                                          }
                                                        })
                                                    }, 2500);
                                                 })
                                             }}
                                            >
                                                { deleteProduct => (
                                                    
                                                    <button className="btn btn-danger"
                                                    onClick={() => { 
                                                        var id = product.id;
                                                        deleteProduct({
                                                            variables: {id}
                                                        })
                                                    }}
                                                                                                                                                       
                                                >&times; Borrar </button>
                                                )}
                                            </Mutation>
                                        </th>
                                        <th>
                                            <Link className="btn btn-info" to={`/productos/${product.id}`} >Editar</Link>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginador 
                                actual={this.state.paginador.actual}
                                total={data.totalProducts}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                        />
                      </React.Fragment>
                    )
                }}                
                </Query>
            </React.Fragment>
        )
    }
}

export default Productos;