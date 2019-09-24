import React from 'react';
import { Query } from 'react-apollo';
import { Cliente_Query } from '../../queries';

const DatosClientes = ({ id }) => {
    return (
        <React.Fragment>
            <h2 className="text-center mb-3">Resumen de Clientes</h2>
            <Query query={Cliente_Query} variables={{ id }} pollInterval={500}  >
                {({ loading, error, data }) => {
                    if (loading) return 'Cargando...';
                    if (error) return `Error${error.message}`;
                  //  console.log(data.getCliente);
                    const {nombre, apellidos, edad, empresa, tipo, emails} = data.getCliente;
                    return (
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">Nombre:
                            <span className="font-weight-normal"> {nombre}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Apellidos:
                            <span className="font-weight-normal"> {apellidos}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Edad:
                            <span className="font-weight-normal"> {edad}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Emails:
                            <span className="font-weight-normal"> {emails.map( email => ` ${email.email}` )} </span>
                            </li>
                            <li className="border font-weight-bold p-2">Empresa:
                            <span className="font-weight-normal"> {empresa}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Tipo:
                            <span className="font-weight-normal"> {tipo}</span>
                            </li>                  
                        </ul>
                    )
                }}
            </Query>
        </React.Fragment>
    )
}

export default DatosClientes;