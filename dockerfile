# Usa la imagen de Node.js
FROM node:latest

# Establece el directorio de trabajo en la carpeta "back"
WORKDIR /app/BACK

# Copia los archivos del backend al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto del servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
