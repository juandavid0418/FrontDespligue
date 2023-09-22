import { Fragment } from 'react';
import { useParams } from 'react-router-dom';


const ConsultarAprendiz = () =>{
    // Obtiene los parámetros de la URL, incluido idAprendiz
  const { idAprendiz } = useParams();

  return (
    <Fragment>
        <div>
      <h1>Consultar Aprendiz con ID: {idAprendiz}</h1>
      {/* Resto del contenido de la vista */}
    </div>
    </Fragment>
  );

}

export default ConsultarAprendiz