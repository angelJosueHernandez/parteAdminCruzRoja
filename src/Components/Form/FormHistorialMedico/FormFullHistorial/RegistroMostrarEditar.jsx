
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import './RegistroMostrarEditar.css'
import { message } from 'antd';


export default function RegistroMostrarEditar() {



  /////////-------------------inputs GUARDAR INFORMACION------------------
  const { ID_Historial } = useParams();
  const [historial2, setHistorial2] = useState(null);
  const [historiales2, setHistoriales2] = useState([]);
  const [antecedente2, setAntecedente2] = useState([]);
  const [expedientes2, setExpedientes2] = useState([]);
  const [contactoEm2, setContactoEm2] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/historialMedicoId/${ID_Historial}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const data = await response.json();
            // Verifica si data es un arreglo y si es así, toma el primer elemento
            const historialData = Array.isArray(data) ? data[0] : data;
            setHistorial2(historialData);
            setHistoriales2(historialData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }

        try {
            const response = await fetch(`http://localhost:3000/antecedentesID/${ID_Historial}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const data = await response.json();
            // Verifica si data es un arreglo y si es así, mantenlo como está.
            // Si no es un arreglo, envuélvelo en un arreglo.
            const antecedenteData = Array.isArray(data) ? data : [data];
            setAntecedente2(antecedenteData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }

        try {
            const response = await fetch(`http://localhost:3000/expedienteID/${ID_Historial}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los expedientes');
            }
            const data = await response.json();
            setExpedientes2(data);
        } catch (error) {
            console.error('Error al obtener los expedientes:', error);
        }
    };

    // Llama a fetchData inicialmente
    fetchData();

    // Llama a fetchData cada segundo
    const intervalId = setInterval(fetchData, 1000);

    // Limpia el intervalo en el momento que el componente se desmonta
    return () => clearInterval(intervalId);
}, [ID_Historial]);

//////-------------------INPUTS DE SELECCION--------------------------
  const [noAplicaChecked, setNoAplicaChecked] = useState(false);
  const [otrosMedicamentosChecked, setOtrosMedicamentosChecked] = useState({
    penicilina: false,
    ibuprofeno: false,
    amoxicilina: false,
    aspirina: false,
    codeina: false,
    sulfonamidas: false,
    trimetoprim: false,
    naproxeno: false,
    cefalexina: false,
    metamizol: false,
    acetaminofen: false,
    diclofenaco: false,
    eritromicina: false,
    doxiciclina: false,
    cloranfenicol: false,
    oxicodona: false,
    tetraciclina: false,
    atorvastatina: false,
    fluconazol: false,
  });


   // Agregar estado para el nuevo medicamento
   const [nuevoMedicamento, setNuevoMedicamento] = useState('');

   // Función para manejar el cambio en el input del nuevo medicamento
   const handleNuevoMedicamentoChange = (event) => {
     setNuevoMedicamento(event.target.value);
   };
 


   // Función para agregar el nuevo medicamento
   const handleAgregarNuevoMedicamento = () => {
    // Validar que el nuevo medicamento comience con mayúscula
    if (!/^[A-Z].*$/.test(nuevoMedicamento)) {
      message.error('El nombre del medicamento debe comenzar con mayúscula.');
      return;
    }
  
    // Agregar el nuevo medicamento al estado otrosMedicamentosChecked
    setOtrosMedicamentosChecked((prevMedicamentos) => ({
      ...prevMedicamentos,
      [nuevoMedicamento]: true,
    }));
  
    // Limpiar el input del nuevo medicamento
    setNuevoMedicamento('');
  
    // Guardar en el almacenamiento local
    localStorage.setItem('otrosMedicamentosChecked', JSON.stringify({
      ...otrosMedicamentosChecked,
      [nuevoMedicamento]: true,
    }));
  };
  
  useEffect(() => {
    // Cargar los medicamentos desde el almacenamiento local al inicializar el componente
    const storedMedicamentos = localStorage.getItem('otrosMedicamentosChecked');
    if (storedMedicamentos) {
      setOtrosMedicamentosChecked(JSON.parse(storedMedicamentos));
    }
  }, []);
  

///////////---------------------------valores input--------------

const [formValues, setFormValues] = useState({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  edad: '',
  municipio: '',
  colonia: '',
  calle: '',
  telefono: '',
  nombreContacto: '',
  apellidoPaternoContacto: '',
  apellidoMaternoContacto: '',
  telefonoContacto: '',
  medicamentosAlergicos: '',
});
const handleInputChange = (event) => {
  const { name, value } = event.target;
  console.log(`Input '${name}' changed to: ${value}`);
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};



//console.log('Valores del formulario:', formValues);

const handleMedicamentoChange = (event) => {
  const { id, checked } = event.target;
  console.log(`Medicamento '${id}' checked: ${checked}`);
  
  if (id === 'no-aplica') {
    // Si se selecciona "No aplica", establece directamente el valor en el estado
    setNoAplicaChecked(checked);
    setFormValues((prevValues) => ({
      ...prevValues,
      medicamentosAlergicos: checked ? 'No aplica' : '',
    }));
    return;
  }

  setFormValues((prevValues) => {
    // Si el medicamento se selecciona, lo agrega a la lista
    if (checked) {
      setNoAplicaChecked(false); // Desmarca el estado noAplicaChecked
      const nuevosMedicamentos = prevValues.medicamentosAlergicos
        ? `${prevValues.medicamentosAlergicos}, ${id}`
        : id;
      return {
        ...prevValues,
        medicamentosAlergicos: nuevosMedicamentos,
      };
    }

    // Si el medicamento se deselecciona, lo elimina de la lista
    const nuevosMedicamentos = prevValues.medicamentosAlergicos
      .split(', ')
      .filter((medicamento) => medicamento !== id)
      .join(', ');
    return {
      ...prevValues,
      medicamentosAlergicos: nuevosMedicamentos,
    };
  });
};

// Fuera de la función handleMedicamentoChange
//console.log('Medicamentos alérgicos actualizados:', formValues.medicamentosAlergicos);


///////////---------------------------Antecedentes--------------------------------

const [mostrarFormulario, setMostrarFormulario] = useState(false);

const handleAgregarAntecedente2 = () => {
  setMostrarFormulario(true);
};

const [nuevoAntecedenteVisible, setNuevoAntecedenteVisible] = useState(false);
const [nuevoAntecedente, setNuevoAntecedente] = useState({
    nombreAntecedente: '',
    fecha_Diacnostico: '',
    tratamiento: '',
    idH:ID_Historial
});




const handleCancelarAgregarAntecedente = () => {
    setMostrarFormulario(false);
};

const handleChangeNuevoAntecedente = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNuevoAntecedente(prevState => ({
        ...prevState,
        [name]: newValue
    }));
};


const handleSubmitNuevoAntecedente = async () => {

    const fechaHoy = new Date();
    const fechaSeleccionada = new Date(nuevoAntecedente.fecha_Diacnostico);
    if (nuevoAntecedente.nombreAntecedente== '' || nuevoAntecedente.fecha_Diacnostico == ''|| nuevoAntecedente.tratamiento == '') {
     message.error('Acomplete los campos');
      return;
    }else if (fechaSeleccionada > fechaHoy) {
      message.error('La fecha de diagnóstico no puede ser mayor a la fecha de hoy.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/antecedentesPatologico2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoAntecedente), // Envía el nuevo antecedente como JSON
      });
  
      if (!response.ok) {
        throw new Error('No se pudo agregar el nuevo antecedente');
      }
  
      // Si la solicitud es exitosa, limpia el formulario y oculta el formulario
      setNuevoAntecedente({
        nombreAntecedente: '',
        fecha_Diacnostico: '',
        tratamiento: ''
      });
      message.success('Datos del Antecedente agregados correctamente');
      setNuevoAntecedenteVisible(false);
  
      console.log('Nuevo antecedente agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar el nuevo antecedente:', error);
    }
  };
  

//console.log('Antecedentes:', antecedentes );
 

//console.log('VALORES', formValues);


///////////------------------------VALIDACIONES --------------------------------

const [errores, setErrores] = useState({});

const validate = (valores) => {
  let errores = {};

  // Validación del nombre
  if (!valores.nombre) {
    errores.nombre = 'Por favor ingresa un nombre';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
    errores.nombre = 'El nombre solo puede contener letras';
  }

  // Validación de los apellidos
  if (!valores.apellidoMaterno) {
    errores.apellidoMaterno = 'Por favor ingresa un apellido';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoMaterno)) {
    errores.apellidoMaterno = 'El apellido solo puede contener letras';
  }

  if (!valores.apellidoPaterno) {
    errores.apellidoPaterno = 'Por favor ingresa un apellido';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoPaterno)) {
    errores.apellidoPaterno = 'El apellido solo puede contener letras';
  }

  // Validación de edad
  if (!valores.edad) {
    errores.edad = 'Por favor ingresa una edad';
  } else if (!/^[0-9]{1,40}$/.test(valores.edad)) {
    errores.edad = 'La edad solo puede contener números';
  }

  // Validación del municipio
  if (!valores.municipio) {
    errores.municipio = 'Por favor ingresa un municipio';
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valores.municipio)) {
    errores.municipio = 'El municipio solo puede contener letras';
  }

  // Validación para la colonia
  if (!valores.colonia) {
    errores.colonia = 'Por favor ingresa una colonia';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.colonia)) {
    errores.colonia = 'La colonia solo puede contener letras';
  }

  // Validación para la calle
  if (!valores.calle) {
    errores.calle = 'Por favor ingresa una calle';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.calle)) {
    errores.calle = 'La calle solo puede contener letras';
  }

  // Validación de teléfono
  if (!valores.telefono) {
    errores.telefono = 'Por favor ingresa un teléfono';
  } else if (!/^[0-9]{10}$/.test(valores.telefono)) {
    errores.telefono = 'El teléfono solo puede contener números y 10 digitos';
  }

  // Validación del nombre del contacto
  if (!valores.nombreContacto) {
    errores.nombreContacto = 'Por favor ingresa un nombre';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreContacto)) {
    errores.nombreContacto = 'El nombre solo puede contener letras';
  }

  // Validación del apellido del contacto
  if (!valores.apellidoMaternoContacto) {
    errores.apellidoMaternoContacto = 'Por favor ingresa un apellido';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoMaternoContacto)) {
    errores.apellidoMaternoContacto = 'El apellido solo puede contener letras';
  }

  if (!valores.apellidoPaternoContacto) {
    errores.apellidoPaternoContacto = 'Por favor ingresa un apellido';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoPaternoContacto)) {
    errores.apellidoPaternoContacto = 'El apellido solo puede contener letras';
  }

  // Validación de teléfono del contacto
  if (!valores.telefonoContacto) {
    errores.telefonoContacto = 'Por favor ingresa un teléfono';
  } else if (!/^[0-9]{10}$/.test(valores.telefonoContacto)) {
    errores.telefonoContacto = 'El teléfono solo puede contener números  y 10 digitos';
  }

   // validacion de alergico a medicamento
   if(!valores.medicamentosAlergicos){
    errores.medicamentosAlergicos='Por favor selecciona una respuesta';
}

  return errores;
};



const handleInputBlur = (event) => {
  const { name, value } = event.target;
  const errores = validate(formValues);

  // Actualizar el estado de errores
  setErrores(errores); // Llamar a la función handleInputChange para validar y actualizar errores
};

const handleSubmit = (event) => {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Realizar la validación
    const errores = validate(formValues);
  
    // Actualizar el estado de errores
    setErrores(errores);
  
    // Si no hay errores, enviar el formulario
    if (Object.keys(errores).length === 0) {
      console.log('Formulario enviado:', formValues);
  
      // Guardar los datos en nuevoHistorialMedico
      fetch("http://localhost:3000/nuevoHistorialMedico", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues),
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar datos en nuevoHistorialMedico');
        }
        // Si hay antecedentes, guardarlos en antecedentesPatologico
        if (antecedentes.length > 0) {
          const promesas = antecedentes.map(antecedente => {
            return fetch("http://localhost:3000/antecedentesPatologico", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(antecedente),
              credentials: 'include'
            });
          });
  
          return Promise.all(promesas);
        } else {
          // Si no hay antecedentes, resuelve la promesa con un array vacío
          return Promise.resolve([]);
        }
      })
      .then(response => {
        console.log('Datos guardados correctamente');
        message.loading('Verficando...',2);
        setTimeout(() => {
          message.success('Historial Registrado Correctamente');
          navigate('/HistorialRegistrado');// Redirige al usuario al panel de control
        }, 2500);
        
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('Hubo un error al registrar el historial médico');
      });
    } else {
      console.log('El formulario tiene errores. No se puede enviar.');
      message.warning('Atienda los errores');
    }
  };
  




  //////////////---------------------fecha-----------------

  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('es-MX', options);

  }


  ////////////////---------agregar medicamentos alergico Nuevos----------------
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [medicamentosEditar, setMedicamentosEditar] = useState('');

  const handleMostrarEdicionMedicamento = () => {
    setMostrarEdicion(true);
    // Verificar si historial2.alergico_Medicamento no es "No aplica"
    if (historial2.alergico_Medicamento !== 'No aplica') {
      // Separar los medicamentos por coma y eliminar espacios adicionales
      const medicamentos = historial2.alergico_Medicamento.split(',').map(m => m.trim());
      // Marcar y deshabilitar los medicamentos seleccionados en el estado otrosMedicamentosChecked
      setOtrosMedicamentosChecked(prevState => {
        const newState = { ...prevState };
        for (let medicamento of medicamentos) {
          if (medicamento in newState) {
            newState[medicamento] = true;
          }
        }
        return newState;
      });
      // Guardar los medicamentos en la variable medicamentosEditar
      setMedicamentosEditar(historial2.alergico_Medicamento);
    }
  };

  const handleMedicamentoChangeEdit = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setMedicamentosEditar((prev) => (prev ? `${prev}, ${id}` : id));
    } else {
      setMedicamentosEditar((prev) =>
        prev.replace(new RegExp(`,?\\s*${id}`), '').replace(/^,?\s*|\s*$/g, '')
      );
    }
  };

  const handleOcultarEdicionMedicamento = () => {
    setMostrarEdicion(false);
    setMedicamentosEditar('');
  };

  useEffect(() => {
    console.log('Medicamentos seleccionados:', medicamentosEditar);
  }, [medicamentosEditar]);

  useEffect(() => {
    // Cargar los medicamentos desde el almacenamiento local al inicializar el componente
    const storedMedicamentos = localStorage.getItem('otrosMedicamentosChecked');
    if (storedMedicamentos) {
      setOtrosMedicamentosChecked(JSON.parse(storedMedicamentos));
    }
  }, []);
  const medicamentosDisponiblesEditar = Object.keys(otrosMedicamentosChecked);


  ////////////////-----------------------------Actualizar los medicamentos seleccionados----------------------------------
  const editarAlergicoMedicamentos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/actualizarMedicamentoID/${ID_Historial}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alergico_Medicamento: medicamentosEditar }), // Envía el nuevo antecedente como JSON
      });
  
      if (!response.ok) {
        throw new Error('No se pudo agregar los cambios medicamentos alergico');
      }
      setMostrarEdicion(false);
      setMedicamentosEditar('');
  
      message.success('Cambios agregados exitosamente en Medicamentos Alergicos');
    } catch (error) {
      console.error('No se pudo agregar los cambios medicamentos alergico', error);
    }
  };
  


  ///////----------------------------Editar Datos Personales-------------------------------------
// Estado para los valores originales
const [originalValues, setOriginalValues] = useState({});
const [values, setValues] = useState({});

useEffect(() => {
    // Verificar si historial2 está disponible antes de inicializar los valores
    if (historial2 && Object.keys(originalValues).length === 0) {
      setOriginalValues({ ...historial2 });
      setValues({ ...historial2 });
    }
  }, [historial2, originalValues]); // Asegúrate de incluir originalValues como dependencia
  
// Estado para controlar si está en modo de edición o no
const [editMode, setEditMode] = useState(false);

// Función para activar el modo de edición
const enableEditMode = () => {
  // Guarda los valores originales antes de activar el modo de edición
  setOriginalValues({ ...values });
  setEditMode(true);
};

// Función para guardar los cambios
const saveChanges = async () => {
    // Fusionar los valores editados con los valores originales
    const mergedValues = { ...originalValues, ...values };
    // Aquí puedes guardar los cambios usando el estado mergedValues
    // Por ejemplo, puedes enviarlos a tu backend para actualizar los datos
    try {
      // Realizar la actualización en la base de datos
      const response = await fetch(`http://localhost:3000/actualizarInfoPerId/${ID_Historial}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mergedValues)
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
     
      // Una vez que la actualización sea exitosa, realizar una nueva consulta para obtener los datos actualizados
      const newDataResponse = await fetch(`http://localhost:3000/antecedentesID/${ID_Historial}`);
      if (!newDataResponse.ok) {
        throw new Error('Error al obtener los datos actualizados');
      }
  
      const newData = await newDataResponse.json(); // Suponiendo que la respuesta contiene los datos actualizados
      message.success('Datos actualizados correctamente');
      // Actualizar el estado con los nuevos datos
      setOriginalValues(newData);
      setValues(newData);
      
      // Desactivar el modo de edición después de guardar los cambios
      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Manejar el error de manera apropiada
    }
  };
  
  

// Función para cancelar la edición
const cancelEdit = () => {
  // Restaura los valores originales y desactiva el modo de edición
  setValues({ ...originalValues });
  setEditMode(false);
};

// Función para manejar el cambio de valores en los campos de entrada
const handleInputChangeEdit = (e, fieldName) => {
  const { value } = e.target;
  setValues((prevValues) => ({
    ...prevValues,
    [fieldName]: value,
  }));
};
  


  //console.log(historial2)

/////////--------------------------------EDITAR PERFIL CONTACTO------------------------

// Estado para los valores originales del perfil de emergencia
const [emergencyContactOriginalValues, setEmergencyContactOriginalValues] = useState({});
// Estado para los valores editados del perfil de emergencia
const [emergencyContactValues, setEmergencyContactValues] = useState({});
// Estado para controlar si está en modo de edición o no para el perfil de emergencia
const [emergencyContactEditMode, setEmergencyContactEditMode] = useState(false);

useEffect(() => {
    // Verificar si historial2 está disponible antes de inicializar los valores
    if (historial2 && Object.keys(emergencyContactOriginalValues).length === 0) {
        setEmergencyContactOriginalValues({ ...historial2 });
        setEmergencyContactValues({ ...historial2 });
    }
  }, [historial2, emergencyContactOriginalValues]); // Asegúrate de incluir originalValues como dependencia
  
  // Función para activar el modo de edición para el perfil de emergencia
  const enableEmergencyContactEditMode = () => {
    // Guarda los valores originales antes de activar el modo de edición
    setEmergencyContactOriginalValues({ ...emergencyContactValues });
    setEmergencyContactEditMode(true);
  };

  // Función para guardar los cambios para el perfil de emergencia
  const saveEmergencyContactChanges = async () => {
    // Fusionar los valores editados con los valores originales
    const mergedEmergencyContactValues = { ...emergencyContactOriginalValues, ...emergencyContactValues };

     try {
       // Realizar la actualización en la base de datos
       const response = await fetch(`http://localhost:3000/actualizarContactoEmergenciaID/${ID_Historial}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(mergedEmergencyContactValues)
       });
   
       if (!response.ok) {
         throw new Error('Error al guardar los cambios');
       }
   
       // Una vez que la actualización sea exitosa, realizar una nueva consulta para obtener los datos actualizados
       const newDataResponse = await fetch(`http://localhost:3000/antecedentesID/${ID_Historial}`);
       if (!newDataResponse.ok) {
         throw new Error('Error al obtener los datos actualizados');
       }
   
       const newData = await newDataResponse.json(); // Suponiendo que la respuesta contiene los datos actualizados
       
       // Actualizar el estado con los nuevos datos
       setEmergencyContactOriginalValues(newData);
       setEmergencyContactValues(newData);
       message.success('Datos actualizados correctamente');
       // Desactivar el modo de edición después de guardar los cambios
       setEmergencyContactEditMode(false);
     } catch (error) {
       console.error("Error al guardar los cambios:", error);
       // Manejar el error de manera apropiada
     }
  };

  // Función para cancelar la edición para el perfil de emergencia
  const cancelEmergencyContactEdit = () => {
    // Restaura los valores originales y desactiva el modo de edición
    setEmergencyContactValues({ ...emergencyContactOriginalValues });
    setEmergencyContactEditMode(false);
  };

  // Función para manejar el cambio de valores en los campos de entrada para el perfil de emergencia
  const handleInputChangeEmergencyContact = (e, fieldName) => {
    const { value } = e.target;
    setEmergencyContactValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };




  return (
   <div className="">
    <div className="">
        {historial2 ? (
   <div className="d">
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
      <h1 className="text-2xl font-semibold text-center text-gray-900">HISTORIAL DEL USUARIO: {historial2.nombre} {historial2.apellido_Paterno} {historial2.apellido_Materno}</h1><br />
        <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion Personal</h2>


        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={editMode ? values.nombre : originalValues.nombre}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "nombre") }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="apellidoPaterno" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Paterno
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={editMode ? values.apellido_Paterno : originalValues.apellido_Paterno}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "apellido_Paterno") }
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoMaterno" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Materno
            </label>
            <div className="mt-2">
              <input
            
                type="text"
                className="bg-gray-100 antP rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={editMode ? values.apellido_Materno : originalValues.apellido_Materno}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "apellido_Materno") }
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="edad" className="block text-sm font-medium leading-6 text-gray-900">
              Edad
            </label>
            <div className="mt-2">
              <input
             type="text"
             className="bg-gray-100 NoEdit2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
             value={editMode ? values.edad : originalValues.edad}
             readOnly={!editMode}
             onChange={(e) => handleInputChangeEdit(e, "edad") }
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="municipio" className="block text-sm font-medium leading-6 text-gray-900">
            Municipio
            </label>
            <div className="mt-2">
              <input
            type="text"
            className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            value={editMode ? values.Municipio : originalValues.Municipio}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "Municipio") }
              />
            </div>
          </div>
      

          <div className="col-span-2">
            <label htmlFor="colonia" className="block text-sm font-medium leading-6 text-gray-900">
              colonia
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={editMode ? values.colonia : originalValues.colonia}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "colonia") }
              />
            </div>
          </div>


          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="calle" className="block text-sm font-medium leading-6 text-gray-900">
              Calle
            </label>
            <div className="mt-2">
              <input
                
                type="text"
                className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={editMode ? values.calle : originalValues.calle}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "calle") }
              />
            </div>
          </div>


          <div className="col-span-2">
            <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
              telefono
            </label>
            <div className="mt-2">
              <input
               type="text"
               className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
               value={editMode ? values.telefono : originalValues.telefono}
                readOnly={!editMode}
                onChange={(e) => handleInputChangeEdit(e, "telefono") }
              />
            </div>  
          </div>

      
        </div>


        <div className="mt-6 flex items-center justify-end gap-x-6">
        {!editMode && (
        <button 
        className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={enableEditMode}>Editar Información</button>
      )}

      {/* Botón para guardar los cambios */}
      {editMode && (
        <div className="">
        <button 
        className="rounded-md editPer bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={saveChanges}>Guardar Cambios</button>
      

        <button 
        className="rounded-md editPer bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={cancelEdit}>Cancelar</button>
        </div>
      )}
    </div>


      </div>




      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion de Contacto</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="nombreContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
            
              className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              readOnly={!emergencyContactEditMode}
              type="text"
              value={emergencyContactEditMode ? emergencyContactValues.nombre_Contacto : emergencyContactOriginalValues.nombre_Contacto}
              onChange={(e) => handleInputChangeEmergencyContact(e, 'nombre_Contacto')}
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoPaternoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Paterno
            </label>
            <div className="mt-2">
              <input
             readOnly={!emergencyContactEditMode}
             type="text"
             value={emergencyContactEditMode ? emergencyContactValues.apellidoP_Contacto : emergencyContactOriginalValues.apellidoP_Contacto}
             onChange={(e) => handleInputChangeEmergencyContact(e, 'apellidoP_Contacto')}
              className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoMaternoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Materno
            </label>
            <div className="mt-2">
              <input
             readOnly={!emergencyContactEditMode}
             type="text"
             value={emergencyContactEditMode ? emergencyContactValues.apellidoM_Contacto : emergencyContactOriginalValues.apellidoM_Contacto}
             onChange={(e) => handleInputChangeEmergencyContact(e, 'apellidoM_Contacto')}
              className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

         
          <div className="col-span-2">
            <label htmlFor="telefonoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Telefono
            </label>
            <div className="mt-2">
              <input
               readOnly={!emergencyContactEditMode}
               type="text"
               value={emergencyContactEditMode ? emergencyContactValues.telefono_Contacto : emergencyContactOriginalValues.telefono_Contacto}
               onChange={(e) => handleInputChangeEmergencyContact(e, 'telefono_Contacto')}
                className="bg-gray-100 NoEdit rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

      
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        {emergencyContactEditMode ? (
        <>
          <button  className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={saveEmergencyContactChanges}>Guardar</button>
          <button  className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={cancelEmergencyContactEdit}>Cancelar</button>
        </>
      ) : (
        <button   className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={enableEmergencyContactEditMode}>Editar Informacion Contacto</button>
      )}
    </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">INFORMACION MEDICA</h2>
          <br />
          <legend className="text-sm font-semibold leading-6 text-gray-900">Antecedentes Patologicos</legend>
          
          {/* Listado de antecedentes patológicos */}
          <div className="mt-6">
          {antecedente2.map((antecedente2, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900 ">
                    Nombre
            </label>
            <input
              type="text"
              value={antecedente2.nombre}
              readOnly
              className="bg-gray-100 antP rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Fecha
                  </label>
            <input
              type="text"
              value={formatDate(antecedente2.fecha_Diacnostico)}
              readOnly
              className="bg-gray-100 antP rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Tratamiento y datos relevantes
                  </label>
            <textarea
              type="text"
              value={antecedente2.tratamiento}
              readOnly
              className="bg-gray-100 antP rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            
          </div>
        ))}
      </div>


          {/* Formulario para agregar nuevos antecedentes */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {mostrarFormulario && (
              <>
                <div className="sm:col-span-2">
                  <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="nombreAntecedente" 
                      value={nuevoAntecedente.nombreAntecedente} 
                      onChange={handleChangeNuevoAntecedente} 
                      
                      className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                 
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="FechaD" className="block text-sm font-medium leading-6 text-gray-900">
                    Fecha de Diagnostico
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="date"
                      name="fecha_Diacnostico"
                      value={nuevoAntecedente.fecha_Diacnostico} 
                     onChange={handleChangeNuevoAntecedente}  
                      className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="tratamiento" className="block text-sm font-medium leading-6 text-gray-900">
                  Tratamiento y datos relevantes
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      name="tratamiento" 
                       value={nuevoAntecedente.tratamiento} 
                       onChange={handleChangeNuevoAntecedente} 
                      className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6 flex justify-end items-center gap-4">
                  <button
                    type="button"
                    onClick={handleSubmitNuevoAntecedente}
                    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Agregar
                  </button>
                
                  <button
                    type="button"
                    onClick={handleCancelarAgregarAntecedente}
                    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancelar
                  </button>
                  </div>
              </>
            )}
            {!mostrarFormulario && (
              <div className="sm:col-span-6 flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={handleAgregarAntecedente2}
                  className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar Antecedente
                </button>
              </div>
            )}
          </div>
  

        
  
     
<br /><br />
     
        <h2 className="text-base font-semibold leading-7 text-gray-900">MEDICAMENTOS ALERGICO</h2>
        {errores.medicamentosAlergicos && <span  className='erroresIn'>{errores.medicamentosAlergicos}</span>}
        <div className="mt-10 space-y-10">


{/*--------------------------MEDICAMENTOS TRAIDOS DE LA BASE DE DATOS---------------- */}
      <div className="">
        <legend className='text-[12px]'>Medicametos los cuales {historial2.nombre} {historial2.apellido_Paterno} {historial2.apellido_Materno}  es alergico</legend>
  <fieldset>
    <div className="mt-6 space-y-6 grid grid-cols-4 gap-x-6 gap-y-4">
      {/* Checkbox para "No aplica" */}
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="no-aplica"
            name="no-aplica"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={historial2.alergico_Medicamento === 'No aplica'}
            onChange={() => {}}
            disabled
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="no-aplica" className="font-medium text-gray-900">
            No aplica
          </label>
        </div>
      </div>
      {/* Resto de los medicamentos */}
      {Object.entries(otrosMedicamentosChecked).map(([medicamento, checked]) => {
        const isSelected = historial2.alergico_Medicamento !== 'No aplica' && historial2.alergico_Medicamento.includes(medicamento);
        const isDisabled = historial2.alergico_Medicamento === 'No aplica' || isSelected;
        return (
          <div key={medicamento} className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={medicamento}
                name={medicamento}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={isSelected}
                onChange={() => {}}
                disabled
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor={medicamento} className="font-medium text-gray-900">
                {medicamento[0].toUpperCase() + medicamento.slice(1)}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  </fieldset>
</div>



{/*------------------------------EDITAR MEDICAMENTOA----------------------------------------------------------

<p>medicamentos seleccionados {medicamentosEditar}</p>
<p>medicamtos alergico{historial2.alergico_Medicamento}</p>*/}


<div>
      <div>
        {mostrarEdicion && (
          <div className="">
                <legend className='text-[13px] text-green-500 '>
                Seleccione los Nuevos Medicametos los cuales {historial2.nombre} {historial2.apellido_Paterno} {historial2.apellido_Materno}  es alergico
                </legend>
            <fieldset>
              <div className="mt-6 space-y-6 grid grid-cols-4 gap-x-6 gap-y-4">
                {/* Resto de los medicamentos */}
                {medicamentosDisponiblesEditar.map((medicamento) => {
                  const isSelected = medicamentosEditar.includes(medicamento);
                  return (
                    <div key={medicamento} className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id={medicamento}
                          name={medicamento}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={isSelected}
                          onChange={handleMedicamentoChangeEdit}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor={medicamento} className="font-medium text-gray-900">
                          {medicamento[0].toUpperCase() + medicamento.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </fieldset> <br />
            <div className="sm:col-span-2">
  <label htmlFor="otro" className="block text-sm font-medium leading-6 text-gray-900">
    Otro
  </label>
  <legend className='text-[12px]'>Especificar el medicamento y agregelo con el boton</legend>
  <div className="mt-2">
    <input
      type="text"
      value={nuevoMedicamento}
      onChange={handleNuevoMedicamentoChange}
      className="block w-52 bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
  <br />
  <button
    type="button"
    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={handleAgregarNuevoMedicamento}
  >
    Agregar Nuevo Medicamento
  </button>
</div>
            <br />
            
            <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="submit"
                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={editarAlergicoMedicamentos}
              >
                Guardar Cambios
              </button>
              <button
                type="submit"
                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleOcultarEdicionMedicamento}
              >
                Cancelar
              </button>
            
            </div>
            
          </div>
        )}
      </div>
    </div>


    {mostrarEdicion === false ? (
  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button
      type="submit"
      className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleMostrarEdicionMedicamento}
    >
      Editar Medicamentos
    </button>
  </div>
) : null}



{/* 
    <div className="sm:col-span-2">
  <label htmlFor="otro" className="block text-sm font-medium leading-6 text-gray-900">
    Otro
  </label>
  <legend className='text-[12px]'>Especificar el medicamento y agregelo con el boton</legend>
  <div className="mt-2">
    <input
      type="text"
      value={nuevoMedicamento}
      onChange={handleNuevoMedicamentoChange}
      className="block w-52 bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
  <br />
  <button
    type="button"
    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={handleAgregarNuevoMedicamento}
  >
    Agregar
  </button>
</div>
   */}     

     
    
    </div>



      </div>
    </div>




 
    </div>
       ) : (
        <p>Cargando...</p>
)}

  </div>
  </div>

  )
}
