import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreateEntregaFicha, CreateObservacionesAprendiz } from './components/entrega-ficha.forms';
import { get } from '../../../config/Api/api';


const EntregaFicha = () => {
   const { ficha } = useParams()
   const [fichaInfo, setFichaInfo] = useState([])
   const [aprendices, setAprendices] = useState([])
   const [competencias, setCompetencias] = useState([])
   const [resultados, setResultados] = useState([])
   const [motivos, setMotivos] = useState([])
   const [decision, setDecision] = useState([])
   const [seccion1Visible, setSeccion1Visible] = useState(true);
   const [seccion2Visible, setSeccion2Visible] = useState(false);

   useEffect(() => {
      const obtenerDatos = async () => {
         try {
            const fichaI = await get(`fichas/${ficha}`)
            setFichaInfo(fichaI)

            const aprendicesFicha = await get(`aprendices/ficha/${ficha}`)
            setAprendices(aprendicesFicha)

            const claveCompetencias = await get("competencias")
            setCompetencias(claveCompetencias)

            const motivosSelect = await get("motivos-comite")
            setMotivos(motivosSelect)

            const decisionSelect = await get("estado-decision")
            setDecision(decisionSelect)
         } catch (error) {
            console.log(error)
         }
      }
      obtenerDatos()
      console.log(fichaInfo)
      
   }, [ficha])
   
   const traerResultadosE = async () => {
      try {
         var comp = document.querySelector("#competenciaEntregaFicha").value
         const claveResultados = await get(`resultado-aprendizaje/competencia/${comp}`)
         setResultados(claveResultados)
      } catch (error) {
         console.error(error)
      }
   }
   
   const traerResultadosO = async () => {
      try {
         var comp = document.querySelector("#competenciaObservacion").value
         const claveResultados = await get(`resultado-aprendizaje/competencia/${comp}`)
         setResultados(claveResultados)
      } catch (error) {
         console.error(error)
      }
   }

   const pasarDatos = async () => { }

   const pasarForm = () => {
      if (seccion1Visible) {
         setSeccion1Visible(false);
         setSeccion2Visible(true);
      }
      if (seccion2Visible) {
         setSeccion2Visible(false);
         setSeccion1Visible(true);
      }
   }

   return (
      <div>
         <h1 className='text-4xl pb-2'>Entrega Ficha</h1>
         {seccion1Visible && (
            <CreateEntregaFicha
               fichaInfo={fichaInfo}
               competencias={competencias}
               resultados={resultados}
               traerResultadosE={traerResultadosE}
               pasarDatos={pasarDatos}
               pasarForm={pasarForm}
            />
         )}
         {seccion2Visible && (
            <CreateObservacionesAprendiz
               aprendices={aprendices}
               decision={decision}
               motivos={motivos}
               pasarForm={pasarForm}
               fichaInfo={fichaInfo}
               competencias={competencias}
               resultados={resultados}
               traerResultadosO={traerResultadosO}
            />
         )}
      </div>
   );
}

export default EntregaFicha;