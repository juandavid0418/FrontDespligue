import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react'
import { get } from '../../../../config/Api/api';
import DataTable from "../../../../components/Datatable/Datatable";


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
  // Define un estado para almacenar los datos del aprendiz
  // const [aprendiz, setAprendiz] = useState({
  //   nombre: '',
  //   apellidos: '',
  //   documento: '',
  //   email: '',
  //   telefono: '',

  // });
  const location = useLocation();
  const { aprendizData } = location.state || {};

   const [observaciones, setObservaciones] = useState([])
   const [quejas, setQuejas] = useState([])
   const [planM, setPlanM] = useState([])
  

   const listObservaciones = async () => {
      try {
         const data = await get("observaciones-aprendiz");
         setObservaciones(data);
      } catch (error) {
         console.error(error);
      }
   };

   const listPlanM = async () => {
      try {
         const data = await get("plan-mejoramiento");
         setPlanM(data);
      } catch (error) {
         console.error(error);
      }
   };

   const listQuejas = async () => {
      try {
         const data = await get("quejas");
         setQuejas(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      listPlanM();
      listQuejas();
      listObservaciones();
   }, []);

  const [aprendizGET, setAprendiz] = useState([])
   const getData = async() =>{
      try {
         const getA = await get(`aprendices`)
         setAprendiz(getA)
         
      } catch (error) {
         console.log(error)
      }
   }


   useEffect(()=>{
      getData()
   },[])
  const headers1  =[
   {title : "Observación", prop : "ObservacionAprendiz"},
   {title : "Trimestre", prop : "trimestre"},
   {title : "Fecha", prop : "fechaHora"},
   {title: "Hecha por", prop : "usuarioObservacion.nombre"},
   {title : "Competencia", prop : "competenciaObservacion.nombreCompetencia"},
   {title : "Decisión", prop : "decisionObservacion.nombreEstadoDecision"},
  ]
  const headers2  =[
    {title : "Trimestre", prop : "trimestre"},
    {title : "Archivo", prop : "archivoQueja"},
   ]

   const headers3  =[
    {title : "Trimestre", prop : "trimestre"},
    {title : "Archivo", prop : "archivoPlanMejoramiento"},
    {title : "Instructor", prop : "usuarioPlanMejoramiento.nombre"},
    {title : "Motivo", prop : "motivoPlanMejoramiento.nombreMotivo"},
   ]
  

  const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,}

  return (
    <Fragment>
      <div className="mx-auto" style={{ width: "80%" }}>
        <h2 className='text-4xl mb-2'></h2>
        <div class="card mb-3" >
          <div class="card-header font-bold">Datos del Aprendiz</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Nombre Completo</h5>
                <p class="card-text">{aprendizData.nombre} {aprendizData.apellidos}</p>
              </div>
            </li>
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Documento</h5>
                <p class="card-text">{aprendizData.documento} / {aprendizData.tipoDocumentoAprendiz.nombreTipoDocumento}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Correo Electrónico</h5>
                <p class="card-text">{aprendizData.email}</p>
              </div>
            </li>


            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Número</h5>
                <p class="card-text">{aprendizData.telefono}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Ficha</h5>
                <p class="card-text">{aprendizData.fichaAprendiz.codigoFicha}</p>
              </div>
            </li>
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Grupo de Proyecto</h5>
                <p class="card-text">{aprendizData.grupoAprendiz.nombreProyecto}</p>
              </div>
            </li>

            {/* <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Observaciones del Aprendiz</h5>
                {/* <p class="card-text">{aprendizData.grupoAprendiz.nombreProyecto}</p> 
                <DataTable

              headers={headers1}
              body = {observaciones }
              configTable={configTable}


            />
              </div>
            </li>


            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Queja</h5>
                <p class="card-text">{aprendizData.grupoAprendiz.nombreProyecto}</p> 
                <DataTable

              headers={headers2}
              body = {quejas}
              configTable={configTable}


            />
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Plan de Mejoramiento</h5>
                 <p class="card-text">{aprendizData.grupoAprendiz.nombreProyecto}</p> 
                <DataTable

              headers={headers3}
              body = {planM ? planM: 'No disponible'}
              configTable={configTable}


            />
              </div>
            </li> */}
            
          </ul>
        </div>
      </div>
    </Fragment>
  )


}

export default ConsultarAprendiz