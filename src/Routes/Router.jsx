import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeAdmin from '../Pages/HomeAdmin/HomeAdmin';
import Citas from '../Pages/Citas/Citas';
import ContratacionAmbulancias from '../Pages/ContratacionAmbulancias/ContratacionAmbulacias';
import Donaciones from '../Pages/Donaciones/Donaciones';
import HistorialMedico from '../Pages/HistorialMedico/HistorialMedico';
import SuministrosMedicos from '../Pages/SuministrosMedicos/SuministrosMedicos';
import SideBar from '../Components/SideBar/SideBar';
import { Nav } from '../Components/Nav/Nav';
import Users from '../Pages/Users/Users';
import RegistroPersonal from '../Pages/RegistroPersonal/RegistroPersonal';
import PersonalRegistrado from '../Pages/PersonalRegistrado/PersonalRegistrado';
import Emergencias from '../Pages/Emergencias/Emergencias';
import HistorialRegistrado from '../Pages/HistorialRegistrado/HistorialRegistrado';
import RegistrarEmergencia from '../Pages/RegistrarEmergencia/RegistrarEmergencia';
import FormFullHistorial from '../Components/Form/FormHistorialMedico/FormFullHistorial/FormFullHistorial';
import Login from '../Pages/Login';
import { useNavigate } from 'react-router-dom';
import { SideBard2 } from '../Components/SideBar/SideBard2';
import RegistroMostrarEditar from '../Components/Form/FormHistorialMedico/FormFullHistorial/RegistroMostrarEditar';
import EditarHistorial from '../Pages/EditarHistorial/EditarHistorial';
function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem('Autentificado') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : <Navigate to="/" replace />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute
              element={
                <div>
                  <SideBar>
                    <Nav />
                    <Routes>
                      <Route path="/HomeAdmin" element={<HomeAdmin />} />
                      <Route path="/Citas" element={<Citas />} />
                      <Route path="/ContratacionAmbulancias" element={<ContratacionAmbulancias />} />
                      <Route path="/Donaciones" element={<Donaciones />} />
                      <Route path="/RegistrarEmergencias" element={<RegistrarEmergencia />} />
                      <Route path="/Emergencias" element={<Emergencias />} />
                      <Route path="/HistorialMedico" element={<HistorialMedico />} />
                      <Route path="/HistorialRegistrado" element={<HistorialRegistrado />} />
                      <Route path="/HistorialRegistrado/HistorialCompleto/:ID_Historial" element={<EditarHistorial />} />
                      <Route path="/RegistroPersonal" element={<RegistroPersonal />} />
                      <Route path="/PersonalRegistrado" element={<PersonalRegistrado />} />
                      <Route path="/SuministrosMedicos" element={<SuministrosMedicos />} />
                      <Route path="/UsuariosRegistrados" element={<Users />} />
                    </Routes>
                  </SideBar>
                </div>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
