import React, { Fragment, useEffect, useMemo, useState } from "react";
import { get, eliminar } from "../../../config/Api/api";
import DataTable from "../../../components/Datatable/Datatable";
import Modal from "../../../components/Modals/Modal";
import { CreateQueja, ConsultarQuejas } from "./components/quejas.forms";
import jwt_decode from "jwt-decode"
import Swal from 'sweetalert2';
import UpdateModal from "../../../components/Modals/UpdateModal";
import QuejaDesercion from "./separadosMotivos/quejaDesercion";
import QuejaBajoRendimiento from "./separadosMotivos/quejaBajoRendimiento";
import QuejaFelicitaciones from "./separadosMotivos/quejaFelicitaciones";


const QuejasComite = () => {
   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user, setUser] = useState(token.userInfo);
   const [queja, setQueja] = useState([])
   const [ficha, setFichas] = useState([])
   const [motivos, setMotivos] = useState([])
   const [programaFormtivo, setProgramaFormativo] = useState([])
   const [aprendizQueja, setAprendizQueja] = useState([])
   const [compentencia, setCompetencia] = useState([])
   // const [observaciones, setObservaciones] = useState([])
   const [decision, setDecision] = useState([])
   const [bajoRendimineto, setBajoRendimiento] = useState([])
   const [desercion, setDesercion] = useState([])
   const [felicitaciones, setFelicitaciones] = useState([])

   console.log("MIrar queja: ", ficha.codigoFicha)
   console.log("MIrar queja: ", decision)

   useEffect(() => {
      const obtenerQuejas = async () => {
         try {
            const dataDesicion = await get("estado-decision")
            setDecision(dataDesicion)

            // const observacionesData = await get('observaciones-aprendiz/1')
            // setObservaciones(observacionesData)

            const dataBJ = await get("quejas/motivo/1")
            setBajoRendimiento(dataBJ)

            const dataD = await get("quejas/motivo/2")
            setDesercion(dataD)

            const dataF = await get("quejas/motivo/3")
            setFelicitaciones(dataF)

            const data = await get(`quejas/instructor/${user.idUsuario}`)
            setQueja(data)

            const claveMo = await get("motivos-comite")
            setMotivos(claveMo)

            const claveF = await get("fichas")
            setFichas(claveF)

            const clavePF = await get("programas-formativos")
            setProgramaFormativo(clavePF)

            const claveA = await get("aprendices")
            setAprendizQueja(claveA)

            const claveComp = await get("competencias")
            setCompetencia(claveComp)

         } catch (error) {
            console.log(error)
         }
      }
      obtenerQuejas()
   }, [user])
   const styles = {
      modalWidth: "50px"
   }

   return (
      <Fragment>
         <div className="mx-auto" style={{ width: "100%" }}>
            <div className="row md-4" >
               <div className="col-md-10">
                  <h2 className='text-4xl pb-2'>Quejas</h2>
               </div>
               <div className="col-md-2">
                  <Modal children={<CreateQueja claves={{ queja: [...queja], programaF: [...programaFormtivo], aprendizQ: [...aprendizQueja], competencia: [...compentencia], fichas: [...ficha], motivosQ: [...motivos] }} />} 
                     configModal={{
                        identify: "QuejaComite",
                        modalClasses: "",
                        // modalStylesContent: {},
                        nameBtn: "Nueva Queja",
                        btnClasses: "s-button-success p-2 rounded",
                        nameTitle: "Crear Queja",
                     }}
                  />
               </div>
            </div>
            <h2 className='text-4xl mb-2'></h2>
            <div className='card mb-20'>
               <div className='card-body'>
                  <ul className="nav nav-tabs">
                     <li className="nav-item">
                        <a href="#BJ" data-toggle="tab" className="nav-link active">Bajo Rendimiento</a>
                     </li>
                     <li className="nav-item">
                        <a href="#D" data-toggle="tab" className="nav-link">Desercion</a>
                     </li>
                     <li className="nav-item">
                        <a href="#F" data-toggle="tab" className="nav-link">Felicitaciones</a>
                     </li>
                  </ul>
                  <div className="tab-content">
                     <div className="tab-pane active" id="BJ">
                        <div className="px-2 pt-4">

                           <QuejaBajoRendimiento decision={decision} quejasBJ={bajoRendimineto} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="D">
                        <div className="px-2 pt-4">
                           <QuejaDesercion quejasD={desercion} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="F">
                        <div className="px-2 pt-4">
                           <QuejaFelicitaciones quejasF={felicitaciones} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
};

export default QuejasComite;