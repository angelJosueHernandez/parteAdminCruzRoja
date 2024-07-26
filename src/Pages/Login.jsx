import React, { useState } from 'react';
import LoginFrom from './Logi.png';
import { message, Spin, Alert, Flex  } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa tu archivo CSS donde defines estilos personalizados
import Fondo from './fondo.png'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import p3 from './p9.png'
import './Login.css'

export function Login() {
  const navigate = useNavigate();
  const [idIn, setIdIn] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/personal/authenticatePersonal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idIn: idIn,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la autenticación es exitosa, establece el indicador de autenticación en localStorage
        localStorage.setItem('Autentificado', true);
        // Además, podrías redirigir al usuario a otra página o realizar otras acciones necesarias
        message.loading('Verficando...',2);
        setTimeout(() => {
          message.success('Bienvenido querido Usuario');
          navigate('/HomeAdmin');// Redirige al usuario al panel de control
        }, 2500);
     
  
      
      } else {
        navigate('/HomeAdmin');
        // Si la autenticación falla, muestra un mensaje de error
        message.error('Error, estos  datos no corresponden a ninguna cuenta',2);
        console.log('La autenticación ha fallado:', data.mensaje);
      }
    } catch (error) {
      // Maneja los errores de la petición
      console.error('Error al autenticar:', error);
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24 ColorF">
        <div className="text-center">
          <Typography variant="h3" className="font-bold mb-4">Inicio de Sesion</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text font-normal">Introduzca su Id Institucional y su contraseña</Typography>
        </div>
      <br />

        <form className=" " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Id Institucional
            </Typography>
            <Input
             id="id"
             name="id"
             type="text"
             size="lg"
             autoComplete="id"
             required
             placeholder="1234567"
             value={idIn}
             onChange={(e) => setIdIn(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-gray-50"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-600 focus:!border-t-gray-900 bg-gray-50"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
  
        
          <Button  id='boton' name='boton' type="submit" className="mt-6 bg-red-500 BtnLo" fullWidth>
            Iniciar Sesion
          </Button>
      
       
        </form>

      </div>
      <div className="  hidden lg:block">
        <img
          src={p3}
          className="h-full w-full object-cover imgLo rounded-3xl"
        />
      </div>
      
        <img
          src={Fondo}
          className="FondoImg"
        />
     

    </section>
  );
}

export default Login;
