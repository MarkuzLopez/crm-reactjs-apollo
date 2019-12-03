import React from 'react';
import { Link } from 'react-router-dom';
import CerrarSession from './CerrarSession';
import BotonRegistro from './BotonReegistro';

const Header = ({session}) => {
    // console.log(session);
     let barra =  (session.obtenerUsuario) ? <NavegacionAutenticados session={session} /> : <NavegacionNoAutenticados />
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">         
                {barra}    
            </div>
        </nav>
    )
}

const NavegacionNoAutenticados = () => (
    <h3 to="/" className="navbar-brand text-light font-weight-bold">CRM</h3>


);

const NavegacionAutenticados = (session) => (

    <React.Fragment>
        <Link className="navbar-brand text-light font-weight-bold" to={"/"} >CRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2">
                    <button className="nav_link dropdown-toggle btn btn-success" data-toggle="dropdown">
                        Clientes
                </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to='/clientes' className="dropdown-item">
                            Ver Cientes
                        </Link>
                        <Link to='/clientes/nuevo' className="dropdown-item" >
                            Nuevo Cliente
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className="nav_link dropdown-toggle btn btn-success" data-toggle="dropdown">
                        Productos
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to='/productos' className="dropdown-item">
                            Ver Productos
                        </Link>
                        <Link to='/productos/nuevo' className="dropdown-item" >
                            Nuevo Productos
                        </Link>                                      
                    </div>
                </li>
                <li>
                     <BotonRegistro session={session} />
                </li>
               
                <li>
                    <CerrarSession />
                </li>
            </ul>
        </div>
    </React.Fragment>
);

export default Header;
