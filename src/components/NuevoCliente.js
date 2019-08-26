import React, { Component } from 'react';

// importacion de apollo y del schema y mutation 
import { Crear_Cliente } from '../mutations';
import { Mutation } from 'react-apollo';

import Swal from 'sweetalert2';

class NuevoCliente extends Component {

    // crear el estado del cliente el modelo
    constructor() {
        super();
        this.state = {
            cliente: {
                nombre: '',
                apellidos: '',
                empresa: '',
                edad: 0,
                email: '',
                tipo: ''
            },
            error: false,
            emails: []
        }
     this.leerDatos = this.leerDatos.bind(this);
    }
    /// verificaar con Minsau 
    leerEmailInput = index => (e) => { 
        const nuevoEmail =  this.state.emails.map((email, inicio) => {
            // ssi el inddex es diferente de inicio entoncess retorna toda la iteracion de los input email
            if (index !== inicio) return email;
            // si son iguales entonces empieza a realiar una copia del estado y obtener el vaalor de  input donde se digite datos
            return {
                ...email,
                email: e.target.value
            }
        });
        /// obtenemos los valores de la iteracion y o agregamos al aarreglo del stado del emails
        this.setState({ 
            emails: nuevoEmail
        })
    }

    leerDatos = name => { 
        var cliente =  Object.assign({}, this.state.cliente);
            cliente[name.target.name] = name.target.value;
            this.setState({ 
                cliente
            })
    }
    // seccion donde se realiza un formulario dinamico
    nuevoEmail = () => { 
        this.setState({
            emails: this.state.emails.concat([{ email: '' }])
        })
    }

    eliminarEmailInput = (id) => { 
        console.log(id);
        /// vaa eliminar o retornar por medio del filter todos los dddatos que sean diferentes del id que se manda por parametro
        this.setState({
            /// nos va a retornar todos los elementos que sean diferente del id o que no sean iguales
            emails: this.state.emails.filter((email, index) => id !== index)
        })
    }
   
    render() {
        const { nombre, apellidos, empresa, edad, tipo } =  this.state.cliente; 
        //7 manejo de errores en react  
        const { error } =  this.state;
        // si existe el error  mandara el p si el error es falso mandara lass comillas simpless 
         let resspuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son Obligatorios </p>
         : '';
        return (
            <React.Fragment>
                <h2 className="text-center">Nuevo Cliente </h2>
                { resspuesta }
                <div className="row justify-content-center">
                    <Mutation 
                    mutation={Crear_Cliente} 
                    // si se guardo correectaamente haraa un redireccionaamiento 
                    onCompleted={ () => this.props.history.push('/') }
                    >
                     { crearCliente =>  (
                    <form className="col-md-8 m-3" 
                        onSubmit={ e => { 
                            e.preventDefault();

                            const { emails } =  this.state;

                            // validaacion para que no vallan datos vacios 
                            if (nombre === '' || apellidos === '' || empresa === '' || edad === ''){ 
                                console.log('Los campos son obligatorioss ');
                                this.setState({
                                    error: true
                                });
                                return
                            }
                            // si todo esta corrcto y libro las validacioness entra el siguiente state 
                            this.setState({ 
                                error: false
                            });

                            const input = {
                                nombre,
                                apellidos,
                                empresa,
                                emails,
                                edad: Number(edad),
                                tipo, 
                            };
                            /// funcion del mutation para crear Cliente
                            crearCliente({ 
                                variables: {input}
                            });                            
                            //this.props.history.push('/');
                            Swal.fire('Datos guardados correctamente', '', 'success');
                        }}
                    >
                        
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={this.leerDatos}
                                 />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Apellido" 
                                name="apellidos"
                                value={apellidos}
                                onChange={this.leerDatos}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Empresa" 
                                name="empresa"
                                value={empresa}
                                onChange={this.leerDatos}
                                />
                            </div>
                            {/* realizar la iteracion en html, para los emails  */}
                            { this.state.emails.map((input, index) => (
                                <div className="form-group col-md-12" key={index} >
                                    <label>Correo: {index + 1}: </label>
                                    <div className="input-group"> 
                                        
                                        <input                                         
                                        type="email" 
                                        placeholder="Email"
                                        className="form-control" 
                                        onChange={this.leerEmailInput(index)}
                                        />

                                        <div className="input-group-append">
                                            <button onClick={ () => this.eliminarEmailInput(index)} className="btn btn-danger" type="button">&times;Eliminar </button>
                                        </div>
                                    </div>
                                </div>
                            ))}               
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button onClick={this.nuevoEmail} type="button" className="btn btn-primary">
                                    Agregar Email
                                </button>
                            </div>
                            {/* <div className="form-group col-md-6">
                                <label>Email</label>
                                <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={this.leerDatos}
                                 />
                            </div> */}
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Edad" 
                                name="edad"
                                value={edad}
                                onChange={this.leerDatos}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>
                                <select className="form-control" name="tipo" value={tipo} onChange={this.leerDatos} >
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
                </div>
            </React.Fragment>
        )
    }
}

export default NuevoCliente;