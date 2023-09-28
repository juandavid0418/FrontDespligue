import { useParams } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react'


const ConsultarAprendiz = () =>{
    // Obtiene los parámetros de la URL, incluido idAprendiz
   const { idAprendiz } = useParams();

  // return (
  //   <Fragment>
  //       <div>
  //     <h1>Consultar Aprendiz con ID: {idAprendiz}</h1>
  //     {/* Resto del contenido de la vista */}
  //   </div>
  //   </Fragment>
  // );

  return (
    <Fragment>
      <div className="mx-auto" style={{ width: "80%" }}>
        <h2 className='text-4xl mb-2'></h2>
        <div class="card mb-3" >
          <div class="card-header font-bold">Datos del Aprendiz</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Nombre del Aprendiz</h5>
                <p class="card-text">{idAprendiz.nombre} {idAprendiz.apellidos}</p>
              </div>
            </li>
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Documento del Usuario</h5>
                <p class="card-text">{idAprendiz.documento}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Correo electrónico</h5>
                <p class="card-text">{idAprendiz.email}</p>
              </div>
            </li>


            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Número celular</h5>
                <p class="card-text">{idAprendiz.telefono}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )


}

export default ConsultarAprendiz