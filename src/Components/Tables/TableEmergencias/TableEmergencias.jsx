import React,{useState,useEffect} from 'react'
import './TableEmergencias.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FiSearch } from "react-icons/fi";

const TableEmergencias = () => {

    const [emergencia,setEmergencia]=useState([]);

    const URLUser='http://localhost:3000/Emergencias';



    
    
    useEffect(() => {

        const peticionGet= async()=>{
            const response= await fetch(URLUser)
            const data= await response.json();
            setEmergencia(data) 
        }

        peticionGet();
        const interval = setInterval(peticionGet, 1000); // Ejecutar la función cada segundo
        
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []); 

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    
  return (
    <div>
        <h1 className='title_emergencias'>Registro de Emergencias</h1>
        <div className='contenedor_buscador'>
           {/*<div className='contedor_search'>
                <FiSearch  className='icon_search'/>
                <input className='btn_search' type="search" placeholder='Buscar'/>
            </div>*/}
        </div>
        <div>
            <table className='tabla_emergencias'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Lugar de Servicio</th>
                        <th>Sexo</th>
                        <th>Edad</th>
                        <th>Tipo de Servicio</th>
                        <th>Responsable</th>
                    </tr>
                </thead>
                <tbody>
                {emergencia.map((item) => (
                    <tr key={item.folio}>
                        <td>{item.folio}</td>
                        <td>{formatDate(item.fecha)}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido_Paterno}</td>
                        <td>{item.apellido_Materno}</td>
                        <td>{item.lugar_Servicio}</td>
                        <td>{item.sexo}</td>
                        <td>{item.edad}</td>
                        <td>{item.ID_Emergencia}</td>
                        <td>{item.ID_Asociado}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default TableEmergencias
