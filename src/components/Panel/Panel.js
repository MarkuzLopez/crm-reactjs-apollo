import React from 'react';
import Clientes from './Clientes';

const Panel = () => {
    return ( 
        <React.Fragment>
            <h1 className="text-center my-5">Top 10m Clientes que mas compran</h1>
            <Clientes />
        </React.Fragment>
     );
}
 
export default Panel;