import React, { useState, useEffect, useRef } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import './RegistroCSS.css'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function RegistroHistorial() {

  const navigate = useNavigate();

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



console.log('Valores del formulario:', formValues);

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
console.log('Medicamentos alérgicos actualizados:', formValues.medicamentosAlergicos);


///////////---------------------------Antecedentes--------------------------------
const [antecedentes, setAntecedentes] = useState([]);
const [nombreAn, setNombreAn] = useState('');
const [fechaD, setFechaD] = useState('');
const [tratamiento, setTratamiento] = useState('');
const [mostrarFormulario, setMostrarFormulario] = useState(false);

const handleAgregarAntecedente = () => {
  setMostrarFormulario(true);
};

const handleAgregar = () => {
  const fechaHoy = new Date();
  const fechaSeleccionada = new Date(fechaD);
  if (nombreAn== '' || fechaD == ''|| tratamiento == '') {
   message.error('Acomplete los campos');
    return;
  }else if (fechaSeleccionada > fechaHoy) {
    message.error('La fecha de diagnóstico no puede ser mayor a la fecha de hoy.');
    return;
  }

  const nuevoAntecedente = { nombreAn, fechaD, tratamiento };
  setAntecedentes([...antecedentes, nuevoAntecedente]);
  setNombreAn('');
  setFechaD('');
  setTratamiento('');
  setMostrarFormulario(false);
};


const handleEliminarAntecedente = (index) => {
  const nuevosAntecedentes = antecedentes.filter((_, i) => i !== index);
  setAntecedentes(nuevosAntecedentes);
};

console.log('Antecedentes:', antecedentes );
 

console.log('VALORES', formValues);


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


  return (
    <form onSubmit={handleSubmit} >
    <div className="space-y-12">
   
  
      <div className="border-b border-gray-900/10 pb-12">
      <h1 className="text-2xl font-semibold text-center text-gray-900">REGISTRO DE HISTORIAL</h1><br />
        <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion Personal</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Rellene los datos Con responsabilidad</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="nombre"
                id="nombre"
                autoComplete="nombre"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.nombre} // Valor del input
               onChange={handleInputChange} // Función para manejar cambios en el input
               onBlur={handleInputBlur}
              />
            </div>
            {errores.nombre && <span className='erroresIn'>{errores.nombre}</span>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="apellidoPaterno" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Paterno
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="apellidoPaterno"
                id="apellidoPaterno"
                autoComplete="apellidoPaterno"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.apellidoPaterno} // Valor del input
                onChange={handleInputChange} 
                onBlur={handleInputBlur}// Función para manejar cambios en el input
              />
            </div>
            {errores.apellidoPaterno && <span className='erroresIn'>{errores.apellidoPaterno}</span>}
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoMaterno" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Materno
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="apellidoMaterno"
                id="apellidoMaterno"
                autoComplete="apellidoMaterno"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.apellidoMaterno} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.apellidoMaterno && <span className='erroresIn'>{errores.apellidoMaterno}</span>}
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="edad" className="block text-sm font-medium leading-6 text-gray-900">
              Edad
            </label>
            <div className="mt-2">
              <input
              required
                id="edad"
                name="edad"
                type="text"
                autoComplete="edad"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.edad} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.edad && <span className='erroresIn'>{errores.edad}</span>}
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="municipio" className="block text-sm font-medium leading-6 text-gray-900">
            Municipio
            </label>
            <div className="mt-2">
              <input
              required
                id="municipio"
                name="municipio"
                type="municipio"
                autoComplete="municipio"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.municipio} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.municipio && <span className='erroresIn'>{errores.municipio}</span>}
          </div>
      

          <div className="col-span-2">
            <label htmlFor="colonia" className="block text-sm font-medium leading-6 text-gray-900">
              colonia
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="colonia"
                id="colonia"
                autoComplete="colonia"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.colonia} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.colonia && <span className='erroresIn'>{errores.colonia}</span>}
          </div>


          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="calle" className="block text-sm font-medium leading-6 text-gray-900">
              Calle
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="calle"
                id="calle"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-100"
                value={formValues.calle} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.calle && <span className='erroresIn'>{errores.calle}</span>}
          </div>


          <div className="col-span-2">
            <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
              telefono
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="telefono"
                id="telefono"
                autoComplete="telefono"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.telefono} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.telefono && <span className='erroresIn'>{errores.telefono}</span>}
          </div>

      
        </div>
      </div>


      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion de Contecto</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Rellene los datos Con responsabilidad</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="nombreContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="nombreContacto"
                id="nombreContacto"
                autoComplete="nombreContacto"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.nombreContacto} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.nombreContacto && <span className='erroresIn'>{errores.nombreContacto}</span>}
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoPaternoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Paterno
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="apellidoPaternoContacto"
                id="apellidoPaternoContacto"
                autoComplete="apellidoPaternoContacto"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.apellidoPaternoContacto} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.apellidoPaternoContacto && <span className='erroresIn'>{errores.apellidoPaternoContacto}</span>}
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="apellidoMaternoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido Materno
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="apellidoMaternoContacto"
                id="apellidoMaternoContacto"
                autoComplete="apellidoMaternoContacto"
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.apellidoMaternoContacto} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.apellidoMaternoContacto && <span className='erroresIn'>{errores.apellidoMaternoContacto}</span>}
          </div>

         
          <div className="col-span-2">
            <label htmlFor="telefonoContacto" className="block text-sm font-medium leading-6 text-gray-900">
              Telefono
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="telefonoContacto"
                id="telefonoContacto"
                autoComplete="telefonoContacto"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formValues.telefonoContacto} // Valor del input
                onChange={handleInputChange} // Función para manejar cambios en el input
                onBlur={handleInputBlur}
              />
            </div>
            {errores.telefonoContacto && <span className='erroresIn'>{errores.telefonoContacto}</span>}
          </div>

      
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">INFORMACION MEDICA</h2>
          <br />
          <legend className="text-sm font-semibold leading-6 text-gray-900">Antecedentes Patologicos</legend>
          
          {/* Listado de antecedentes patológicos */}
          <div className="mt-6">
        {antecedentes.map((antecedente, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre
            </label>
            <input
              type="text"
              value={antecedente.nombreAn}
              readOnly
              className="bg-gray-100 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Fecha
                  </label>
            <input
              type="text"
              value={antecedente.fechaD}
              readOnly
              className="bg-gray-100 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="nameAn" className="block text-sm font-medium leading-6 text-gray-900">
                    Tratamiento y datos relevantes
                  </label>
            <input
              type="text"
              value={antecedente.tratamiento}
              readOnly
              className="bg-gray-100 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => handleEliminarAntecedente(index)}
              className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Eliminar
            </button>
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
                      type="text"
                      value={nombreAn}
                      onChange={(e) => setNombreAn(e.target.value)}
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
                      type="date"
                      value={fechaD}
                      onChange={(e) => setFechaD(e.target.value)}
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
                      value={tratamiento}
                      onChange={(e) => setTratamiento(e.target.value)}
                      className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6 flex justify-end items-center gap-4">
                  <button
                    type="button"
                    onClick={handleAgregar}
                    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Agregar
                  </button>
                </div>
              </>
            )}
            {!mostrarFormulario && (
              <div className="sm:col-span-6 flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={handleAgregarAntecedente}
                  className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar Antecedente
                </button>
              </div>
            )}
          </div>
  

        
  
     
<br /><br />
     
        <h2 className="text-base font-semibold leading-7 text-gray-900">MEDICAMENTOS ALERGICO</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Seleccione los medicamentos a los cuales es alergico el Paciente
        </p>
        {errores.medicamentosAlergicos && <span  className='erroresIn'>{errores.medicamentosAlergicos}</span>}
        <div className="mt-10 space-y-10">
      

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
          checked={noAplicaChecked}
          onChange={handleMedicamentoChange}
          onBlur={handleInputBlur}
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor="no-aplica" className="font-medium text-gray-900">
          No aplica
        </label>
      </div>
    </div>
    {/* Resto de los medicamentos */}
    {Object.entries(otrosMedicamentosChecked).map(([medicamento, checked]) => (
      <div key={medicamento} className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id={medicamento}
            name={medicamento}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={formValues.medicamentosAlergicos.includes(medicamento)}
            onChange={handleMedicamentoChange}
            disabled={noAplicaChecked}
            onBlur={handleInputBlur}
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={medicamento} className="font-medium text-gray-900">
            {medicamento[0].toUpperCase() + medicamento.slice(1)}
          </label>
        </div>
      </div>
    ))}
  </div>
</fieldset>


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
        


        </div>
      </div>
    </div>
   

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Guardar
      </button>
    </div>
  </form>
  )
}
