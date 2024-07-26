import { FaAmbulance, FaLock, FaMoneyBill, FaUser,FaDonate,FaBriefcaseMedical,FaFileMedicalAlt } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";


export const routes = [
    {
      path: "/",
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
      path: "/HistorialMedico",
      name: "Historial Medico",
      icon: <RiFolderHistoryFill />,
    },
    {
      path: "/SuministrosMedicos",
      name: "Suministros",
      icon: <FaBriefcaseMedical />,
    },
    {
      path: "/UsuariosRegistrados",
      name: "Usuarios",
      icon: <FaBriefcaseMedical />,
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
      path: "/order",
      name: "Order",
      icon: <BsCartCheck />,
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
    {
      path: "/saved",
      name: "Saved",
      icon: <AiFillHeart />,
    },
  ];