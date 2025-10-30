import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask';


const Cexgan = () => {
    //Datos de la mercancia
  const [mascota, setMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [numero, setNumero] = useState('');
// Datos del propietario
  const [nombre, setNombre] = useState('');
  const [direcciono, setDirecciono] = useState('');
  const [postal, setPostal] = useState('');
  const [ident, setIdent] = useState('');
  const [numeroid, setNumeroid] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefonoo, setTelefonoo] = useState('');


  // Destinatario
  const [direcciond, setDirecciond] = useState('');
  const [postal2, setPostal2] = useState('');
  const [ciudadd, setCiudadd] = useState('');
  const [paisd, setPaisd] = useState('');
  const [telefonod, setTelefonod] = useState('');

// medio de transporte 
  const [vuelo, setVuelo] = useState('');

// Lugares de ref Mercancia
  // Region de Origen
  const [ciudado, setCiudado] = useState('');
// Lugar de Inspeccion Fronteriza en destino
  const [pifd, setPifD] = useState('');
// fecha de salida
  const [fecha, setFecha] = useState('');

  const [archivo1, setArchivo1] = useState(null); // state para adjuntar archivos
//   const [pasaporte1, setPasaporte1] = useState(null); // state para adjuntar archivos
  const [archivo2, setArchivo2] = useState(null); // state para adjuntar archivos

  // const [desparasitante, setDesparasitante] = useState(''); // state para adjuntar archivos


  const [submitClicked, setSubmitClicked] = useState(false); // state para mostrar los errores al hacer click
  const [resetForm, setResetForm] = useState(false); // state para reiniciar formulario al enviar



  
  
  const handleArchivoChange1 = (e) => {
    setArchivo1(e.target.files[0]);
  };

    const handleArchivoChange2 = (e) => {
    setArchivo2(e.target.files[0]);
    // setArchivo2(Array.from(e.target.files));
  };

  // const handlePasaporte = (e) => {
  //   setPasaporte1(e.target.files[0]);
  // };

  // formatear string que devuelve el input de tipo Date
  const formatearFecha = fechaInput => {
    const partesFecha = fechaInput.split('-');
    const fechaFormateada = partesFecha[2] + '-' + partesFecha[1] + '-' + partesFecha[0];
    return fechaFormateada
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
if ([mascota, raza, especie, nacimiento, sexo, microchip, nombre, ident, numeroid, correo, direcciond, direcciono, ciudadd, paisd, postal, ciudado, telefonod, telefonoo, fecha, pifd, vuelo, postal2].includes('')) {
	Swal.fire({
    icon: "error",
    title: "Todos los campos son Obligatorios",
  });
  return;
}
if (microchip === 1 && numero.length != 19) {
  Swal.fire({
    icon: "error",
    title: "El microchip debe ser de 15 dígitos",
  });
  return;
}
if (telefonod === telefonoo) {
  Swal.fire({
    icon: "error",
    title: "Los teléfonos no pueden ser iguales",
  });
  return;
}


let timerInterval;
Swal.fire({
  title: "Enviando..",
  timer: 3000,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    return;
  }
});


    try {
      const formData = new FormData();
      formData.append('mascota', mascota);
      formData.append('correo', correo);
      formData.append('microchip', microchip);
      formData.append('especie', especie);
      formData.append('raza', raza);
      formData.append('nacimiento', nacimiento);
      formData.append('sexo', sexo);
      formData.append('numero', numero);
      formData.append('nombre', nombre);
      formData.append('ident', ident);
      formData.append('numeroid', numeroid);
      formData.append('direcciond', direcciond);
      formData.append('ciudadd', ciudadd);
      formData.append('paisd', paisd);
      formData.append('postal', postal);
      formData.append('telefonod', telefonod);
      formData.append('direcciono', direcciono);
      formData.append('ciudado', ciudado);
      formData.append('telefonoo', telefonoo);
      formData.append('fecha', fecha);
      formData.append('vuelo', vuelo);
      formData.append('postal2', postal2);
      formData.append('pifd', pifd);

      formData.append('archivo1', archivo1);
            formData.append('archivo2', archivo2);

    //   formData.append('pasaporte1', pasaporte1);

        // Agregar archivos2 al FormData
        // archivo2.forEach((archivo, index) => {
        //   formData.append(`archivo2-${index + 1}`, archivo);
        // });

      // ... agregar otros campos ...


      const response = await api.enviarFormulario(formData);
      console.log(response); // Manejar la respuesta del servidor
  Swal.fire({
    title: '¡Enviado!',
    text: 'Tu formulario ha sido enviado con éxito.',
    icon: 'success',
    confirmButtonText: 'OK',
  });
       // Manejar errores al enviar el formulario
       setResetForm(true);

    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      Swal.fire({
        title: '¡Error en el Servidor!',
        text: 'Tu formulario no ha sido enviado.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    if (resetForm) {
      // Reiniciar todos los estados a sus valores iniciales
      setMascota('');
      setEspecie('');
      setRaza('');
      setNacimiento('');
      setSexo('');
      setMicrochip('');
      setNumero(null);
      setNombre('');
      setIdent('');
      setNumeroid('');
      setCorreo('');
      setDirecciond('');
      setCiudadd('');
      setPaisd('');
      setPostal('');
      setTelefonod('');
      setDirecciono('');
      setCiudado('');
      setTelefonoo('');
      setFecha('');
      setPostal2('');
      setPifD('');
      setVuelo('');

    
      // ... (otros reinicios)
      setArchivo1(null);
            setArchivo2(null);

    //   setPasaporte1(null)

      setSubmitClicked(false);
      // Desactivar el estado de reinicio
      setResetForm(false);
    }
  }, [resetForm]);
  return (
    <div className=' bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20 '>
      <h1 className='font-bold text-4xl text-cyan-600 text-center'>Formulario para Certificados CEXGAN</h1>
      <p className='text-center text-lg my-8 text-orange-500'>Por favor, complete el formulario con información precisa. Tómese su tiempo y asegúrese de revisar todos los campos antes de enviarlo. De esto depende el viaje de su mascota.
</p>
  <form onSubmit={handleSubmit}>

    <div className='mb-8'>
  <label className='text-gray-800 '>
    País de Destino:
  </label>
  <input
    id='paisDestino'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='País de Destino'
    name='paisDestino'
    value={paisd}
    onChange={(e) => setPaisd(e.target.value)}
  />
            {submitClicked && paisd === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>
  <legend
						className=' mt-5 mb-8 w-full bg-cyan-600 p-2 uppercase font-bold text-white text-md text-center rounded-md'
						>Información de la Mascota</legend>
<div className='mb-8'>
  <label className='text-gray-800'>
    Nombre de la Mascota:
  </label>
  <input
    id='mascota'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Nombre de la Mascota'
    name='mascota'
    value={mascota}
    onChange={(e) => setMascota(e.target.value)}
    // required="required"
  />
{submitClicked && mascota === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<div className="mb-8">
          <label htmlFor="mascota" className="text-gray-800">
            Tipo Mascota
          </label>
<div className="flex justify-evenly">
    <div className="flex items-center border-2 w-40 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input id="radioperro" 
    type="radio" 
    value="Canino" 
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {especie=='Canino' ? true: false }
    onChange={(e) => setEspecie(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">Perro</label>
    </div>

    <div className="flex items-center border-2 w-40 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input 
    id="radiogato" 
    type="radio" 
    value="Felino"
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {especie=='Felino' ? true: false }
    onChange={(e) => setEspecie(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">Gato</label>
    </div>
</div>
{submitClicked && especie === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
      </div>

  <div className='mb-8'>
  <label className='text-gray-800'>
    Raza:
  </label>
{especie == 'Canino' && (
<select value={raza} className='block w-3/4 md:w-1/3 p-2 mt-2 bg-gray-50 rounded-md' onChange={(e) => setRaza(e.target.value)}>
<option value="">**  Seleccione por favor **</option>
<option value="Mestizo">*MESTIZO*</option>
			<option value="Afgano">AFGANO</option>
			<option value="Airedale">AIREDALE</option>
			<option value="Akita Americano">AKITA AMERICANO</option>
			<option value="Akita Inu">AKITA INU</option>
			<option value="Alano">ALANO</option>
			<option value="Alaskan Malamute">ALASKAN MALAMUTE</option>
			<option value="American Eskimo">AMERICAN ESKIMO</option>
			<option value="Angler">ANGLER</option>
			<option value="Argo">ARGO</option>
			<option value="Basenji">BASENJI</option>
			<option value="Basset Hound">BASSET HOUND</option>
			<option value="Beagle">BEAGLE</option>
			<option value="Bearded Collie">BEARDED COLLIE</option>
			<option value="Bernes de la Montaña">BERNES DE LA MONTAÑA</option>
			<option value="Bichon">BICHON</option>
			<option value="Blackbelly">BLACKBELLY</option>
			<option value="Bloodhaund">BLOODHAUND</option>
			<option value="Bobtail">BOBTAIL</option>
			<option value="Bodeguero Andaluz">BODEGUERO ANDALUZ</option>
			<option value="Border Collie">BORDER COLLIE</option>
			<option value="Borzoi">BORZOI</option>
			<option value="Boston Terrier">BOSTON TERRIER</option>
			<option value="Boxer">BOXER</option>
			<option value="Boyero de Flandes">BOYERO DE FLANDES</option>
			<option value="Braco Alemán">BRACO ALEMAN</option>
			<option value="Braco Italiano">BRACO ITALIANO</option>
			<option value="Bulldog Frances">BULLDOG FRANCES</option>
			<option value="Bulldog Ingles">BULLDOG INGLES</option>
			<option value="Bullmastiff">BULLMASTIFF</option>
			<option value="Bullterrier">BULLTERRIER</option>
			<option value="Ca de Bestiar">CA DE BESTIAR</option>
			<option value="Caniche">CANICHE</option>
			<option value="Carin eTrrier">CARIN TERRIER</option>
			<option value="Cav King Charles">CAV KING CHARLES</option>
			<option value="Chesapeake Bay Retrieve">CHESAPEAKE BAY RETRIEVER</option>
			<option value="Chihuahua">CHIHUAHUA</option>
			<option value="Chino Crestado">CHINO CRESTADO</option>
			<option value="Chow chow">CHOW CHOW</option>
			<option value="Cocker spaniel">COCKER SPANIEL</option>
			<option value="Curr">CURR</option>
			<option value="Dachshund">DACHSHUND</option>
			<option value="Dalmata">DALMATA</option>
			<option value="Doberman">DOBERMAN</option>
			<option value="Dogo Aleman">DOGO ALEMAN</option>
			<option value="Dogo Argentino">DOGO ARGENTINO</option>
			<option value="Dogo De Burdeos">DOGO DE BURDEOS</option>
			<option value="Drahthaar">DRAHTHAAR</option>
			<option value="Eurasier">EURASIER</option>
			<option value="Fila brasileño">FILA BRASILEÑO</option>
			<option value="Fox terrier">FOX TERRIER</option>
			<option value="Galgo Afgano">GALGO AFGANO</option>
			<option value="Galgo Español">GALGO ESPAÑOL</option>
			<option value="Galgo Italiano">GALGO ITALIANO</option>
			<option value="Galgo Ruso">GALGO RUSO</option>
			<option value="Golden Retriever">GOLDEN RETRIEVER</option>
			<option value="Goldendoodle">GOLDENDOODLE</option>
			<option value="Gos d´atura">GOS D´ATURA</option>
			<option value="Gran Danes">GRAN DANES</option>
			<option value="Greyhaund">GREYHAUND</option>
			<option value="Grifon">GRIFON</option>
			<option value="Havanese">HAVANESE</option>
      <option value="Husky Siberiano">HUSKY SIBERIANO</option>
			<option value="Irish Wolfhound">IRISH WOLFHOUND</option>
			<option value="Jack Russel">JACK RUSSEL</option>
			<option value="Kerry blue">KERRY BLUE</option>
			<option value="Komondor">KOMONDOR</option>
			<option value="Labrador Retriever">LABRADOR RETRIEVER</option>
			<option value="Lakeland Terrier">LAKELAND TERRIER</option>
			<option value="Leonberger">LEONBERGER</option>
			<option value="Lhasa apso">LHASA APSO</option>
			<option value="Louisiana catahoula leopard">LOUISIANA CATAHOULA LEOPARD</option>
			<option value="Maltés">MALTÉS</option>
			<option value="Mastín deL pirineo">MASTÍN DEL PIRINEO</option>
			<option value="Mastin deL tibet">MASTIN DEL TIBET</option>
			<option value="Mastín Español">MASTÍN ESPAÑOL</option>
			<option value="Mastin Italiano">MASTIN ITALIANO</option>
			<option value="Mastín Napolitano">MASTÍN NAPOLITANO</option>
			<option value="Montaña del Pirineo">MONTAÑA DEL PIRINEO</option>
			<option value="Norfolk terrier">NORFOLK TERRIER</option>
			<option value="Old english sheepdog">OLD ENGLISH SHEEPDOG</option>
			<option value="Overo colorado">OVERO COLORADO</option>
			<option value="Pachon navarro">PACHON NAVARRO</option>
			<option value="Papillon">PAPILLON</option>
			<option value="Pastor Aleman">PASTOR ALEMAN</option>
			<option value="Pastor Americano miniatura">PASTOR AMERICANO MINIATURA</option>
			<option value="Pastor Australiano">PASTOR AUSTRALIANO</option>
			<option value="Pastor B. malinois">PASTOR B. MALINOIS</option>
			<option value="Pastor Belga">PASTOR BELGA</option>
			<option value="Pastor Checo">PASTOR CHECO</option>
			<option value="Pastor Collie">PASTOR COLLIE</option>
			<option value="Pastor De beauce">PASTOR DE BEAUCE</option>
			<option value="Pastor De brie">PASTOR DE BRIE</option>
			<option value="Pastor Ganadero australiano">PASTOR GANADERO AUSTRALIANO</option>
			<option value="Pastor Holandes">PASTOR HOLANDES</option>
			<option value="Pequinés">PEQUINÉS</option>
			<option value="Perdiguero burgos">PERDIGUERO BURGOS</option>
			<option value="Perro de agua español">PERRO DE AGUA ESPAÑOL</option>
			<option value="Perro mestizo">PERRO MESTIZO</option>
			<option value="Pinscher miniatura">PINSCHER MINIATURA</option>
			<option value="Pit bull">PIT BULL</option>
			<option value="Podenco">PODENCO</option>
			<option value="Pointer">POINTER</option>
			<option value="Pomeranian">POMERANIAN</option>
			<option value="Poodle">POODLE</option>
			<option value="Pug">PUG</option>
			<option value="Rhodesian ridgebak">RHODESIAN RIDGEBAK</option>
			<option value="Rottweiler">ROTTWEILER</option>
			<option value="Rough collie">ROUGH COLLIE</option>
			<option value="Sabueso español">SABUESO ESPAÑOL</option>
			<option value="Sabueso fino colombiano">SABUESO FINO COLOMBIANO</option>
			<option value="Saluki">SALUKI</option>
			<option value="Samoyedo">SAMOYEDO</option>
			<option value="San Bernardo">SAN BERNARDO</option>
			<option value="Schnauzer">SCHNAUZER</option>
			<option value="Scottish terrier">SCOTTISH TERRIER</option>
			<option value="Sealyhalm terrier">SEALYHALM TERRIER</option>
			<option value="Setter gordon">SETTER GORDON</option>
			<option value="Setter ingles">SETTER INGLES</option>
			<option value="Setter irlandes">SETTER IRLANDES</option>
			<option value="Shar pei">SHAR PEI</option>
			<option value="Shetland Sheep">SHETLAND SHEEP</option>
			<option value="Shiba Inu">SHIBA INU</option>
			<option value="Shih Tzu">SHIH TZU</option>
			<option value="Shihtzu x Bichon frise">SHIHTZU x BICHON FRISE</option>
			<option value="Smooth collie">SMOOTH COLLIE</option>
			<option value="Spaniel breton">SPANIEL BRETON</option>
			<option value="Springer Spaniel Ingles">SPRINGER SPANIEL INGLES</option>
			<option value="Stafford terrier">STAFFORD TERRIER</option>
			<option value="Teckel">TECKEL</option>
			<option value="Terranova">TERRANOVA</option>
			<option value="Terrier australiano">TERRIER AUSTRALIANO</option>
			<option value="Terrier ruso">TERRIER RUSO</option>
			<option value="Tibetan spaniel">TIBETAN SPANIEL</option>
			<option value="Tibetan terrier">TIBETAN TERRIER</option>
			<option value="Viringo peruano">VIRINGO PERUANO</option>
			<option value="Weimaraner">WEIMARANER</option>
			<option value="Welhs terrier">WELHS TERRIER</option>
			<option value="Welsh pembroke corgi">WELSH PEMBROKE CORGI</option>
			<option value="West highland terrier">WEST HIGHLAND TERRIER</option>
			<option value="Westie">WESTIE</option>
			<option value="Wolfspitz">WOLFSPITZ</option>
			<option value="Xoloitzcuintle">XOLOITZCUINTLE</option>
			<option value="Yorkie - poo">YORKIE - POO</option>
			<option value="Yorkshire">YORKSHIRE</option>
			<option value="Yorkshire terrier">YORKSHIRE TERRIER</option>
		</select>
)}

{especie == 'Felino' && (
<select value={raza} className='block w-1/3 p-2 mt-2 bg-gray-50 rounded-md' onChange={(e) => setRaza(e.target.value)}>
<option value="">**  Seleccione por favor **</option>
      <option value="Mestizo">*MESTIZO*</option>
			<option value="Abyssinian">ABYSSINIAN</option>
			<option value="Angora turco">ANGORA TURCO</option>
			<option value="Azul ruso">AZUL RUSO</option>
			<option value="Balines">BALINES</option>
			<option value="BengalI">BENGALi</option>
			<option value="Bombay">BOMBAY</option>
			<option value="Bosque de noruega">BOSQUE DE NORUEGA</option>
             <option value="British Shortair">BRITISH SHORTAIR</option>
			<option value="Burmes">BURMES</option>
			<option value="Colourpoints">COLOURPOINTS</option>
            <option value="Comun Europeo">COMUN EUROPEO</option>
			<option value="Gato de bosque">GATO DE BOSQUE</option>
			<option value="Himalayo">HIMALAYO</option>
			<option value="Javanes">JAVANES</option>
			<option value="Korat">KORAT</option>
			<option value="Kurillian bobtail long">KURILLIAN BOBTAIL LONG</option>
			<option value="Maine coon">MAINE COON</option>
			<option value="Manx">MANX</option>
            <option value="Mau Egipcio">MAU EGIPCIO</option>
			<option value="Ocicat">OCICAT</option>
			<option value="Pelo corto americano">PELO CORTO AMERICANO</option>
            <option value="Pelo Largo americano">PELO LARGO AMERICANO</option>
			<option value="Pelo corto británico">PELO CORTO BRITÁNICO</option>
            <option value="Pelo Largo británico">PELO LARGO BRITÁNICO</option>
			<option value="Pelo corto exótico">PELO CORTO EXÓTICO</option>
			<option value="Pelo corto mexicano">PELO CORTO MEXICANO</option>
			<option value="Pelo corto oriental">PELO CORTO ORIENTAL</option>
            <option value="Pelo Largo oriental">PELO LARGO ORIENTAL</option>
			<option value="Persa">PERSA</option>
			<option value="Rag doll">RAG DOLL</option>
			<option value="Rex devon">REX DEVON</option>
			<option value="Sagrado de birmania">SAGRADO DE BIRMANIA</option>
			<option value="Scotish Fold">SCOTISH FOLD</option>
			<option value="Scottish Straight">SCOTTISH  STRAIGHT</option>
			<option value="Siames">SIAMES</option>
			<option value="Somalí">SOMALÍ</option>
			<option value="Sphynx">SPHYNX</option>
		</select>
)}
      {submitClicked && raza === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

</div>


<div className="mb-8">
          <label className="text-gray-800">
          Fecha de Nacimiento:
          </label>
          <input
            id="nacimiento"
            type="date"
            className="block p-2 mt-2 bg-gray-50 rounded-md"
            // value={nacimiento}
            onChange={(e) => setNacimiento(formatearFecha(e.target.value))}
          />
                {submitClicked && nacimiento === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

        </div>

<div className="mb-8">
<label className="text-gray-800">
Sexo:
</label>
        <select id='sexo'
          value={sexo}
          className='p-2 block mt-2 bg-gray-50 rounded-md'
          onChange={e => setSexo(e.target.value)}>
<option value="" > </option>
<option value="Macho">Macho</option>
<option value="Hembra">Hembra</option>
</select>
{submitClicked && sexo === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>


<div className="mb-8">
          <label htmlFor="mascota" className="text-gray-800">
          Microchip
          </label>
<div className="flex justify-start">
    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400">
    <input         
    id="microchip-yes" 
    type="radio" 
    value="1" 
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked={microchip === 1}
    onChange={(e) => setMicrochip(parseInt(e.target.value))}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">Si</label>
    </div>

    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400">
    <input 
    id="2" 
    type="radio" 
    value="No"
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {microchip=='No' ? true: false }
    onChange={(e) => setMicrochip(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">No</label>
    </div>

    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400">
    <input 
    id="2" 
    type="radio" 
    value="pendiente"
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {microchip=='pendiente' ? true: false }
    onChange={(e) => setMicrochip(e.target.value)}
    />
    <label className="py-4 ml-4 w-full text-sm font-medium text-gray-400">Pendiente por Implantar</label>
    </div>
</div>
{submitClicked && microchip === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

      </div>


      {microchip == 1 && (
<div className='mb-8'>
  <label className='text-gray-800'>
    Numero de Microchip:
  </label>
  <InputMask
    id='microchip'
    mask="999-999-999-999-999"
    type='text'
    maskChar={null}
    className='block md:w-1/4 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='999-999-999-999-999'
    value={numero}
    // minLength="15"
    // maxLength="15"
    required
    onChange={(e) => setNumero(e.target.value)}/>
</div>
      )
      }

      <div className='mb-8'>
  <label className='text-gray-800'>
  Pasaporte de la Mascota (Adjunte las hojas relevantes del pasaporte, legibles y en formato PDF):
  </label>
  <input 
  type="file"     
  className='block w-full p-2 mt-2 '
  id="archivo1"
  accept=".pdf"
  onChange={handleArchivoChange1} />
</div>

      <div className='mb-8'>
  <label className='text-gray-800'>
Prueba de anticuerpos contra la rabia (adjunte la serología de rabia en formato PDF si es requerida):
  </label>
  <input 
  type="file"     
  className='block w-full p-2 mt-2 '
  id="archivo2"
  accept=".pdf"
  onChange={handleArchivoChange2} />
</div>

{/* <div className="mb-8">
          <label htmlFor="mascota" className="text-gray-800">
          Agregar Información del Desparasitante<p className='mt-2 text-sm text-orange-500'>La fecha de aplicación del desparasitante Externo e Interno varia dependiendo el país pero se recomienda sea 5 días antes del viaje</p>
          </label>
<div className="flex justify-start">
    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400">
    <input id="titular" 
    type="radio" 
    value="1" 
    className="w-6 h-4 accent-teal-600 cursor-pointer"
    checked = {desparasitante == 1 ? true: false}
    onChange={(e) => setDesparasitante(e.target.value)}

    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">Si</label>
    </div>

    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400">
    <input 
    id="titular" 
    type="radio" 
    value="2"
    className="w-6 h-4 accent-teal-600 cursor-pointer"
    checked = {desparasitante == 2 ? true: false }
    onChange={(e) => setDesparasitante(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">No</label>
    </div>
</div>
{submitClicked && desparasitante === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

    </div>

    {desparasitante == '1' && (
        <div>
<div className='mb-8'>
<label htmlFor="mascota" className="text-gray-800">
Adjuntar un solo archivo con la información del Desparasitante Externo e Interno:<p className='mt-2 text-sm text-orange-500'>Debe ser visible el número de lote y la fecha de vencimiento</p>
          </label>
  <label className='text-gray-800'>
   
  </label>
  <input 
  type="file"     
  className='block w-full p-2 mt-2 '
  id="archivo3" 
  onChange={handlePasaporte} />
</div>
</div>
    )} */}

      <legend
						className=' mt-5 mb-8 w-full bg-cyan-600 p-2 uppercase font-bold text-white text-md text-center rounded-md'
						>Información del Propietario</legend>

<div className='mb-8'>
  <label className='text-gray-800'>
  Nombres y Apellidos  (Propietario o persona responsable):
  </label>
  <input
    id='nombre'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Nombre Completo'
    name='nombre'
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
  />
        {submitClicked && nombre === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

</div>

<div className="mb-8">
          <label className="text-gray-800">
            Identificación:
          </label>
<div className="md:flex justify-start">
    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input id="id" 
    type="checkbox" 
    value="DNI" 
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {ident=='DNI' ? true: false }
    onChange={(e) => setIdent(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">DNI</label>
    </div>

        <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input id="id" 
    type="checkbox" 
    value="NIE" 
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {ident=='NIE' ? true: false }
    onChange={(e) => setIdent(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">NIE</label>
    </div>

    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input 
    id="id" 
    type="checkbox" 
    value="P.A"
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {ident=='P.A' ? true: false }
    onChange={(e) => setIdent(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">P.A</label>
    </div>
    <div className="flex items-center w-20 pl-4 mt-2 placeholder-gray-400 rounded-md">
    <input 
    id="id" 
    type="checkbox" 
    value="C.E"
    className="w-6 h-4 accent-cyan-600 cursor-pointer"
    checked = {ident=='C.E' ? true: false }
    onChange={(e) => setIdent(e.target.value)}
    />
    <label className="py-4 ml-2 w-full text-sm font-medium text-gray-400">C.E</label>
    </div>

    <div className="flex items-center w-full pl-4 mt-2 placeholder-gray-400 rounded-md">
  <input
    id='numeroid'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Numero de Identificación'
    value={numeroid}
    onChange={(e) => setNumeroid(e.target.value)}
  />
</div>
</div>
{submitClicked && numeroid === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

      </div>
<div className='mb-8'>
  <label className='text-gray-800'>
  Dirección:
  </label>
  <input
    id='direccionO'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Dirección País de Origen'
    name='direccionO'
    value={direcciono}
    onChange={(e) => setDirecciono(e.target.value)}
  />
            {submitClicked && direcciono === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

</div>

<div className='mb-8'>
  <label className='text-gray-800 '>
    Ciudad:
  </label>
  <input
    id='ciudadOrigen'
    type='text'
    className='block md:w-1/4 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Ciudad Origen'
    name='CiudadOrig'
    value={ciudado}
    onChange={(e) => setCiudado(e.target.value)}
  />
            {submitClicked && ciudado === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
  </div>

  <div className='mb-8'>
  <label className='text-gray-800'>
  Código Postal:
  </label>
  <input
    id='codigoP2'
    type='text'
    className='block md:w-1/4 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Código Postal'
    name='código postal'
    value={postal2}
    onChange={(e) => setPostal2(e.target.value)}
  />
            {submitClicked && postal2 === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<div className='mb-8'>
  <label className='text-gray-800'>
    Teléfono:
  </label>
  <InputMask
    id='telefonoO'
    type='tel'
    mask="+99(999)9999999"
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='+57 (321) 555‑0132'
    name='telefonoO'
    value={telefonoo}
    onChange={(e) => setTelefonoo(e.target.value)}
  />
            {submitClicked && telefonoo === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

</div>

<div className='mb-8'>
  <label className='text-gray-800'>
    E-mail:
  </label>
  <input
    id='email'
    type='email'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Email'
    name='email'
    value={correo}
    onChange={(e) => setCorreo(e.target.value)}
  />
          {submitClicked && correo === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<legend
						className=' mt-5 mb-8 w-full bg-cyan-600 p-2 uppercase font-bold text-white text-md text-center rounded-md'
						>Información Destino</legend>

<div className='mb-8'>
  <label className='text-gray-800'>
  Dirección de Destino:<p className='mt-2 text-sm text-orange-500'>Si no cuenta con la dirección exacta absténgase de llenar este formulario</p>

  </label>
  <input
    id='direccionD'
    type='text'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Dirección Exacta en el País de Destino'
    name='direccionD'
    value={direcciond}
    onChange={(e) => setDirecciond(e.target.value)}
  />
          {submitClicked && direcciond === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<div className='mb-8'>
  <label className='text-gray-800 '>
    Localidad de Destino:
  </label>
  <input
    id='ciudadDestino'
    type='text'
    className='block w-1/2 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Ciudad'
    name='CiudadDest'
    value={ciudadd}
    onChange={(e) => setCiudadd(e.target.value)}
  />
            {submitClicked && ciudadd === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}

</div>
<div className='mb-8'>
  <label className='text-gray-800'>
  Código Postal:
  </label>
  <input
    id='codigoP'
    type='text'
    className='block md:w-1/4 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Código Postal'
    name='código postal'
    value={postal}
    onChange={(e) => setPostal(e.target.value)}
  />
            {submitClicked && postal === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>


<div className='mb-8'>
<label className='text-gray-800'>
  Teléfono Destino (Incluir Código País + Código de Área):
  </label>
  <InputMask
    id='telefonoD'
    mask="+99(999)9999999"
    type='tel'
    className='block w-full p-2 mt-2 bg-gray-50 rounded-md'
    placeholder=' +1 (415) 555‑0132'
    name='telefonoDestino'
    value={telefonod}
    onChange={(e) => setTelefonod(e.target.value)}
  />
            {submitClicked && telefonod === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>




<legend
						className=' mt-5 mb-8 w-full bg-cyan-600 p-2 uppercase font-bold text-white text-md text-center rounded-md'
						>Información Vuelo</legend>
      
      

  <div className="mb-8">
          <label className="text-gray-800">
          Fecha de Salida:
          </label>
          <input
            id="salida"
            type="date"
            className="block p-2 mt-2 bg-gray-50 rounded-md"
            // value={fecha}
            onChange={(e) => setFecha(formatearFecha(e.target.value))}
            // onChange={handlefecha}
          />
                    {submitClicked && fecha === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
        </div>

<div className='mb-8'>
  <label className='text-gray-800'>
  Número De Vuelo:
  </label>
  <input
    id='vuelo'
    type='text'
    className='block md:w-1/4 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Número de Vuelo'
    name='Número de vuelo'
    value={vuelo}
    onChange={(e) => setVuelo(e.target.value)}
  />
            {submitClicked && vuelo === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<div className='mb-8'>
  <label className='text-gray-800'>
  Puesto de Inspección Fronteriza en Destino:
  </label>
  <input
    id='pif'
    type='text'
    className='block w-4/6 p-2 mt-2 bg-gray-50 rounded-md'
    placeholder='Aeropuerto de llegada'
    name='Número de vuelo'
    value={pifd}
    onChange={(e) => setPifD(e.target.value)}
  />
            {submitClicked && pifd === '' && <span style={{ color: 'red' }}>¡Campo Obligatorio!</span>}
</div>

<input
						type='submit'
						className=' mt-5 w-full bg-cyan-700 p-3 uppercase font-bold text-white text-lg cursor-pointer'
						value='Enviar'/>
          </form>
</div>

  );
};

export default Cexgan;
