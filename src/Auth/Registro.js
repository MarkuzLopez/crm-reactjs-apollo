import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import { Create_User } from '../mutations';
import Error from '../components/shared/Error';


class Registro extends Component {

    constructor() {
        super();
        this.state = { 
           user: { 
            usuario: '',
            password: '',
            repetirPassword: '',
            nombre: '',
            rol: ''
           }
        }
     this.leerUsuario = this.leerUsuario.bind(this)
    }
    

    // creearUsuario 
    createUsuario = (e, crearUsuario) => { 
        e.preventDefault();
        crearUsuario().then( data => {
          console.log(data);
          this.limpiarRegistro();
          this.props.history.push('/login');
        });
    }

    //limpiandoCajaTexto
    limpiarRegistro = () => {
        this.setState({
           user: {
            usuario: '',
            nombre: '',
            password: '',
            repetirPassword: '',
            rol: ''
           }
        })
    }
    // metodo para leer los daatos 
    leerUsuario = name => {
        
        var user  = Object.assign({}, this.state.user);
            user[name.target.name] = name.target.value;
            this.setState({ 
                user
            });
    }

    // validacion de campos y que la contrasela sea igual 
    validacionCampos = () => {
        const { usuario, password, repetirPassword, nombre, rol } = this.state.user;
        const noValido = !usuario || !password || password !== repetirPassword || !nombre || !rol;
        return noValido;
    }

    render() {
        // console.log(this.props.session.obtenerUsuario.rol);
        // bloquear las rutas 
        const rolUser = this.props.session.obtenerUsuario.rol;
        const redireccionar = (rolUser !== 'ADMINISTRADOR') ? <Redirect to="/clientes" /> : '';
        
        // realizar un destructuración de los datos 
        const { usuario, password, repetirPassword, nombre, rol  } = this.state.user;
        return (
            <React.Fragment>
                {redireccionar}
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation 
                        mutation={Create_User} 
                        variables={{usuario, nombre, password, rol}}                        
                    >
                    {(crearUsuario, {loading, error, data}) => (
                         <form
                         className="col-md-8"
                         onSubmit={ e => this.createUsuario(e, crearUsuario)}
                         >
                        
                            {error && <Error error={error} />}

                         <div className="form-group">
                             <label>Usuario</label>
                             <input
                                 type="text"
                                 name="usuario"
                                 className="form-control"
                                 placeholder="Nombre Usuario"
                                 value={usuario}
                                 onChange={this.leerUsuario}
                             />
                         </div>
                         <small className="form-text text-muted">
                            (Sin Espacios y sin caracteres especiales)
                         </small>
                         <div className="form-group">
                             <label>Nombre</label>
                             <input
                                 type="text"
                                 name="nombre"
                                 className="form-control"
                                 placeholder="Nombre Completo"
                                 value={nombre}
                                 onChange={this.leerUsuario}
                             />
                         </div>
                         <small className="form-text text-muted">
                            (Agregar el nombre y aapellidos completo)
                         </small>
                         <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.leerUsuario}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Repetir Password</label>
                                <input
                                    type="password"
                                    name="repetirPassword"
                                    className="form-control"
                                    placeholder="Repetir Password"
                                    value={repetirPassword}
                                    onChange={this.leerUsuario}
                                />
                            </div>
                         </div>

                         <div className="form-group">
                            <label>Rol: </label>
                            <select className="form-control" 
                                onChange={this.leerUsuario}
                                value={rol} 
                                name="rol" 
                                >
                                    <option></option>
                                    <option value="">Elegeir</option>
                                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                    <option value="VENDEDOR">VENDEDOR</option>
                            </select>
                         </div>
 
                         <button
                             disabled={ this.validacionCampos() }
                             type="submit"
                             className="btn btn-success float-right">
                             Crear Usuario
                         </button>
                     </form>
                    )}
                    </Mutation>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter (Registro);