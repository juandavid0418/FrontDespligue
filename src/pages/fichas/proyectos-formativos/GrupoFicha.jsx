import { Fragment, useCallback, useEffect, useState } from "react"
import DataTable from "../../../components/Datatable/Datatable"
import { downloadFiles, get } from "../../../config/Api/api"
import { Link, useParams } from "react-router-dom"
import Modal from "../../../components/Modals/Modal"
import { UploadEvidencia } from "./components/spf.forms"

const GrupoFicha = () => {
   const { idGrupo, ficha } = useParams()
   const headersAprendices = [
      { title: "Equipo de Proyecto", prop: ["nombre", "apellidos"] },
      // { title: "Acciones", prop: "actions", cell: (row) => {
      //    return (
      //       <Link to={`/proyectosFormativos/gp/${row.idGrupoProyecto}`}><button type="button" className="s-button-consult rounded p-2">Consultar</button></Link>
      //    )
      // }},
   ]
   const headersArchivos = [
      { title: "Realizada por...", prop: ["usuarioArchivo.nombre", "usuarioArchivo.apellidos"] },
      { title: "Evidencia", prop: "nombreArchivo" },
      { title: "Observación", prop: "observacionArchivoProyecto" },
      { title: "Competencia", prop: "competenciaArchivo.nombreCompetencia" },
      { title: "RAP", prop: "resultadoArchivo.nombreRA" },
      { title: "Acciones", prop: "actions", cell: (row) => {
         return (
            <button key={row.idArchivosProyecto} onClick={() => handleDownload(row.archivoProyecto)} className="s-button-others rounded p-2">Descargar</button>
         )
      }},
   ]

   const configTableAprendices = {
      initialRows: 6,
      filtrable: false,
      pagination: false,
      message: false,
   }

   const configTableArchivos = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }

   const handleDownload = async (filename) => {
      try {
         // Llama a la función downloadFiles para descargar el archivo
         const response = await downloadFiles(`grupo-proyecto/archivos/download/${filename}`);

         // Comprueba si la respuesta tiene el archivo
         if (!response) {
            // Crea un objeto URL para el blob de la respuesta y crea un enlace temporal
            const url = window.URL.createObjectURL(new Blob([response]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            // Simula un clic en el enlace para iniciar la descarga
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
         } else {
            console.error('No se pudo descargar el archivo');
         }
      } catch (error) {
         console.error('Error al descargar el archivo:', error);
      }
   };

   const [grupoInfo, setGrupoInfo] = useState()
   const [aprendices, setAprendices] = useState([])
   const [archivos, setArchivos] = useState([])
   const [competencias, setCompetencias] = useState([])

   const loadData = useCallback(async () => {
      try {
         const dataAprendices = await get(`aprendices/gp/${idGrupo}`)
         setAprendices(dataAprendices)

         const dataArchivos = await get(`grupo-proyecto/archivos/${idGrupo}`)
         setArchivos(dataArchivos)

         const dataGrupo = await get(`grupo-proyecto/${idGrupo}`)
         setGrupoInfo(dataGrupo)

         const dataCompetencias = await get("competencias")
         setCompetencias(dataCompetencias)
      } catch (error) {
         console.log(error)
      }
   }, [idGrupo])

   useEffect(() => {
      loadData()
   }, [loadData])

   return (
      <Fragment>
         <div className="flex justify-between items-center pb-2">
            <h2 className='text-4xl'>Proyecto Formativo - {grupoInfo ? grupoInfo.nombreProyecto : null}</h2>
            <Link to={`/fichas/${ficha}`}><button className="s-button-cancel rounded p-2">Volver</button></Link>
         </div>
         <div className="card mb-3">
            <div className="card-body col d-flex justify-content-between">
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Ficha:</h6>
                  <p>{grupoInfo ? grupoInfo.fichaGrupo ? grupoInfo.fichaGrupo.codigoFicha : null : null}</p>
               </div>
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Programa Formativo:</h6>
                  <p>{grupoInfo ? grupoInfo.fichaGrupo ? grupoInfo.fichaGrupo.programaFicha ? grupoInfo.fichaGrupo.programaFicha.nombrePF : null : null : null}</p>
               </div>
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Director:</h6>
                  <p>{grupoInfo ? grupoInfo.fichaGrupo ? grupoInfo.fichaGrupo.usuarioFichaDirector ? `${grupoInfo.fichaGrupo.usuarioFichaDirector.nombre} ${grupoInfo.fichaGrupo.usuarioFichaDirector.apellidos}` : null : null : null}</p>
               </div>
            </div>
         </div>  
         <div className='card mb-20'>
            <div className='card-body'>
               <div className="h-full w-full px-2 flex justify-between">
                  <div className="w-[30%]">
                     <div className="card">
                        <div className="card-header">
                           <h4 className="font-semibold text-xl">Aprendices</h4>
                        </div>
                        <div className="card-body">
                           <DataTable
                              headers={headersAprendices}
                              body={aprendices}
                              configTable={configTableAprendices}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="w-8/12">
                     <div className="card">
                        <div className="card-header flex justify-between items-center">
                           <h4 className="font-semibold text-xl">Evidencias</h4>
                           <Modal 
                              children={<UploadEvidencia competencias={competencias} grupoInfo={grupoInfo} reloadData={loadData} />}
                              configModal={{
                                 identify: "Grupo Proyecto",
                                 modalClasses: "w-fit",
                                 // modalStylesContent: {},
                                 nameBtn: "Nueva Evidencia",
                                 btnClasses: "s-button-create p-2 rounded",
                                 nameTitle: "Subir Evidencia",
                              }}
                           />
                        </div>
                        <div className="card-body">
                           <DataTable
                              headers={headersArchivos}
                              body={archivos}
                              configTable={configTableArchivos}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default GrupoFicha