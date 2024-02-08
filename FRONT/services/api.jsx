  const BASE_URL = 'https://back-mascotas-production-b241.up.railway.app'; // Reemplaza con la URL de tu servidor
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
        body: JSON.stringify(formDataJson), // Convertir a JSON

      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }


      const responseData = await response.json();
      return responseData;
    },
  };

  export default api;