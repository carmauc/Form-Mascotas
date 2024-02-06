  const BASE_URL = 'https://form-mascotas-production.up.railway.app'; // Reemplaza con la URL de tu servidor
  // const BASE_URL = 'http://localhost:3001'; // Reemplaza con la URL de tu servidor

  const api = {
    enviarFormulario: async (formData) => {
 // Convertir formData a JSON
 const formDataJson = {};
 formData.forEach((value, key) => formDataJson[key] = value);


      const response = await fetch(`${BASE_URL}/enviar-correo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: formData,
        body: JSON.stringify(formDataJson), // Convertir a JSON
        // body: datosFormulario,

      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }


      const responseData = await response.json();
      return responseData;
      // return response.json();
    },
  };

  export default api;