import React, {useEffect, useState} from 'react'
import './TableUsers.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FiSearch } from "react-icons/fi";


const TableUsers = () => {

    const [users,setUsers]=useState([]);

    const URLUser='http://localhost:3000/user';

    
    useEffect(() => {

        const peticionGet= async()=>{
            const response= await fetch(URLUser)
            const data= await response.json();
            setUsers(data) 
        };
        
        
        peticionGet(); // Ejecutar la función inicialmente
        
        const interval = setInterval(peticionGet, 1000); // Ejecutar la función cada segundo
        
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

  



  return (
    <div>
        <h1 className='title_emergencias'>Usuarios Registrados</h1>
        <div className='contenedor_buscador'>
            {/*<div className='contedor_search'>
                <FiSearch  className='icon_search'/>
                <input className='btn_search' type="search" placeholder='Buscar'/>
            </div>*/}
        </div>
        <div>
            <table className='tabla_usuarios'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha de Registro</th>
                        <th>Inicio de Sesion</th>
                        <th>Estado del Usuario </th>
                        <th>Estado de Cuenta</th>
                        <th>Fecha de Bloqueo</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.ID_Usuario}>
                        <td>{user.ID_Usuario}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellidoP}</td>
                        <td>{user.apellidoM}</td>
                        <td>{user.fecha_Registro}</td>
                        <td>{user.fecha_Sesion}</td>
                        <td>{user.estado_Usuario}</td>
                        <td>{user.estado_Cuenta}</td>
                        <td>{user.fecha_bloqueo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default TableUsers
