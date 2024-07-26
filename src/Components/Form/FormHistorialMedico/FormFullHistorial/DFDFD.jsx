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
  
