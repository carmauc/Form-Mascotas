require('dotenv').config();

const cors = require('cors');
const multer = require('multer');
const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración básica
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Inicializa Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ======================
// 📧 RUTA PARA ENVIAR CORREO
// ======================
app.post(
  '/enviar-correo',
  upload.fields([
    { name: 'archivo1', maxCount: 1 },
    { name: 'archivo2', maxCount: 1 },
    { name: 'pasaporte1', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Datos del formulario
      const {
        mascota,
        correo,
        especie,
        raza,
        edad,
        meses,
        sexo,
        numero,
        peso,
        color,
        esterilizado,
        ident,
        nombre,
        microchip,
        nacimiento,
        fecha,
        numeroid,
        direcciond,
        ciudadd,
        estadod,
        paisd,
        postal,
        telefonod,
        direcciono,
        barrio,
        ciudado,
        telefonoo,
        paisP,
        nombre2,
        correo2,
        numeroid2,
        paisP2,
        direccion2,
        ciudad2,
        estado2,
        postal2,
        telefonod2,
        fecha2,
        puerto,
        aeropuerto,
        ruta,
        vuelo,
        aerolinea,
        pifd,

      } = req.body;

      const archivoAdjunto = req.files?.['archivo1']?.[0];
      const archivoAdjunto2 = req.files?.['archivo2']?.[0];
      const pasaporte1 = req.files?.['pasaporte1']?.[0];

      // ======================
      // 🧾 GENERAR PDF CON PUPPETEER
      // ======================
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();

      const htmlContent = 
    `<html>
    <head>
      <style>
        .styled-table {
         border-collapse: collapse;
         width: 100%;
         text-align: center;
         font-size: 14px;
         margin-bottom: 900px;
          }
          .styled-table th {
         background-color: #f2f2f2;
         padding: 5px;
         width:50%;
         border: 1px solid #ddd;
        }
        .styled-table td {
         padding: 5px;
         border: 1px solid #ddd;
       }
        .styled-table tr:nth-child(even) {
         background-color: rgba(170, 201, 185, 0.293);
       }
       
       .styled-table2 {
         border-collapse: collapse;
         width: 100%;
         margin: auto;
         text-align: center;
         font-size: 14px;
         margin-bottom: 900px;
       }
     
       .styled-table2 th {
         background-color: #e47b7b32;
         padding: 8px;
         border: 1px solid #ddd;
       }
       
       .styled-table2 td {
         padding: 8px;
         border: 1px solid #ddd;
       }
     
       .styled-table2 tr:nth-child(even) {
         background-color: #e47b7b32;
       }
       .styled-table3 {
         border-collapse: collapse;
         width: 100%;
         margin: auto;
         text-align: center;
         font-size: 14px;
         margin-bottom: 200px;
     
       }
       .styled-table3 th {
         background-color: #7bb6e432;
         padding: 8px;
         border: 1px solid #ddd;
       }
       .styled-table3 tr:nth-child(even) {
         background-color: #7bb6e432;
       }
       /* Estilo para las celdas de datos */
       .styled-table3 td {
         padding: 8px;
         border: 1px solid #ddd;
       }
     
       .styled-table4 {
         border-collapse: collapse;
         width: 100%;
         margin: auto;
         text-align: center;
         font-size: 14px;
         margin-bottom: 900px;
       }
     
       /* Estilo para las celdas encabezado */
       .styled-table4 th {
         background-color: #f49d1c;
         padding: 8px;
         border: 1px solid #ddd;
       }
       
       /* Estilo para las celdas de datos */
       .styled-table4 td {
         padding: 8px;
         border: 1px solid #ddd;
       }
     
       .styled-table4 tr:nth-child(even) {
         background-color: #e9c999;
       }
       
       body{
         margin: 80px;
         font-family:'Lato', sans-serif ;
       }
       h1{
         font-size: 24px;
         text-align: center;
         margin-top: 180px;
       }
       h2 {
         font-family:'Lato', sans-serif ;
         text-align: center;
         font-size: 14px;
         margin-top: 30px;
       }
       h3 {
         margin-top: 120px;
         font-size: 9px;
       }
       p{
         border-collapse: collapse;
         width: 100%;
         margin: auto;
         text-align: justify;
         font-size: 9px;
       }
      h4{
       margin-top:10px !important;
         font-family:'Lato', sans-serif ;
         text-align: center;
         font-size: 12px;
        margin-bottom: 40px;
     }
       </style>
       
    </head>
    <body>
        <table class="styled-table">
        <thead>
        <h1 style="color: #2fa05e">CERTIFICADO DE SALUD INTERNACIONAL</h1>
        <h2>Fecha de Viaje: ${fecha} </h2>
       </thead>
     <tbody>
          <tr>
            <td>${mascota}</td>
          </tr>
          <tr>
            <td>${especie} / ${raza}</td>
          </tr>
          <tr>
           <td>${nacimiento}</td>
         </tr>
          <tr>
            <td>${edad}-${meses}</td>
          </tr>
          <tr>
            <td>${sexo}</td>
          </tr>
          <tr>
           <td>${numero ? numero : microchip}</td>
          </tr>
          <tr>
            <td>${peso} Kg</td>
          </tr>
          <tr>
            <td>${color}</td>
          </tr>
          <tr>
           <td>-</td>
         </tr>
          <tr>
            <td>${nombre}</td>
          </tr>
          <tr>
            <td>${ident} ${numeroid}</td>
          </tr>
          <tr>
           <td>-</td>
         </tr>
          <tr>
            <td>${direcciond}</td>
          </tr>
          <tr>
            <td>${ciudadd} / ${estadod}</td>
          </tr>
          <tr>
            <td>${paisd}</td>
          </tr>
          <tr>
            <td>${postal}</td>
          </tr>
          <tr>
            <td>${telefonod}</td>
          </tr>
          <tr>
            <td>-</td>
          </tr>
          <tr>
            <td>${direcciono}</td>
          </tr>
            <tr>
                <td>${ciudado}</td>
              </tr>
              <tr>
                <td>Colombia</td>
              </tr>
              <tr>
            <td>${telefonoo}</td>
          </tr>
         </tbody>
        </table>
     
        
        <table class="styled-table2">
         <thead>
           <h1 style="color: #cb1f1f;">CERTIFICADO DE RABIA</h1>
        </thead>
        <tr>
          <th>Nombre Mascota(Name)</th>
          <td>${mascota}</td>
        </tr>
        <tr>
         <th>Microchip</th>
         <td>${numero ? numero : microchip}</td>
       </tr>
        <tr>
          <th>Raza<br>(Species / Breed)</th>
          <td>${raza}</td>
        </tr>
        <tr>
         <th>Sexo (Sex)</th>
         <td>${sexo}</td>
       </tr>
        <tr>
          <th>Fecha de Nacimiento<br>(Date of Birth)<br>(dd/mm/yyyy)</th>
          <td>${nacimiento}</td>
        </tr>
        <tr>
        <th>Esterilizado</th>
        <td>${esterilizado}</td>
      </tr>
        <tr>
          <th>Color(Color)</th>
          <td>${color}</td>
        </tr>
        <tr>
          <th>Nombre Solicitante</th>
          <td>${nombre}</td>
        </tr>
        <tr>
          <th>Dirección de Destino<br>(Destination Address)</th>
          <td>${direcciond}</td>
        </tr>
        <tr>
          <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
          <td>${ciudadd} / ${estadod}</td>
        </tr>
        <tr>
          <th>Codigo Postal<br>(Zip Code)</th>
          <td>${postal}</td>
        </tr>
        <tr>
          <th>Teléfono (Telephone)</th>
          <td>${telefonod}</td>
        </tr>
        <tr>
         <th>Correo</th>
         <td>${correo}</td>
       </tr>
      </table>
      <table class="styled-table3">
       <thead>
         <h1 style="color: #0E7490">INFORMACIÓN SOLICITUD CDC</h1>
       </thead>
      <tr>
       <th colspan="2" style="background-color: #0E7490; color: aliceblue;"">INFORMACIÓN SOLICITANTE DEL PERMISO</th>
     </tr>
      <tr>
        <th>Nombre Completo del Solicitante</th>
        <td>${nombre}</td>
      </tr>
      <tr>
       <th>Dirección de Destino<br>(Destination Address)</th>
       <td>${direcciond}</td>
     </tr>
     <tr>
       <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
       <td>${ciudadd} / ${estadod}</td>
     </tr>
     <tr>
       <th>Codigo Postal<br>(Zip Code)</th>
       <td>${postal}</td>
     </tr>
     <tr>
       <th>Teléfono (Telephone)</th>
       <td>${telefonod}</td>
     </tr>
     <tr>
       <th>Correo</th>
       <td>${correo}</td>
     </tr>
     <tr>
       <th>Pasaporte</th>
       <td>${numeroid}</td>
     </tr>
     <tr>
       <th>Pais</th>
       <td>${paisP}</td>
     </tr>
     <tr><th colspan="2" style="background-color: #0E7490; color: aliceblue;">INFORMACIÓN TITULAR DEL PERMISO</th></tr>
     <tr>
         <th>Nombre Completo del Titular</th>
         <td>${nombre2}</td>
       </tr>
       <tr>
        <th>Dirección de Destino<br>(Destination Address)</th>
        <td>${direccion2}</td>
      </tr>
      <tr>
        <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
        <td>${ciudad2} / ${estado2}</td>
      </tr>
      <tr>
        <th>Codigo Postal<br>(Zip Code)</th>
        <td>${postal2}</td>
      </tr>
      <tr>
        <th>Teléfono (Telephone)</th>
        <td>${telefonod2}</td>
      </tr>
      <tr>
        <th>Correo</th>
        <td>${correo2}</td>
      </tr>
      <tr>
        <th>Pasaporte</th>
        <td>${numeroid2}</td>
      </tr>
      <tr>
        <th>Pais</th>
        <td>${paisP2}</td>
      </tr>
      <tr>
       <tr><th colspan="2" style="background-color: #0E7490; color: aliceblue;">INFORMACIÓN MASCOTA</th></tr>
       <th>Nombre Mascota(Name)</th>
       <td>${mascota}</td>
     </tr>
     <tr>
       <th>Fecha de Nacimiento<br>(Date of Birth)<br>(dd/mm/yyyy)</th>
       <td>${nacimiento}</td>
     </tr>
     <tr>
       <th>Sexo (Sex)</th>
       <td>${sexo}</td>
     </tr>
     <tr>
       <th>Raza<br>(Species / Breed)</th>
       <td>${raza}</td>
     </tr>
     <tr>
       <th>Color(Color)</th>
       <td>${color}</td>
     </tr>
     <tr>
       <th>Microchip</th>
       <td>${numero}</td>
     </tr>
     <tr><th colspan="2" style="color: aliceblue; background-color: #0E7490;">INFORMACIÓN ENTRADA</th></tr>
     <tr>
       <th>Fecha de Entrada</th>
       <td>${fecha2}</td>
     </tr>
     <tr>
       <th>Puerto de Entrada</th>
       <td>${puerto}</td>
     </tr>
        <tr>
       <th>Numero de Vuelo</th>
       <td>${vuelo}</td>
     </tr>
          <tr>
       <th>Aerolinea</th>
       <td>${aerolinea}</td>
     </tr>
     </table>
     <table class="styled-table4">
       <thead>
       <h1 style="color: #f49d1c">CERTIFICADO DE SALUD NACIONAL</h1>
       <h2>Fecha de Viaje: ${fecha} </h2>
      </thead>
     <tbody>
         <tr>
           <td>${mascota}</td>
         </tr>
         <tr>
           <td>${especie} / ${raza}</td>
         </tr>
         <tr>
          <td>${nacimiento}</td>
        </tr>
         <tr>
           <td>${edad}-${meses}</td>
         </tr>
         <tr>
           <td>${sexo}</td>
         </tr>
         <tr>
           <td>${peso} Kg</td>
         </tr>
         <tr>
           <td>${color}</td>
         </tr>
         <tr>
          <td>-</td>
        </tr>
         <tr>
           <td>${nombre}</td>
         </tr>
         <tr>
           <td>${ident} ${numeroid}</td>
         </tr>
         <tr>
           <td>${direcciond}</td>
         </tr>
         <tr>
           <td>${ciudadd}</td>
         </tr>
         <tr>
           <td>${direcciono}</td>
         </tr>
           <tr>
               <td>${ciudado}</td>
             </tr>
             <tr>
           <td>${telefonod}</td>
         </tr>
        </tbody>
       </table>
     <h1 style="color: #951fcb;">ANEXO IV</h1>
     <p style=" font-weight: bold;">I.1.	Expedidor / Consignor  COLOMBIA</p>
     <p><strong>Nombre / Name</strong><span style="text-transform: uppercase;"> ${nombre}</span></p>
     <p><strong>Dirección / Address</strong><span style="text-transform: uppercase;"> ${direcciono} <br> ${ciudado}</span></p>
     <p><strong>Tel.</strong> ${telefonoo}</p>
     <br><br>
     <p style=" font-weight: bold;">I.5. Destinatario /  Consignee <span style="text-transform: uppercase;">${paisd}</span></p>
     <p><strong>Nombre / Name</strong><span style="text-transform: uppercase;"> ${nombre}</span></p>
     <p><strong>Dirección / Address</strong><span style="text-transform: uppercase;"> ${direcciond} <br> ${ciudadd}</span></p>
     <p><strong>Código postal / Postal code:</strong> ${postal}</p>
     <p><strong>Tel.</strong> ${telefonod}</p>
     <br><br>
     <p style=" font-weight: bold;">I.14 ${fecha}</p>
     <br><br>
     <p style=" font-weight: bold;">I.18.	Descripción de la mercancía</p>
     <p style=" font-style: italic;">Description of commodity</p>
     <p style="text-transform: uppercase; font-weight: bold;">ESPECIE: ${especie} / RAZA: ${raza}/ SEXO: ${sexo} / MICROCHIP: ${numero} / EDAD: ${edad} ${meses} / NOMBRE: ${mascota} / ANIMAL VIVO</p>
     <br><br>
     <p style=" font-weight: bold;">${especie === 'Canino' ? 'Canis Lupus Familiaris' : 'Felis silvestris catus'} &emsp;&emsp;${sexo}&emsp;${color}&emsp;${raza}&emsp; &emsp;${numero}&emsp;&emsp;MICROCHIP&emsp;&emsp;&emsp;&emsp;&emsp;${nacimiento}</p>
      </body>
            </html>
  `;

      await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
      await page.pdf({ path: 'output.pdf', format: 'A4' });
      await browser.close();

      // ======================
      // 📎 ADJUNTOS
      // ======================
      const attachments = [
        {
          filename: 'formulario.pdf',
          content: fs.readFileSync('output.pdf').toString('base64'),
          encoding: 'base64',
        },
      ];

      if (archivoAdjunto)
        attachments.push({
          filename: archivoAdjunto.originalname,
          content: archivoAdjunto.buffer.toString('base64'),
          encoding: 'base64',
        });

      if (archivoAdjunto2)
        attachments.push({
          filename: archivoAdjunto2.originalname,
          content: archivoAdjunto2.buffer.toString('base64'),
          encoding: 'base64',
        });

      if (pasaporte1)
        attachments.push({
          filename: pasaporte1.originalname,
          content: pasaporte1.buffer.toString('base64'),
          encoding: 'base64',
        });

      // ======================
      // ✉️ ENVIAR CON RESEND
      // ======================




const EmailContent = (pifd &&  
  `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Información CEXGAN para ${paisd}</h2>
      <p><strong>Destinatario:</strong></p>
      <ul>
        <li>Destinatario: ${nombre}</li>
        <li>Dirección: ${direcciond}</li>
        <li>Codigo y localidad del Destinatario: ${postal} - ${ciudadd}</li>
        <li>Telefono: ${telefonod}</li>
      </ul>
          <p><strong>Medio de Transporte:</strong></p>
      <ul>
        <li>Vuelo: ${vuelo}</li>
      </ul>
               <p><strong>Lugares referentes a la Mercancia:</strong></p>
      <ul>
        <li>PIF de Entrada: ${pifd}</li>
        <li>Fecha de Salida: ${fecha}</li>

      </ul>
      <p><strong>Datos del Propietario:</strong></p>
      <ul>
        <li>Nombre y Apellidos: ${nombre}</li>
        <li>Direccion: ${direcciono}</li>
        <li>Telefono: ${telefonoo}</li>
        <li>Codigo Postal: ${postal2}</li>
        <li>DNI propietario: ${ident} --  ${numeroid}</li>
        <li>Correo Electronico: ${correo}</li>
      </ul>
      <p><strong>Datos de la Mascota:</strong></p>
      <ul>
        <li>Mascota: ${mascota}</li>
        <li>Especie: ${especie}</li>
        <li>Raza: ${raza}</li>
        <li>Fecha de Nacimiento: ${nacimiento}</li>
        <li>Sexo: ${sexo}</li>
        <li>Microchip: ${numero}</li>
      </ul>
    </div>
  ` ) ||
 `    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<h2>Información PreCiS ICA</h2>

<p><strong>Nro de Identificación Exportador:</strong> ${numeroid}</p>
<p><strong>Nombre de Importador:</strong> ${nombre}</p>
<p><strong>Dirección de Destino:</strong> ${direcciond}</p>
<p><strong>Uso del Producto:</strong> Animales de Compañía</p>
<p><strong>Oficina de Inspección:</strong> ${aeropuerto}</p>
<p><strong>Medio de Transporte:</strong> Aéreo</p>
<p><strong>Ruta de Viaje:</strong> ${ruta}</p>
<p><strong>Fecha de Salida:</strong> ${fecha}</p>

<hr>

<h3>Datos del Animal</h3>
<p><strong>Especie:</strong> ${especie}</p>
<p><strong>Pelaje o Microchip:</strong> ${numero ? numero : color}</p>
<p><strong>Raza:</strong> ${raza}</p>
<p><strong>Sexo:</strong> ${sexo}</p>
<p><strong>Edad:</strong> ${edad}-${meses}</p>
<p><strong>País Destino:</strong> ${paisd}</p>

<hr>

<h3>Información del Propietario</h3>
<p><strong>Nombre de la Mascota:</strong> ${mascota}</p>
<p><strong>Especie:</strong> ${especie}</p>
<p><strong>Fecha de Nacimiento:</strong> ${nacimiento}</p>
<p><strong>Microchip:</strong> ${numero}</p>
<p><strong>Email:</strong> ${correo}</p>
<p><strong>Nombre del Propietario:</strong> ${nombre}</p>
<p><strong>Raza:</strong> ${raza}</p>
<p><strong>Sexo:</strong> ${sexo}</p>
<p><strong>Color:</strong> ${color}</p>
<p><strong>Esterilizado:</strong> ${esterilizado}</p>
<p><strong>Tipo de Identificación:</strong> ${ident}</p>
<p><strong>Número de Identificación:</strong> ${numeroid}</p>
<p><strong>Dirección de Origen:</strong> ${direcciono}</p>
<p><strong>Barrio:</strong> ${barrio}</p>
<p><strong>Ciudad:</strong> ${ciudado}</p>
<p><strong>Teléfono:</strong> ${telefonoo}</p>
</div>
                  <p>Adjunto encontrarás el certificado en PDF y los documentos cargados.</p>
`
;

      const response = await resend.emails.send({
        from: 'noreply@maurovet.com', // ⚠️ Debe ser verificado en Resend
        to: ['carmauc339@outlook.com', correo], // copia al usuario
        subject: `Certificado de ${mascota} para ${paisd || ciudadd}`,
        html: EmailContent, 
        attachments,
      });

      console.log('Correo enviado ✅', response);
      res.status(200).json({ message: 'Correo enviado con éxito 🎉' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  }
);

// ======================
// 🚀 INICIAR SERVIDOR
// ======================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
