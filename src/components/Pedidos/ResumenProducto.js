import React from 'react';

 const ResumenProducto = ({producto, cantidad}) => {
     
     return ( 
        <React.Fragment>
            <div className="border mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre del Producto:
                    <span className="font-weight-normal">{producto.nombre}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal">{cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">
                   Precio:
                    <span className="font-weight-normal">$  {producto.precio}</span>
                </p>
            </div>
        </React.Fragment>
      );
 }
  
 export default ResumenProducto; 