import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { getProducto } from '../../queries';
import ResumenProducto from './ResumenProducto';
import { Actualizar_Estado } from '../../mutations';

const Pedido = (props) => {
    const { pedido } = props;
    const {id} = pedido;
    const { estado } = pedido;
    console.log(estado);
    let clase;

   if(estado === 'PENDIENTE') {
       clase = 'border-light';
   } else if ( estado === 'CANCELADO') {
       clase = 'border-danger'
   } else {
       clase = 'border-success'
   }
    
    const fecha = new Date(Number(pedido.fecha));
    return ( 
        <div className="col-md-4">
            <div className={`card mb-3  ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation mutation={Actualizar_Estado}>
                            {actualizarEstado => (
                                <select className="form-control my-3" 
                                 value={pedido.estado} 
                                 onChange={e => {
                                   //  console.log(e.target.value);
                                    const input = {
                                         id: id,
                                         pedido: pedido.pedido,
                                         fecha: pedido.fecha,
                                         total: pedido.total,
                                         cliente: props.cliente,
                                         estado: e.target.value
                                     }
                                     console.log(input);
                                     actualizarEstado({
                                         variables: {input}
                                     })
                                 }}
                                 >
                                 <option value="PENDIENTE">PENDIENTE</option>
                                 <option value="COMPLETADO">COMPLETADO</option>
                                 <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}
                       
                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id} </span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido:  
                        <span className="font-weight-normal">
                            {fecha.toLocaleString("es-MX")}
                        </span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal">
                            $ {pedido.total}
                        </span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) => { 
                        //console.log(producto);
                        const {id} = producto;
                       return (
                           <Query key={pedido.id+index} query={getProducto} variables={{id}} >
                               {({loading, error, data}) => {
                                   if(loading) return 'Cargando...';
                                   if(error) return `Error ${error.message}`;
                                  // console.log(data);
                                   return(
                                       <ResumenProducto 
                                            producto={data.getProduct}
                                            cantidad={producto.cantidad}
                                            key={producto.id}
                                       />
                                   )
                               }}
                           </Query>
                       )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Pedido;