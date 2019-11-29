import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootSession } from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// se caambio todo lo de apollo cliente, para poder leerse y no aafecte en
// inicio de session 

// instaciar el servidor de apollo con el front
export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  
    //* Enviar Token al servidor back-end
    fetchOptions: { 
      credentials: 'include'
    },
    //* este es coomo un obserbvable ya que esta escuchando
    //* o monitoreando todas lass paginas si hay cambios
    request: operation => { 
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: { 
          authorization: token
        }
      })
    },
    /// borrar todo el cache de lo anterior y no hallaa problema al actualizar
    cache: new InMemoryCache({
      addTypename: false
    }),
    onError: ({ networkError, graphqlErrors }) => {
      console.log('graphQLErrors', graphqlErrors);
      console.log('network errors', networkError);
    }
  });

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootSession />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
