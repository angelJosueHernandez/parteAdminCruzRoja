import React,{useState,useEffect} from 'react'
import './FormRegistroPersonal.css'
import { Formik,Form,Field,ErrorMessage } from 'formik'

const FormRegistroPersonal = () => {

    const [cargo,setCargo]=useState([]);

    const URLUser='http://localhost:3000/tipoCargo';

    const peticionGet= async()=>{
        const response= await fetch(URLUser)
        const data= await response.json();
        setCargo(data) 
    }
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            peticionGet(); // Suponiendo que peticionGet es una función que realiza la petición GET
        }, 1000); // 60000 milisegundos = 1 minuto

        // Devolver una función de limpieza para detener el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []); 

    
    const [formularioEnviado,cambiarFormularioEnviado]= useState(false);

  return (
    <div>
      <div>
        <Formik
            initialValues={{
                ID_Asociado:'',
                nombre:'',
                apellidoP:'',
                apellidoM:'',
                correo:'',
                contrasena:'',
                contrasena2:'',
                estado:'',
                delegacion:'',
                Id_Cargo:''
            }}
            validate={(valores)=>{
                let errores={};

                // validacion del id
                if(!valores.ID_Asociado){
                    errores.ID_Asociado='Por favor ingrese su ID de Asociado'
                } else if(!/^[0-9]{1,40}$/.test(valores.ID_Asociado)){
                    errores.ID_Asociado='El ID solo puede contener numeros'
                }

                //validacion del nombre
                if(!valores.nombre){
                    errores.nombre='Por favor ingresa un nombre'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                    errores.nombre='El nombre solo puede contener letras'
                }

                //validacion de los apellidos
                if(!valores.apellidoP){
                    errores.apellidoP='Por favor ingresa un apellido'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoP)){
                    errores.apellidoP='El apellido solo puede contener letras'
                }

                if(!valores.apellidoM){
                    errores.apellidoM='Por favor ingresa un apellido'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidoM)){
                    errores.apellidoM='El apellido solo puede contener letras'
                }

                //validacion del correo
                if(!valores.correo){
                    errores.correo='Por favor ingresa un correo'
                } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                    errores.correo='Debe de contener letras, @ y .com '
                }

                //validacion para el estado
                if(!valores.estado){
                    errores.estado='Por favor ingresa un estado'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.estado)){
                    errores.estado='El estado solo puede contener letras'
                }

                //validacion de delegacion
                if(!valores.delegacion){
                    errores.delegacion='Por favor ingresa una delegacion o municipio'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.delegacion)){
                    errores.delegacion='La delegacion o municipio solo puede contener letras'
                }

                //validacion para la contraseña
                if(!valores.contrasena){
                    errores.contrasena='Por favor ingresa una contraseña'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.contrasena)){
                    errores.contrasena='La contraseña solo puede contener letras'
                }

                if(!valores.contrasena2){
                    errores.contrasena2='Por favor ingresa una contraseña'
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.contrasena2)){
                    errores.contrasena2='La contraseña solo puede contener letras'
                } else if(!valores.contrasena2==valores.contrasena){
                    errores.contrasena2='las contraseñas no son igaules'
                }
                
        
                
                return errores;
            }}
            
            onSubmit={(valores,{resetForm})=>{
                
                fetch("http://localhost:3000/registroPersonal",
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud es JSON
                        },
                        body: JSON.stringify(valores),
                        credentials: 'include', // Convierte el objeto 'valores' a JSON
                    })
                resetForm();

                console.log(valores);
                cambiarFormularioEnviado(true);
                //desaparece la leyenda de formulario enviado despues de 5 segundos
                setTimeout(()=>cambiarFormularioEnviado(false),5000);
            }}
        >{({values,errors,touched,handleSubmit,handleChange,handleBlur})=>(
            <Form className='form-personal' >
                <div className='form-grid'>
                    <div className='title_form'>
                        <h1>Registro de Personal</h1>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Id Asociado:</label></div>
                        <div><Field 
                                type="text" 
                                name="ID_Asociado" 
                                id="ID_Asociado" 
                                className='input-text' 
                                placeholder='Id Asociado' 
                                /*value={values.idAsociado}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                            />                                                              
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='idAsociado' component={()=>(
                                <div><span>{errors.ID_Asociado}</span></div>
                            )}/>
                            {/*{touched.idAsociado && errors.idAsociado && <div><span>{errors.idAsociado}</span></div>}*/}
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Nombre:</label></div>
                        <div><Field 
                                type="text" 
                                name="nombre" 
                                id="nombre" 
                                className='input-text' 
                                placeholder='Nombre' 
                                /*value={values.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
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
                                name="apellidoP" 
                                id="apellidoP" 
                                className='input-text' 
                                placeholder='Apellido Paterno' 
                                /*value={values.apellidoPaterno}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='apellidoP' component={()=>(
                                <div><span>{errors.apellidoP}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
                        <div><Field 
                                type="text" 
                                name="apellidoM" 
                                id="apellidoM" 
                                className='input-text' 
                                placeholder='Apellido Materno' 
                                /*value={values.apellidoMaterno}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='apellidoM' component={()=>(
                                <div><span>{errors.apellidoM}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Correo:</label></div>
                        <div><Field 
                                type="email" 
                                name="correo" 
                                id="correo" 
                                className='input-text' 
                                placeholder='Correo'
                                /*value={values.correo}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='correo' component={()=>(
                                <div><span>{errors.correo}</span></div>
                            )}/>
                        </div>
                    </div>
                    
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Contraseña:</label></div>
                        <div><Field 
                                type="password" 
                                name="contrasena" 
                                id="contrasena" 
                                className='input-text'
                                placeholder='Contraseña'
                                /*value={values.contrasena}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='contrasena' component={()=>(
                                <div><span>{errors.contrasena}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Confirmar Contraseña:</label></div>
                        <div><Field 
                                type="password" 
                                name="contrasena2" 
                                id="contrasena2" 
                                className='input-text'
                                placeholder='Confirmar Contraseña'
                                /*value={values.contrasena2}
                                onChange={handleChange}
                                onBlur={handleBlur}*/
                           />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='contrasena2' component={()=>(
                                <div><span>{errors.contrasena2}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Estado:</label></div>
                        <div><Field 
                                type="text" 
                                name="estado" 
                                id="estado" 
                                className='input-text'
                                placeholder='Estado'
                                /*value={values.estado}
                                onChange={handleChange}
                                onBlur={handleBlur} */
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='estado' component={()=>(
                                <div><span>{errors.estado}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Municipio/Delegacion:</label></div>
                        <div><Field 
                                type="text" 
                                name="delegacion" 
                                id="delegacion" 
                                className='input-text'
                                placeholder='Estado'
                                /*value={values.delegacion}
                                onChange={handleChange}
                                onBlur={handleBlur} */
                            />
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='delegacion' component={()=>(
                                <div><span>{errors.delegacion}</span></div>
                            )}/>
                        </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Cargo:</label></div>
                        <div>
                            <Field name='Id_Cargo' as="select"
                                    //value={values.cargo} 
                                    //onChange={handleChange} 
                                    className='input-text'>
                                    {cargo.map((cargos)=>(
                                        <option 
                                            key={cargos.Id_Cargo} 
                                            value={cargos.Id_Cargo}>{cargos.tipo_Cargo}
                                        </option>
                                    ))}
                            </Field>
                        </div>
                        <div className='msg_error'>
                            <ErrorMessage name='Id_Cargo' component={()=>(
                                <div><span>{errors.Id_Cargo}</span></div>
                            )}/>
                        </div>
                    </div>
                    {/*<div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Cargo:</label></div>
                        <div><input type="text" name="" id="" className='input-text' /></div>
                    </div>*/}
                    <div className='conte-registrar'>
                        <input className='btnRegistrar' type="submit" value="Registrar" />
                    </div>
                    {formularioEnviado &&<p>Formulario Enviado con Exito</p>}
                </div>
            </Form>
        )}
            
        </Formik>
        
      </div>
    </div>
  )
}

export default FormRegistroPersonal
