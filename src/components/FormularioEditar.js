import React, { Component } from 'react';

import { Actualizar_Cliente } from '../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Swal from 'sweetalert2';

class FormularioEditar extends Component {
    
    state =  { 
        cliente: this.props.cliente,
        emails: this.props.cliente.emails
    }

    /// paraa realizaar el formulario dinamico
    // http://localhost:4200/#/admin/warrantyValidator/6tVaL8RlJWDnH4um5TvJ
    nuevoCampo = () => { 
        this.setState({ 
            emails: this.state.emails.concat([{ email: '' }])
        })
    }
    
    // leer los datoss del input del formulario ddinamico de email
    leerCampo =  i => e => { 
        // realizaar el recorrido de los campos iterativos 
        const nuevoEmail = this.state.emails.map((email, index) => { 
            // si el el i del parametro es diferente a el indice del map, mandar todos los caamposs iterados 
            if(i !== index ) return email;
            // obtenemos loss valores en el input
            return { 
                ...email,
                email: e.target.value
            };             
        });
        /// paasamos el resultado de la iteracion el estado
        this.setState({ 
            emails: nuevoEmail
        })
    }

    // quitar campos del formulario iterativo 
    quitarCampo = indice => {        
        this.setState({ 
            emails: this.state.emails.filter((email, index) => indice !== index )
        })
    }

    render() { 
        console.log(this.props);
        const { emails } = this.state;
        const {nombre, apellidos, empresa, edad, tipo } =  this.state.cliente; 
        return (
            <React.Fragment>
                {/* <h2 className="text-center">Formulario Editar</h2> */}
                <Mutation
                    mutation={Actualizar_Cliente}  
                    onCompleted={ () => this.props.history.push('/') }
                >
                    { actualizarCliente => (
                    <form className="col-md-8 m-3" 
                        onSubmit={ e => {
                            e.preventDefault();                            
                            const { id, nombre, apellidos, empresa, edad, tipo } =  this.state.cliente;
                            const { emails } = this.state;                            
                            const input = { 
                                id,
                                nombre,
                                apellidos,
                                empresa,
                                edad: Number(edad),
                                tipo,
                                emails
                            }
                            /// console.log(input);
                            /*TODO para realizar un mutation la inserccion o actualizcion, eliminr etc... 
                             se debe de tener en cuenta que ssiempre debe estaar declrada la variable ( TODO input)
                             */
                            actualizarCliente({
                                variables: {input}
                            });
                            Swal.fire('¡Datos Actualizado, correctamente!', '', 'success');
                        }}
                    >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={nombre}
                                onChange={ e => {
                                    this.setState({
                                        cliente: { 
                                            ...this.state.cliente,
                                            nombre: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={apellidos}
                                onChange={ e => { 
                                    this.setState({ 
                                        cliente: { 
                                            ...this.state.cliente,
                                            apellidos: e.target.value
                                        }
                                    })
                                 }}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>Empresa</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue= {empresa}
                                onChange={ e =>  {
                                    this.setState({ 
                                        cliente: {
                                        ...this.state.cliente,
                                        empresa: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>

                        {emails.map((input, index) => (
                            <div key={index} className="form-group col-md-12">
                                <label>Email {index + 1} : </label>
                                <div className="input-group">

                                    <input
                                        type="email"
                                        placeholder={`Email`}
                                        className="form-control"
                                        onChange={this.leerCampo(index)}
                                        defaultValue={input.email}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => 
                                                Swal.fire({
                                                    title: '¿Estas Seguro de Eliminarlo?',                                                    
                                                    type: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Si, eliminar esto!'
                                                  }).then((result) => {
                                                    if (result.value) {
                                                     this.quitarCampo(index);
                                                      Swal.fire(
                                                        'Eliminado correctamente!',
                                                        '',
                                                        'success'
                                                      )
                                                    }
                                                  })                                                                                                  
                                            }>
                                            &times; Eliminar
                                </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="form-group d-flex justify-content-center col-md-12">
                            <button
                                onClick={this.nuevoCampo}
                                type="button"
                                className="btn btn-warning"
                            >+ Agregar Email</button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Edad</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={edad}
                                onChange={ e=> {
                                    this.setState({
                                        cliente: {
                                        ...this.state.cliente,
                                        edad: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Tipo Cliente</label>
                            <select
                                className="form-control"
                                defaultValue={tipo}
                                onChange={ e => { 
                                    this.setState({
                                        cliente: {
                                        ...this.state.cliente,
                                        tipo: e.target.value
                                        }
                                    })
                                }}
                            >
                                <option value="">Elegir...</option>
                                <option value="PREMIUM">PREMIUM</option>
                                <option value="BASICO">BÁSICO</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                </form>
                    )}
              </Mutation>
            </React.Fragment>
        )
    }
}

export default withRouter(FormularioEditar);