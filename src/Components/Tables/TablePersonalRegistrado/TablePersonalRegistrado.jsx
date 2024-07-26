import React, { useState, useEffect } from 'react';
import './TablePersonalRegistrado.css';
import { FaUserEdit, FaTimes } from "react-icons/fa";

const TablePersonalRegistrado = () => {
    const [personal, setPersonal] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [selectedPersonalId, setSelectedPersonalId] = useState('');
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const URLPersonal = 'http://localhost:3000/personal';
    const URLTipoCargo = 'http://localhost:3000/tipoCargo';

    useEffect(() => {
        const fetchData = async () => {
            const personalResponse = await fetch(URLPersonal);
            const personalData = await personalResponse.json();
            setPersonal(personalData);

            const cargoResponse = await fetch(URLTipoCargo);
            const cargoData = await cargoResponse.json();
            setCargo(cargoData);
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const selected = personal.find(item => item.ID_Asociado === selectedPersonalId);
        setSelectedPersonal(selected);
    }, [selectedPersonalId, personal]);

    const handleCargoChange = (event) => {
        setSelectedCargo(event.target.value);
    };

    const handleEdit = (id) => {
        setSelectedPersonalId(id);
        setEditMode(true);
        toggleMenu();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/actualizarPersonal/${selectedPersonalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id_Cargo: selectedCargo }),
            });
            if (response.ok) {
                toggleMenu();
            } else {
                console.error('Error al actualizar el cargo');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        toggleMenu();
    };

    function toggleMenu() {
        setModalOpen(!modalOpen);
    }

    const atenderCita = async (ID_Asociado, estadoActual) => {
        try {
            const nuevoEstado = estadoActual === 'Activo' ? 'Desactivado' : 'Activo';
            await fetch(`http://localhost:3000/actualizarEstadoPersonal/${ID_Asociado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado_Usuario: nuevoEstado }),
            });
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    return (
        <div>
            <h1 className='title_emergencias'>Personal Registrado</h1>
            <div>
                <table className='tabla_personal'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Registro</th>
                            <th>Estado del Usuario</th>
                            <th>Estado de Cuenta</th>
                            <th>Cargo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personal.map((item) => (
                            <tr key={item.ID_Asociado}>
                                <td>{item.ID_Asociado}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellidoP}</td>
                                <td>{item.apellidoM}</td>
                                <td>{formatDate(item.fecha_Registro)}</td>
                                <td>{item.estado_Usuario}</td>
                                <td>{item.estado_Cuenta}</td>
                                <td>{item.Id_Cargo}</td>
                                <td>
                                    <div className='contenedor_btn'>
                                        <button className='btn_editar' type="button" onClick={() => handleEdit(item.ID_Asociado)}><FaUserEdit /></button>
                                        <button
                                            className='btn_eliminar'
                                            onClick={() => atenderCita(item.ID_Asociado, item.estado_Usuario)}
                                            type="button">{item.estado_Usuario === 'Activo' ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                

                <div>
                    {editMode && (
                        <form className={`modal_editar ${modalOpen ? 'open-menu' : ''}`} id='modalEditar' onSubmit={handleSubmit}>
                            {selectedPersonal && (
                                <>
                                    <div className='btn_group'>
                                        <label htmlFor="">Nombre</label>
                                        <input className='input_Modal' type="text" value={selectedPersonal.nombre} readOnly />
                                    </div>
                                    <div className='btn_group'>
                                        <label htmlFor="">Apellido Paterno</label>
                                        <input className='input_Modal' type="text" value={selectedPersonal.apellidoP} readOnly />
                                    </div>
                                    <div className='btn_group'>
                                        <label htmlFor="">Apellido Materno</label>
                                        <input className='input_Modal' type="text" value={selectedPersonal.apellidoM} readOnly />
                                    </div>
                                </>
                            )}

                            <div className='btn_group'>
                                <label htmlFor="">Cargo</label>
                                <select className='input_Modal' value={selectedCargo} onChange={handleCargoChange}>
                                    {cargo.map((cargos) => (
                                        <option
                                            key={cargos.Id_Cargo}
                                            value={cargos.Id_Cargo}>{cargos.tipo_Cargo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='contenedor_enviar'>
                                <div className="btn-group">
                                    <button className='btn_enviar' type="submit">Actualizar</button>
                                    <button className='btnCancelar' type="button" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TablePersonalRegistrado;
