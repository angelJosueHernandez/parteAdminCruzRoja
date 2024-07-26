import React, {useState,useEffect} from 'react'
import './TableCitas.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FiSearch } from "react-icons/fi";

const TableCitas = () => {

    const [citas,setCitas]=useState([]);

    const URLUser='http://localhost:3000/citasRegistradas';

    const peticionGet= async()=>{
        const response= await fetch(URLUser)
        const data= await response.json();
        setCitas(data) 
    }
    
    useEffect(()=>{
        peticionGet();
    },[])

    // Función para actualizar el estado de una cita
    const atenderCita = async (ID_Cita, estadoActual) => {
        try {
            // Determina el nuevo estado basado en el estado actual
            const nuevoEstado = estadoActual === 'Atendido' ? 'Pendiente' : 'Atendido';

            // Realiza la solicitud a la API para actualizar el estado de la cita
            await fetch(`http://localhost:3000/citas/${ID_Cita}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }), // Cambia 'Atendido' según lo que necesites
            });

            // Una vez que se actualiza la cita en la API, vuelve a cargar las citas para reflejar el cambio
            cargarCitas();
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
        }
    };

  return (
    <div>
      <h1 className='title_emergencias'>Registro de Citas</h1>
        <div className='contenedor_buscador'>
            {/*<div className='contedor_search'>
                <FiSearch  className='icon_search'/>
                <input className='btn_search' type="search" placeholder='Buscar'/>
            </div>*/}
        </div>
        <div>
            <table className='tabla_citas'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Tipo de Tramite</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {citas.map((item) => (
                    <tr key={item.ID_Cita}>
                        <td>{item.ID_Cita}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido_Paterno}</td>
                        <td>{item.apellido_Materno}</td>
                        <td>{item.fecha}</td>
                        <td>{item.horario}</td>
                        <td>{item.ID_Servicio}</td>
                        <td>{item.estado}</td>
                        <td>
                            <div className='btn_mostrarC'>
                                <button className='' 
                                        onClick={() => atenderCita(item.ID_Cita,item.estado)} // Pasa el estado actual
                                        type="button">{item.estado === 'Atendido' ? 'Pendiente' : 'Atender'}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default TableCitas
