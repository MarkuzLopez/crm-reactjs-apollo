import React, { Component } from 'react';

class Producto extends Component { 

    render() {   
        const {producto} = this.props;
       // console.log(producto);
        
        return(
            <React.Fragment>
               <tr>
                   <td>{producto.nombre}</td>
                   <td>{producto.precio}</td>
                   <td>{producto.stock}</td>
                   <td>
                       <input min="1" type="number" className="form-control" 
                        onChange={e => {
                            // validacion para que no supere la cantidad del stock actual de la BD
                            if(e.target.value > producto.stock) { 
                                e.target.value = 0;
                            }
                            this.props.updateCantidad(e.target.value, this.props.index)
                        }}
                       />
                   </td>
                   <td>
                        <button type="button" className="btn btn-danger font-weight-bold" 
                        onClick={e => this.props.deleteProduct(producto.id) }
                        >Eliminar</button>
                   </td>
               </tr> 
            </React.Fragment>
        );
    }
}
export default Producto;