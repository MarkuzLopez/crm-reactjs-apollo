import React, { Component } from 'react';
///mutation  
import { new_Product  } from '../../mutations';
import { Mutation } from 'react-apollo';

class NuevoProducto extends Component { 

         constructor() { 
             super();
             this.state = { 
                producto: { 
                    nombre: '',
                    precio: '',
                    stock: ''
                }
             }
             this.readingData =  this.readingData.bind(this);
         }

         readingData = (name) => {
            var producto = Object.assign({}, this.state.producto);
                producto[name.target.name] =  name.target.value;
                this.setState({
                    producto
                });
         }

         validateForm = () => {
             const {nombre, precio, stock} =  this.state.producto;
             const notValidate =  !nombre || !precio || !stock;
             // console.log(notValidate);             
             return  notValidate;
         }

         createNewProduct = (e, nuevoProducto) => {
                e.preventDefault();
                /// insertamoss en la base de daatos 
                nuevoProducto().then( data =>  { 
                    console.log(data);
                });

                this.props.history.push('/productos');
         }

        render() { 
            const { nombre, precio, stock } = this.state.producto;
             // pasar los vaalores al input ya que es el nombre del parametro
             // del index en los mutations

                    const input = { 
                        nombre, 
                        precio: Number(precio),
                        stock: Number(stock)
                    }

            return(
                <React.Fragment>
                    <h1 className="text-center">Nuevo Producto</h1>
                    <div className="row justify-content-center" >

                        <Mutation 
                            mutation={new_Product}
                            variables={{input}}
                        >
                        {(nuevoProducto, {loading,error, data}) => { 
                            return(                                
                            
                        <form
                            className="col-md-8"
                            onSubmit={e => this.createNewProduct(e, nuevoProducto)}
                        >
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    value={nombre}
                                    onChange={this.readingData}
                                    
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input
                                        type="number"
                                        name="precio"
                                        className="form-control"
                                        placeholder="Precio del Producto" 
                                        value={precio}
                                        onChange={this.readingData}                       
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    placeholder="stock del Producto"
                                    value={stock}
                                    onChange={this.readingData}                              
                                />
                            </div>
                            <button
                                disabled={this.validateForm()}
                                type="submit"
                                className="btn btn-success float-right">
                                Crear Producto
                            </button>
                        </form>
                            )
                         }}                       
                        </Mutation>
                    </div>
                </React.Fragment>
            )
        }
}
export default NuevoProducto;