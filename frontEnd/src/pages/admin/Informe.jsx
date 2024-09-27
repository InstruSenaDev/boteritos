import React, { useState } from "react";
import { GrupoDatoElemento } from "../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../components/list/headerData/HeaderData";
import { InformeIndividual } from "../../components/informe/InformeIndividual";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { useParams } from "react-router-dom";
import { Boton } from "../../components/forms/Boton";
import { Observacion } from "../../components/forms/Observacion";
import { caseAdmin } from "../../helper/validators/case/admin";
import { ConfirmationModal } from "../../components/modales/ConfirmationModal";
import { LoadingModal } from "../../components/modales/LoadingModal";


const Informe = () => {
  const [observacion, setObservacion] = useState("");
  const trimestre = JSON.parse(localStorage.getItem("trimestre"));
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el modal de carga
  const { id } = useParams();
  const idestud = id;

  const handleObservacionChange = (event) => {
    const { value } = event.target;
    setObservacion(value);
  
    // Eliminar el error de la observación al comenzar a escribir
    if (errors.observacion) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: undefined, // Elimina el error de observación
      }));
    }
  };

  // Función para abrir el modal
  const openModal = () => {
    const error = caseAdmin("observacion", observacion);
  if (error) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      observacion: error,
    }));
    return;
  }

  // Si no hay errores, abrir el modal
  setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    // Validar antes de enviar
    const error = caseAdmin("observacion", observacion);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: error,
      }));
      return;
    }

    const data = {
      idestudiante: idestud,
      idtrimestre: trimestre,
      observacion: observacion,
    };

    try {

      setIsLoading(true);

      const response = await fetch("http://localhost:8000/api/v3/logros/informe/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });



      if (response.ok) {
        const contentType = response.headers.get("content-type");
        console.log("Tipo de contenido:", contentType);

        // encabezados de respuesta (segun)
        console.log("Encabezados de la respuesta:", response.headers);

        if (contentType && contentType.includes("application/pdf")) {

          const textfile = response.headers.get("textfile");

          console.log("Nombre del archivo desde el encabezado:", textfile);

          let filename = textfile || "informe.pdf"; // Asignar un valor predeterminado si es null

          // Descargar el archivo
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = filename; // Utilizar el nombre extraído del encabezado
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          console.log("PDF descargado exitosamente");
        } else {
          console.log("La respuesta no es un PDF");
        }
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el informe", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      // Cerrar el modal de carga cuando se complete la descarga
      setIsLoading(false);
    }
  };

  return (
    <LayoutGeneral title="InformeObservacion" titleHeader="Informe">
      <div className="w-full space-y-7">
        <HeaderData
          id={id}
          urlApi={"sql/estudiantes/header/"}
          typeLink={"back"}
        />
        <GrupoDatoElemento />
        <div className="w-full h-0 border-darkBlue border-2"></div>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={1}
          idtrim={trimestre}
          idestud={idestud}
        />

        <InformeIndividual
          tituloArea={"Vida Diaria"}
          idArea={2}
          idtrim={trimestre}
          idestud={idestud}
        />

        <InformeIndividual
          tituloArea={"Teatro"}
          idArea={3}
          idtrim={trimestre}
          idestud={idestud}
        />

        <InformeIndividual
          tituloArea={"Danza"}
          idArea={4}
          idtrim={trimestre}
          idestud={idestud}
        />

        <InformeIndividual
          tituloArea={"Musica"}
          idArea={5}
          idtrim={trimestre}
          idestud={idestud}
        />

        <InformeIndividual
          tituloArea={"Pintura"}
          idArea={6}
          idtrim={trimestre}
          idestud={idestud}
        />

        <Observacion
          texto={"Observación"}
          placeholder={"Ingrese la observación del estudiante"}
          name={"observacion"}
          onChange={handleObservacionChange}
          value={observacion}
          error={errors.observacion}
        />
      </div>


      <div className="mt-7 flex justify-center">
        <Boton text={"Enviar y Descargar"} type={"blue"} onClick={openModal} />
      </div>

      <ConfirmationModal txtQuestion="¿Está seguro de crear el informe?"
        txtWarning="Al crear el informe, no habrá posibilidad de revertir esta opción, por favor, asegurate de que toda la información está correcta y finalizada antes de proceder. Una vez generado, el informe será definitivo y no podrá ser modificado."
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={async () => {
          await handleSubmit();  // Llama a handleSubmit al confirmar
          closeModal();  // Cierra el modal después de la confirmación
        }} />

<LoadingModal isOpen={isLoading} onClose={() => {}} text={"Espera mientras se genera el informe, este proceso puede durar dependiendo de la velocidad de tu internet."}/>


    </LayoutGeneral>
  );
};

export default Informe;