  const BASE_URL = 'https://form-mascotas-production.up.railway.app'; // Reemplaza con la URL de tu servidor
  const api = {
    enviarFormulario: async (formData) => {
      const response = await fetch(`${BASE_URL}/enviar-correo`, {
        method: 'POST',
        body: formData,


      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }


      const responseData = await response.json();
      return responseData;
    },
  };

  export default api;