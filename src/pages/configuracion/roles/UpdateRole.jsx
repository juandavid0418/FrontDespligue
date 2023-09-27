import { Fragment, useState } from 'react';
import { update, get } from "../../../config/Api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const UpdateRole = () => {
    const { id } = useParams()
    console.log("Este es el id:   ",id)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombreRol: id.nombreRol,
        fichasScope: false,
        proyectoScope: false,
        fichasEditScope: false,
        fichasCreateScope: false,
        fichasConsultScope: false,
        proyectoEditScope: false,
        proyectoCreateScope: false,
        proyectoConsultScope: false,
        comiteScope: false,
        quejasComiteScope: false,
        quejasComiteEditScope: false,
        quejasComiteCreateScope: false,
        quejasComiteConsultScope: false,
        comiteEditScope: false,
        comiteCreateScope: false,
        comiteConsultScope: false,
        planMejoramientoScope: false,
        planMejoramientoEditScope: false,
        planMejoramientoCreateScope: false,
        planMejoramientoConsultScope: false,
    });

    const [errors, setErrors] = useState({
        nombreRol: ""
    });

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        let newErrors = { ...errors };

        if (value.trim() === "") {
            newErrors[name] = "Campo requerido";
        } else {
            newErrors[name] = "";
        }

        if (name === "nombreRol") {
            const roles = await get("roles");
            if (roles.some((rol) => rol.nombre === value)) {
                newErrors[name] = "El nombre del rol ya existe";
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) {
            console.log("Existen errores en el formulario.");
            return;
        } else {
          try {
            //objeto con las propiedades seleccionadas (o sea, las que sean valor true)
            const dataToSend = {};
            for (const key in formData) {
                if (formData[key]) {
                    dataToSend[key] = formData[key];
                }
            }

            const data = await update(`roles/${id}`, dataToSend);
            console.log(data);
            navigate('/roles');
        } catch (error) {
            console.log(error);
        }
        }
    };

    const cancelForm = () => {
        setFormData({
            nombreRol: id.nombreRol
        })
        navigate('/roles');
    };

    return (
        <Fragment>
            <h2 className='text-4xl mb-2'>Crear Rol</h2>
            <div className='card mb-4 p-4'>
                <form onSubmit={handleSubmit}>
                    <div className="m-3">
                        <div className='col-md-5 mb-4'>
                            <label htmlFor="nombreRol">Nombre Rol:</label>
                            <input
                                value={formData.nombreRol}
                                onChange={handleChange}
                                name="nombreRol"
                                type="text"
                                className={`form-control form-control-sm ${errors.nombreRol ? "is-invalid" : ""}`}
                                id="nombreRol"
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <h3 className='fw-bold mb-3'>Asignar Permisos</h3>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <h4>Configuración</h4>
                                    <div>
                                        <input className='form-check-input' type="checkbox" name="administratorScope" id="administratorScope" />
                                        <label className='form-check-label' htmlFor="administratorScope">Administrador</label>
                                    </div>
                                    <div>
                                        <input className='form-check-input' type="checkbox" name="managementScope" id="managementScope" />
                                        <label className='form-check-label' htmlFor="managementScope">Gestión</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <h4>Usuarios</h4>
                                    <div>
                                        <input className='form-check-input' type="checkbox" name="usersScope" id="usersScope" />
                                        <label className='form-check-label' htmlFor="usersScope">Usuarios</label>
                                    </div>
                                    <div>
                                        <input className='form-check-input' type="checkbox" name="studentsScope" id="studentsScope" />
                                        <label className='form-check-label' htmlFor="studentsScope">Aprendices</label>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='row'>
                            <div className='col-md-6'>
                                <h3 className='fw-bold mb-3'>Gestión de Ficha</h3>
                                <div>
                                    <input className='form-check-input' type="checkbox" name="fichasScope" id="fichasScope" onChange={handleChange} />
                                    <label className='form-check-label' htmlFor="fichasScope">Fichas</label>
                                </div>
                                {formData.fichasScope && (
                                    <div className='ms-4'>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="fichasEditScope" id="fichasEditScope" />
                                            <label className='form-check-label' htmlFor="fichasEditScope">Editar</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="fichasCreateScope" id="fichasCreateScope" />
                                            <label className='form-check-label' htmlFor="fichasCreateScope">Crear</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="fichasConsultScope" id="fichasConsultScope" />
                                            <label className='form-check-label' htmlFor="fichasConsultScope">Consultar</label>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <input className='form-check-input' type="checkbox" name="proyectoScope" id="proyectoScope" onChange={handleChange} />
                                    <label className='form-check-label' htmlFor="proyectoScope">Proyecto Formativo</label>
                                </div>
                                {formData.proyectoScope && (
                                    <div className='ms-4'>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="proyectoEditScope" id="proyectoEditScope" />
                                            <label className='form-check-label' htmlFor="proyectoEditScope">Editar</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="proyectoCreateScope" id="proyectoCreateScope" />
                                            <label className='form-check-label' htmlFor="proyectoCreateScope">Crear</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="proyectoConsultScope" id="proyectoConsultScope" />
                                            <label className='form-check-label' htmlFor="proyectoConsultScope">Consultar</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='col-md-6'>
                                <h3 className='fw-bold mb-3'>Comité</h3>
                                <div>
                                    <input className='form-check-input' type="checkbox" name="comiteScope" id="comiteScope" onChange={handleChange} />
                                    <label className='form-check-label' htmlFor="comiteScope">Comité</label>
                                </div>
                                {formData.comiteScope && (
                                    <div className='ms-4'>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="comiteEditScope" id="comiteEditScope" />
                                            <label className='form-check-label' htmlFor="comiteEditScope">Editar</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="comiteCreateScope" id="comiteCreateScope" />
                                            <label className='form-check-label' htmlFor="comiteCreateScope">Crear</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="comiteConsultScope" id="comiteConsultScope" />
                                            <label className='form-check-label' htmlFor="comiteConsultScope">Consultar</label>
                                        </div>
                                    </div>
                                )}
                            <div className='mb-4'>
                                <div>
                                    <input className='form-check-input' type="checkbox" name="quejasComiteScope" id="quejasComiteScope" onChange={handleChange} />
                                    <label className='form-check-label' htmlFor="quejasComiteScope">Quejas Comité</label>
                                </div>
                                {formData.quejasComiteScope && (
                                    <div className='ms-4'>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="quejasComiteEditScope" id="quejasComiteEditScope" />
                                            <label className='form-check-label' htmlFor="quejasComiteEditScope">Editar</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="quejasComiteCreateScope" id="quejasComiteCreateScope" />
                                            <label className='form-check-label' htmlFor="quejasComiteCreateScope">Crear</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="quejasComiteConsultScope" id="quejasComiteConsultScope" />
                                            <label className='form-check-label' htmlFor="quejasComiteConsultScope">Consultar</label>
                                        </div>
                                    </div>
                                )}
                            <div className='mb-4'>
                                <div>
                                    <input className='form-check-input' type="checkbox" name="planMejoramientoScope" id="planMejoramientoScope" onChange={handleChange} />
                                    <label className='form-check-label' htmlFor="planMejoramientoScope">Plan de Mejoramiento</label>
                                </div>
                                {formData.planMejoramientoScope && (
                                    <div className='ms-4'>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="planMejoramientoEditScope" id="planMejoramientoEditScope" />
                                            <label className='form-check-label' htmlFor="planMejoramientoEditScope">Editar</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="planMejoramientoCreateScope" id="planMejoramientoCreateScope" />
                                            <label className='form-check-label' htmlFor="planMejoramientoCreateScope">Crear</label>
                                        </div>
                                        <div>
                                            <input className='form-check-input' type="checkbox" name="planMejoramientoConsultScope" id="planMejoramientoConsultScope" />
                                            <label className='form-check-label' htmlFor="planMejoramientoConsultScope">Consultar</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                            </div>
                            </div>
                        
                    </div>
                    <div className='d-flex justify-content-end'>
                    <button type="submit" className="smc-success rounded p-2 mx-3">
                            Crear
                        </button>
                        <button className="btn-secondary rounded p-2 mx-3" onClick={cancelForm}>
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default UpdateRole;
