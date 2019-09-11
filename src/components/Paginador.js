import React, { Component } from 'react';

class Paginador extends Component { 

     state = {
         paginador : { 
             paginas: Math.ceil(Number(this.props.total) / this.props.limite)
         }
     }

    render() {        
        
        const {actual} = this.props;        
        const btnAnterior = (actual > 1) ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2">
            &laquo; Anterior
        </button> : '';

        const { paginas } = this.state.paginador;
        const btnSiguiente = (actual !== paginas) ? <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-success mr-2">
           Siguiente &raquo;
        </button>: ''

       /* /// metodos paara rendondear 
        console.log(Math.round(paginas));
        const numero = 1.1;
        console.log(Math.floor(numero));
        console.log(Math.ceil(numero)); */
        return(
            <div className="mt-5 d-flex justify-content-center" >
                    {btnAnterior}
                    {btnSiguiente}
            </div>
        )
    }
}

export default Paginador;