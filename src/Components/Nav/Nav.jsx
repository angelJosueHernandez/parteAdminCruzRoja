import React from 'react'
import './Nav.css'
import { FaUserCircle } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import "primereact/resources/themes/lara-light-cyan/theme.css";

        


export const Nav = () => {
  /*let subMenu=document.getElementById("subMenu");

  function toggleMenu(){
    subMenu.classList.toggle("open-menu");
  }*/
  function toggleMenu() {
    let subMenu = document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    } else {
      console.error("No se encontró el elemento subMenu.");
    }
  }

  return (
    <div className='container'>
      <div className='nav' >
          
          <IoIosNotificationsOutline className='notifi' />
          <BsChatText className='chat'/>
          <FaUserCircle  className='perfil' onClick={toggleMenu}/>
          <div className='submenu-wrap'id='subMenu'>
              <div className='submenu' >
                  <div className='user-info'>
                    <FaUserCircle className='perfil2'/>
                    <h2>Carlos Cifuentes</h2>
                  </div>
                  <hr />
                  <a href="" className='submenu-link'>
                    <FaUserEdit className='image'/>
                    <p>Editar Perfil</p>
                  </a>
                  <a href="" className='submenu-link'>
                    <IoLogOutOutline className='image'/>
                    <p>Cerrar Sesion</p>
                  </a>
              </div>
          </div>
      </div>
    </div>
  )
};

