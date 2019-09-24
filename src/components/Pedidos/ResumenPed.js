import React, { Component } from 'react'
import Producto from './Producto';

class ResumenPed extends Component { 
    render(){

        const productos = this.props.productos;

        if(productos.length === 0) return null;

        return(
            <React.Fragment>
                <h2 className="text-center my-5">Resumen y Cantidades</h2>
                <table className="table">
                    <thead className="bg-success text-light">
                        <tr className="font-weight-bold">
                            <th>Producto </th>
                            <th>Precio</th>
                            <th>Inventario</th>
                            <th>Cantidad</th>
                            <th>Eliminar </th>
                        </tr>
                    </thead>
                    <tbody>
                      {productos.map((product, index) => (
                          <Producto 
                            key={product.id}
                            producto={product}
                            index={index}
                            id={product.id}
                            updateCantidad={this.props.updateCantidad}
                            deleteProduct={this.props.deleteProduct}
                           />
                      ))}
                    </tbody>
                </table> 
            </React.Fragment>
        );
    }
}

export default ResumenPed;