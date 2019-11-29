import React, { Component } from 'react';
// importtacion de de apollo 



// importacion de router 
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
import Panel from './components/Panel/Panel';
import Registro from './Auth/Registro';
import Login from './Auth/Login';
import Session from './components/Session';

// importacion de productos 


const App = ({refetch, session}) => { 
  //console.log(session);
  const { obtenerUsuario } = session;
  const meensaje = (obtenerUsuario) ? `Bienvenido: ${obtenerUsuario.nombre}` : <Redirect to="/login" />;
  
    return(
      // de estaa formaa decimos de donde vaa obtener los datos y utilizar las caracterisicaass 
      
        <Router>
          <React.Fragment>
            <Header session={session} />            
            <div className="container">
            <p className="text-right">{meensaje}</p>
                <Switch>
                  <Route exact path="/clientes" component={Clientes}  />
                  <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                  <Route exact path="/clientes/nuevo" component={NuevoCliente} />
 
                  <Route exact path="/productos/nuevo" component={NuevoProducto} />
                  <Route exact path="/productos/:id" component={EditarProducto} />
                  <Route exact path="/productos" component={ Productos } />

                  <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                  <Route exact path="/pedidos/:id" component={PedidosClientes} />

                  <Route exact path="/panel" component={Panel} />
                  <Route exact path="/registro" component={Registro} />
                  <Route exact path="/login" render={() => <Login refetch={refetch}  />} />
                 </Switch>                
            </div>
          </React.Fragment>
        </Router>
    )
}

const RootSession = Session(App);

export  {RootSession};
