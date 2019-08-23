import React, { Component } from 'react';
// importtacion de de apollo 
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

// importacion de router 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importaacion de componentes
import Header from './components/Header';
import Clientes from './components/Clientes';
import EditarCliente from './components/EditarCliente';
import NuevoCliente from './components/NuevoCliente';

// instaciar el servidor de apollo con el front
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  /// borrar todo el cache de lo anterior y no hallaa problema al actualizar
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphqlErrors }) => {
    console.log('graphQLErrors', graphqlErrors);
    console.log('network errors', networkError);
  }
});


 class App extends Component {
  render() { 
    return(
      // de estaa formaa decimos de donde vaa obtener los datos y utilizar las caracterisicaass 
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Header />
            <div className="container">
                <Switch>
                  <Route exact path="/" component={Clientes}  />
                  <Route exact path="/cliente/editar/:id" component={EditarCliente} />
                  <Route exact path="/cliente/nuevo" component={NuevoCliente} />
                </Switch>                
            </div>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
