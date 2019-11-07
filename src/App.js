import React, { Component } from 'react';
// importtacion de de apollo 
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

// importacion de router 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importaacion de componentes
import Header from './components/shared/Header';
import Clientes from './components/Clientes/Clientes';
import EditarCliente from './components/Clientes/EditarCliente';
import NuevoCliente from './components/Clientes/NuevoCliente';
import NuevoProducto from './components/Productos/NuevoProducto';
import Productos from './components/Productos/Productos';
import EditarProducto from './components/Productos/EditarProducto';
import NuevoPedido from './components/Pedidos/NuevoPedido';
import PedidosClientes from './components/Pedidos/PedidosClientes';

// importacion de productos 


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
                  <Route exact path="/clientes" component={Clientes}  />
                  <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                  <Route exact path="/clientes/nuevo" component={NuevoCliente} />
 
                  <Route exact path="/productos/nuevo" component={NuevoProducto} />
                  <Route exact path="/productos/:id" component={EditarProducto} />
                  <Route exact path="/productos" component={ Productos } />

                  <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                  <Route exact path="/pedidos/:id" component={PedidosClientes} />
                </Switch>                
            </div>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
