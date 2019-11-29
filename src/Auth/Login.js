import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';



import { Mutation } from 'react-apollo';
import { Usuario_Aautenticar } from '../mutations';
import Error from '../components/shared/Error';

const initialState = {
    usuario : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    limpiarState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();
        console.log(usuarioAutenticar);
        
        usuarioAutenticar().then( async ({data}) => { 
            console.log(data);

            // guardar el token en el storage
            localStorage.setItem('token', data.autenticarUsuario.token);

            // ejecutar el query una vez que se halla iniciado session 
            await this.props.refetch();

            // limpiaar el state 
            this.limpiarState();

            // redireccionar 
            setTimeout( () => { 
                // redireccionaar hacia el panel
                this.props.history.push('/panel');
            }, 300)
        })
     }

     validarForm = () => {
        const {usuario, password} = this.state;

        const noValido = !usuario || !password;

        console.log(noValido);
        return noValido;
     }
    render() { 

        const {usuario, password} = this.state;
      
        return ( 
            <Fragment>
                 <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ Usuario_Aautenticar  }
                        variables={{usuario, password}}    
                    >
                    {( usuarioAutenticar, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.iniciarSesion(e, usuarioAutenticar) } 
                                className="col-md-8"
                            >

                            {error && <Error error={error} />}
                            

                            <div className="form-group">
                                <label>Usuario</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={usuario}
                                    type="text" 
                                    name="usuario" 
                                    className="form-control" 
                                    placeholder="Nombre Usuario" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Iniciar Sesión
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Login);
