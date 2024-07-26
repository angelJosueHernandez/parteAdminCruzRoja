import { NavLink } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import { FaAmbulance, FaLock, FaMoneyBill, FaUser,FaDonate,FaBriefcaseMedical,FaFileMedicalAlt } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { TbEmergencyBed } from "react-icons/tb";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsPersonRolodex } from "react-icons/bs";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './SideBar.css'
//import {routes} from '../../Routes/Routers'

const routes = [
  {
    path: "/HomeAdmin",
    name: "Home",
    icon: <IoHomeSharp />,
  },
  {
    path: "/Citas",
    name: "Citas",
    icon: <FaFileMedicalAlt />,
  },
  {
    path: "/ContratacionAmbulancias",
    name: "Servicios",
    icon: <FaAmbulance />,
  },
  {
    path: "/Donaciones",
    name: "Donaciones",
    icon: <FaDonate />,
  },
  {
    path: "/RegistrarEmergencias",
    name: "Registrar Emergencia",
    icon: <TbEmergencyBed />,
  },
  {
    path: "/Emergencias",
    name: "Emergencias",
    icon: <TbEmergencyBed />,
  },
  {
    path: "/HistorialMedico",
    name: "Registro Historial",
    icon: <RiFolderHistoryFill />,
  },
  {
    path: "/HistorialRegistrado",
    name: "Historial Registrado",
    icon: <RiFolderHistoryFill />,
  },
  {
    path: "/RegistroPersonal",
    name: "Registro de Personal",
    icon: <BsFillPersonVcardFill />,
  },
  {
    path: "/PersonalRegistrado",
    name: "Personal Registrado",
    icon: <BsPersonRolodex />,
  },
  {
    path: "/SuministrosMedicos",
    name: "Suministros",
    icon: <FaBriefcaseMedical />,
  },
  {
    path: "/UsuariosRegistrados",
    name: "Usuarios Registrados",
    icon: <FaUser />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.1, //duracion del titulo Cruz Roja
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <div className='main-container'>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Cruz Roja
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;