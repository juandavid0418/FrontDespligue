import React, { useEffect, useMemo, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import UpdateModal from '../../../../components/Modals/UpdateModal';
import { ConsultarQuejas } from '../components/quejas.forms';
import { get, eliminar } from '../../../../config/Api/api';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode"
import { update } from 'lodash';

const QuejaBajoRendimiento = ({ decision, quejasBJ }) => {
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user, setUser] = useState(token.userInfo);
   const [queja, setQueja] = useState([])
   const [observaciones, setObservaciones] = useState([])
   const [formData, setFormData] = useState({
      decisionObservacion: 1
   })
   console.log("desicion: ", decision.nombreEstadoDecision === "Aprobado")

   useEffect(() => {
      const obtenerQuejas = async () => {
         try {
            const data = await get(`quejas/instructor/${user.idUsuario}`)
            setQueja(data)

            //  const dataObserva = await get(`observaciones-aprendiz/${id}`)
            //  setObservaciones(dataObserva)

         } catch (error) {
            console.log(error)
         }
      }
      obtenerQuejas()
   }, [user])

   const handleDelete = async (id) => {
      try {
         eliminar(`quejas/${id}`)
         setQueja(queja => queja.filter(i => i.idQueja !== id));
      } catch (error) {
         console.log("Error al eliminar", error)
      }
   }

   const handleSubmit = (id) => {
      Swal.fire({
         title: '¿Está seguro de revertir?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '¡Revertir!'
      }).then((result) => {
         if (result.isConfirmed) {
            handleDelete(id)
            window.location.reload()
            Swal.fire(
               'La queja ha sido revertida exitosamente.',
               '',
               'success'
            )
         }
      })

      const dataObserva = {
         decisionObservacion: 1
      }
   }
   // const updateO = update(`observaciones-aprendiz/${observa.idObservacionAprendiz}`)
   // document.write("Melo:", updateO)


   const headers = [
      // { title: "ID Queja", prop: "idQueja" },
      { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
      { title: "Usuario", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
      { title: "Programa", prop: "competenciaQueja.programasCompetencia.nombrePF" },
      { title: "Código Ficha", prop: "aprendizQueja.fichaAprendiz.codigoFicha" },
      { title: "Motivo", prop: "motivoQueja.nombreMotivo" },
      { title: "Descripción", prop: "descripcionMotivo" },
      { title: "Estado", prop: "estadoQueja.nombreEstadoQuejas" },
      {
         title: "Acciones", prop: "actions", cell: (row) => {
            return (
               <div className="row">
                  <div className=" col-md-5">
                     <button type="button" onClick={() => handleSubmit(row.idQueja)} className="btn btn-success bg-success" data-target="#revertirQuejas" name='revertirQuejas'>
                        Revertir
                     </button>
                  </div>
                  <div className=" col-md-2">
                     <UpdateModal
                        configModal={{
                           identify: `${row.idQueja}`,
                           modalClasses: "",
                           // modalStylesContent: {},
                           nameBtn: "Consultar",
                           btnClasses: "s-button-consult p-2 rounded",
                           nameTitle: "Actualizar Queja",
                        }}
                        children={<ConsultarQuejas queja={row} />} identify={`${row.idQueja}`}
                     />
                  </div>
                  {/* {console.log("Row de quejas", row)} */}
               </div>
            )
         }
      }
   ];

   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   };

   return (
      <DataTable
         headers={headers}
         body={quejasBJ}
         configTable={configTable}
      />
   )
}

export default QuejaBajoRendimiento
