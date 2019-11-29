import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSession = (cliente, history) => { 
    localStorage.removeItem('token', '');
    // desloguear
    cliente.resetStore();
    // redireccionar 
    history.push('/login');
}

const CerrarSession = ({history}) => (
    <ApolloConsumer>
        { cliente => { 
            return(
                <button 
                onClick={ () => cerrarSession(cliente, history) }
                className="btn btn-danger ml-md-2 mt-2 mt-md-0">
                    Cerrar Sessión
                </button>
            )
          }
        }
    </ApolloConsumer>
    
)

export default withRouter (CerrarSession);