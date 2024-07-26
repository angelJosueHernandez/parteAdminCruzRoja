import React,{useState} from 'react'
import './FormHistorialMedico.css'
import { Formik,Form,Field,ErrorMessage } from 'formik'

const FormHistorialMedico = () => {


  
  /*const [paginaActual, setPaginaActual] = useState(1);
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    edad:'',
    municipio: '',
    colonia: '',
    calle: '',
    telefono:'',
    nombre2: '',
    apellidoPaterno2: '',
    apellidoMaterno2: '',
    telefono2: ''
  });
  const [datosHistorial, setDatosHistorial] = useState({
    nombreAntecedente: '',
    fechaDiacnosticada: '',
    tratamiento:'',
    alergias:'',
    motivo:'',
    diacnosticoIngreso:'',
    diacnosticoEgreso:'',
    medicamentos:''
  });*/
  //---------------------------------------Paginacion------------------------------------------
  /*const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handleChangeDatosPersonales = (event) => {
    const { name, value } = event.target;
    setDatosPersonales(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeDatosHistorial = (event) => {
    const { name, value } = event.target;
    setDatosHistorial(prevState => ({
      ...prevState,
      [name]: value
    }));
  };*/


  //const handleSubmit = (event) => {
    //event.preventDefault();
    // Aquí puedes manejar el envío del formulario completo
    //const data= new FormData();
    

    /*fetch("http://localhost:3000/nuevoHistorialMedico",
          {
            method: "POST",
            credentials: 'include',
            headers: {
                      'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud es JSON
                     },
                        body: JSON.stringify(datosPersonales,datosHistorial) // Convierte el objeto 'valores' a JSON
                    })
    
    console.log('Datos del formulario:', { datosPersonales, datosHistorial });
  };*/
  const [formularioEnviado,cambiarFormularioEnviado]= useState(false);
  const [antecedentes, setAntecedentes] = useState([]);
  const [medicamentosAlergicos, setMedicamentosAlergicos] = useState('');

  
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            nombre:'',
            apellido_Paterno:'',
            apellido_Materno:'',
            edad:'',
            Municipio:'',
            colonia:'',
            calle:'',
            telefono:'',
            nombre_Contacto:'',
            apellidoP_Contacto:'',
            apellidoM_Contacto:'',
            telefono_Contacto:'',
            alergico_Medicamento:'',
            ID_Asociado:''
          }}
          validate={(valores)=>{
              let errores={};


              //validacion del nombre
              if(!valores.nombre){
                  errores.nombre='Por favor ingresa un nombre'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                  errores.nombre='El nombre solo puede contener letras'
              }

              //validacion de los apellidos
              if(!valores.apellido_Paterno){
                  errores.apellido_Paterno='Por favor ingresa un apellido'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido_Paterno)){
                  errores.apellido_Paterno='El apellido solo puede contener letras'
              }

              if(!valores.apellido_Materno){
                  errores.apellido_Materno='Por favor ingresa un apellido'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido_Materno)){
                  errores.apellido_Materno='El apellido solo puede contener letras'
              }

              // validacion de edad
              if(!valores.edad){
                  errores.edad='Por favor ingresa una edad'
              } else if(!/^[0-9]{1,40}$/.test(valores.edad)){
                  errores.edad='La edad solo puede contener numeros'
              }

              //validacion del municipio
              if(!valores.Municipio){
                  errores.Municipio='Por favor ingresa un Municipio'
              } else if(!/^[a-zA-ZÀ-ÿ\s]+$/.test(valores.Municipio)){
                  errores.Municipio='El municipio solo puede contener letras'
              }

              //validacion para la colonia
              if(!valores.colonia){
                  errores.colonia='Por favor ingresa una colonia'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.colonia)){
                  errores.colonia='La colonia solo puede contener letras'
              }

              //validacion para la calle
              if(!valores.calle){
                  errores.calle='Por favor ingresa una calle'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.calle)){
                  errores.calle='La calle solo puede contener letras'
              }

              // validacion de edad
              if(!valores.telefono){
                errores.telefono='Por favor ingresa un telefono'
              } else if(!/^[0-9]{1,40}$/.test(valores.telefono)){
                errores.telefono='El telefono solo puede contener numeros'
              }

              //validacion del nombre del contacto
              if(!valores.nombre_Contacto){
                  errores.nombre_Contacto='Por favor ingresa un nombre'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre_Contacto)){
                  errores.nombre_Contacto='El nombre solo puede contener letras'
              }

              //validacion del apellido del contacto
              if(!valores.apellidoP_Contacto){
                  errores.apellidoP_Contacto='Por favor ingresa un apellido'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoP_Contacto)){
                  errores.apellidoP_Contacto='El apellido solo puede contener letras'
              }

              if(!valores.apellidoM_Contacto){
                  errores.apellidoM_Contacto='Por favor ingresa un apellido'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoM_Contacto)){
                  errores.apellidoM_Contacto='El apellido solo puede contener letras'
              }

              // validacion de edad
              if(!valores.telefono_Contacto){
                errores.telefono_Contacto='Por favor ingresa un telefono'
              } else if(!/^[0-9]{1,40}$/.test(valores.telefono_Contacto)){
                errores.telefono_Contacto='El telefono solo puede contener numeros'
              }
              // validacion de alergico a medicamento
              if(!valores.alergico_Medicamento){
                errores.alergico_Medicamento='Por favor ingresa una respuesta';
            } else if(!/^[a-zA-ZÀ-ÿ,\s]{1,40}$/.test(valores.alergico_Medicamento)){
                errores.alergico_Medicamento='La respuesta solo puede contener letras ';
            }
            

              // validacion de la id del asociado
              if(!valores.ID_Asociado){
                errores.ID_Asociado='Por favor ingresa un asociado'
              } else if(!/^[0-9]{1,40}$/.test(valores.ID_Asociado)){
                errores.ID_Asociado='El Id solo puede contener numeros'
              }

            

              
              return errores;
          }}
          
          onSubmit={(valores, { resetForm }) => {
            console.log(valores)
            // Realiza la primera solicitud para guardar en nuevoHistorialMedico
            fetch("http://localhost:3000/nuevoHistorialMedico", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud es JSON
                },
                body: JSON.stringify(valores), // Envía los datos del formulario
                credentials: 'include' // Incluye las credenciales si es necesario
            })
            .then(response => {
                // Verifica si la respuesta es exitosa
                if (response.ok) {
                   console.log('exito')
                   resetForm();
                   cambiarFormularioEnviado(true);
                   //desaparece la leyenda de formulario enviado despues de 5 segundos
                   setTimeout(() => cambiarFormularioEnviado(false), 5000);
                } else {
                    // Si la primera solicitud no fue exitosa, lanza un error
                    throw new Error('Error al guardar datos en nuevoHistorialMedico');
                }
            })
            
        }}
        

        >{({errors})=>(
          <Form className='form_Historial_Madico'>
           {/* {paginaActual === 1 && (*/}
              <div className='form_Grid_HM'>
                {/*<div className='title_Form_HM'><h1>Registro de Historial Medico</h1></div>*/}
                  <div className='sub-titulo'><h1>Datos Personales</h1></div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Nombre:</label></div>
                    <div><Field
                          type="text" 
                          name="nombre" 
                          id="" 
                          className='input-text' 
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='nombre' component={()=>(
                        <div><span>{errors.nombre}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Apellido Paterno:</label></div>
                    <div><Field 
                          type="text" 
                          name="apellido_Paterno" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='apellido_Paterno' component={()=>(
                        <div><span>{errors.apellido_Paterno}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
                    <div><Field 
                          type="text" 
                          name="apellido_Materno" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='apellido_Materno' component={()=>(
                        <div><span>{errors.apellido_Materno}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Edad:</label></div>
                    <div><Field 
                          type="text" 
                          name="edad" 
                          id="edad" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='edad' component={()=>(
                        <div><span>{errors.edad}</span></div>
                      )}/>
                    </div>
                  </div>
                  
                  {/*<div className='sub-titulo'><h1>Domicilio</h1></div>*/}
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Municipio:</label></div>
                    <div><Field 
                          type="text" 
                          name="Municipio" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='Municipio' component={()=>(
                        <div><span>{errors.Municipio}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Colonia:</label></div>
                    <div><Field 
                          type="text" 
                          name="colonia" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='colonia' component={()=>(
                        <div><span>{errors.colonia}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Calle:</label></div>
                    <div><Field 
                          type="text" 
                          name="calle" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='calle' component={()=>(
                        <div><span>{errors.calle}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Telefono:</label></div>
                    <div><Field 
                          type="text" 
                          name="telefono" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='telefono' component={()=>(
                        <div><span>{errors.telefono}</span></div>
                      )}/>
                    </div>
                  </div>
                  
                  <div className='sub-titulo'><h1>Contacto de Emergencia</h1></div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Nombre:</label></div>
                    <div><Field 
                          type="text" 
                          name="nombre_Contacto" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='nombre_Contacto' component={()=>(
                        <div><span>{errors.nombre_Contacto}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Apellido Paterno:</label></div>
                    <div><Field 
                          type="text" 
                          name="apellidoP_Contacto" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='apellidoP_Contacto' component={()=>(
                        <div><span>{errors.apellidoP_Contacto}</span></div>
                      )}/>
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
                    <div><Field 
                          type="text" 
                          name="apellidoM_Contacto" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='apellidoM_Contacto' component={()=>(
                        <div><span>{errors.apellidoM_Contacto}</span></div>
                      )}/>
                    </div>
                  </div>
                
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Telefono:</label></div>
                    <div><Field 
                          type="text" 
                          name="telefono_Contacto" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='telefono_Contacto' component={()=>(
                        <div><span>{errors.telefono_Contacto}</span></div>
                      )}/>
                    </div>
                  </div>


                
            
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Espesificar a cuantos medicamentos es alergico:</label></div>
                    <div><Field 
                          type="text" 
                          name="alergico_Medicamento" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='alergico_Medicamento' component={()=>(
                        <div><span>{errors.alergico_Medicamento}</span></div>
                      )}/>
                    </div>
                  </div>

                  <div className='sub-titulo'><h1>Datos de quien Registra</h1></div>



                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Id del Asociado:</label></div>
                    <div><Field 
                          type="text" 
                          name="ID_Asociado" 
                          id="" 
                          className='input-text'
                        />
                    </div>
                    <div className='msg_error'>
                      <ErrorMessage name='ID_Asociado' component={()=>(
                        <div><span>{errors.ID_Asociado}</span></div>
                      )}/>
                    </div>
                  </div>
                  
                  <div className='conte-registrarHM'>
                          <input className='btnRegistrar' type="submit" value="Registrar" />
                  </div>
                  {formularioEnviado &&<p>Formulario Enviado con Exito</p>}
              </div>           
              {/*)}*/}{/*
              {paginaActual === 2 &&(
              <div className='form_Grid_HM'>
                  <div className='sub-titulo'><h1>Antecedentes Patologicos</h1></div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Nombre del antecedente:</label></div>
                    <div><input 
                          type="text" 
                          name="nombreAntecedente" 
                          id="" 
                          className='input-text'
                          value={datosHistorial.nombreAntecedente} 
                          onChange={handleChangeDatosHistorial}
                        />
                    </div>
                    <div className='msg_error'>
                        
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Fecha en la que fue diacnosticada:</label></div>
                    <div><input 
                          type="text" 
                          name="fechaDiacnosticada" 
                          id="" 
                          className='input-text'
                          value={datosHistorial.fechaDiacnosticada} 
                          onChange={handleChangeDatosHistorial}
                        />
                    </div>
                    <div className='msg_error'>
                        
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Cuenta con algun Tratamiento:</label></div>
                    <div><input 
                          type="text" 
                          name="tratamiento" 
                          id="" 
                          className='input-text'
                          value={datosHistorial.tratamiento} 
                          onChange={handleChangeDatosHistorial}
                        />
                    </div>
                    <div className='msg_error'>
                        
                    </div>
                  </div>
                  <div className='grup-input'>
                    <div><label htmlFor="" className='label-name'>Alérgico a Medicamento:</label></div>
                    <div><input 
                          type="text" 
                          name="alergias" 
                          id="" 
                          className='input-text'
                          value={datosHistorial.alergias} 
                          onChange={handleChangeDatosHistorial}
                        />
                    </div>
                    <div className='msg_error'>
                        
                    </div>
                  </div>
                  
                  <div className='conte-registrarHM'>
                          <input className='btnRegistrar' type="submit" value="Registrar" />
                  </div>
              </div>
              )}  */}         
          </Form>
        )}

        </Formik>
        
        {/*<div className='cont_Paginacion'>
            {paginaActual > 1 && <button className='btn_Paginacion' type="button" onClick={() => cambiarPagina(paginaActual - 1)}
            >Anterior</button>}
            {paginaActual < 2 && <button className='btn_Paginacion' type="button" onClick={() => cambiarPagina(paginaActual + 1)}
            >Siguiente</button>}
        </div>*/}
      </div>
    </div>
  )
}

export default FormHistorialMedico
