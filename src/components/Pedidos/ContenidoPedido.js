import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ResumenPed from './ResumenPed';
import GenerarPedido from './GeneralPedido';
import Error from '../shared/Error';

class ContenidoPedido extends Component {

    state = {
        producto: [],
        total: 0
    }

    selectedProducto = (producto) => {
        // console.log('Aqui ', producto);
        this.setState({
            producto
        })
    }

    //  Actualizar la cantidad total 
    updateTotal = () => { 
        // leer el state de productoss
        const productos = this.state.producto;

        // cuaando todos los productos estan en 0
        if(productos.length === 0) { 
            this.setState({
                total: 0
            }); 
            return;
        }
        let nuevoTotal = 0;     
        

        // realizar la operación de cantidad por precio 
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        })

    }
 
    updateCantidad = (cantidad, index) => { 
        const productos = this.state.producto ;
        // console.log(cantidad);
        /// agregar la caantidad dessde la interfaz 
        productos[index].cantidad = Number(cantidad);

        // agregamos al state
        this.setState({
            productos
        }, () => { 
            this.updateTotal();
        })
    }

    deleteProduct = (id) => { 
        // console.log(id);
        const productos =  this.state.producto;

        const productosRestantes =  productos.filter(producto => producto.id !== id);

        this.setState({
            producto: productosRestantes
        }, () => {
            this.updateTotal();
        })
    }

    render() {

        // mandar mensaje de error cuando la caantidaad sea m¡negativa 
        const mensaje = ( this.state.total < 0 ) ? <Error error="Las cantidades no pueden ser negativas" /> : '';

        return (
            <React.Fragment>
                { mensaje }
                <Select
                    onChange={this.selectedProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={'Selecionaar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.producto}
                />
                <ResumenPed 
                    productos={this.state.producto}
                    updateCantidad={this.updateCantidad}
                    deleteProduct={this.deleteProduct}
                 />
                <p className="font-weight-bold float-right mt-3" >
                    Total: 
                    <span className="font-weight-normal">
                        {' '}
                        {this.state.total}
                    </span>
                </p>
                <GenerarPedido 
                  productos={this.state.producto}
                  total={this.state.total}
                  idCliente={this.props.id}
                  idVendedor={this.props.idVendedor}
                />
            </React.Fragment>
        );
    }
}

export default ContenidoPedido;