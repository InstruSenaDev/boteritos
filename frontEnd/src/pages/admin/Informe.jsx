import React, { useState, useEffect } from "react";
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
import { getAllAreas } from "../../api/get";

const Informe = () => {
  const [observacion, setObservacion] = useState("");
  const trimestre = JSON.parse(localStorage.getItem("trimestre"));
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el modal de carga
  const [isInformeCreado, setIsInformeCreado] = useState(false); // Estado para saber si el informe ya ha sido creado
  const { id } = useParams();
  const idestud = id;

  // Estado para almacenar los datos de todas las áreas
  const [areasData, setAreasData] = useState([]);

  // Arreglo con los títulos de las áreas en el orden correcto
  const titulosAreas = [
    "Socio - Afectiva",
    "Vida Diaria",
    "Teatro",
    "Danza",
    "Música",
    "Pintura",
  ];

  // Obtener datos de las 6 áreas
  useEffect(() => {
    const fetchAllAreas = async () => {
      let allAreasData = [];
      for (let idArea = 1; idArea <= 6; idArea++) {
        try {
          const response = await getAllAreas(`list/${trimestre}/${idArea}/${idestud}/`);
          const calificaciones = Array.isArray(response.data.data.calificaciones) ? response.data.data.calificaciones : [];
  
          // Si el informe ya ha sido creado, marcarlo y cargar la observación
          if (response.status === 208) {
            setIsInformeCreado(true);
            // Cargar la observación si está disponible en la respuesta
            if (response.data.data.observacion) {
              setObservacion(response.data.data.observacion);
            }
          }
          
          // Añadir la data del área al array total
          allAreasData.push({ idArea, calificaciones });
        } catch (error) {
          console.error(`Error al obtener los datos del área ${idArea}:`, error);
          // Asegurar que si hay error, se incluya el área con calificaciones vacías
          allAreasData.push({ idArea, calificaciones: [] });
        }
      }
      setAreasData(allAreasData);
    };
  
    fetchAllAreas();
  }, [trimestre, idestud]);

  const handleObservacionChange = (event) => {
    const { value } = event.target;
    setObservacion(value);

    if (errors.observacion) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: undefined, // Elimina el error de observación
      }));
    }
  };

  const openModal = () => {
    const error = caseAdmin("observacion", observacion);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: error,
      }));
      return;
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
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
        if (contentType && contentType.includes("application/pdf")) {
          const textfile = response.headers.get("textfile");
          let filename = textfile || "informe.pdf";
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
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
      setIsLoading(false);
    }
  };

  return (
    <LayoutGeneral title="InformeObservacion" titleHeader="Informe">
      <div className="w-full space-y-7">
        <HeaderData id={id} urlApi={"sql/estudiantes/header/"} typeLink={"back"} />
        <GrupoDatoElemento />
        <div className="w-full h-0 border-darkBlue border-2"></div>

        {/* Mapear las áreas para renderizar InformeIndividual */}
        {areasData.map(({ idArea, calificaciones }, index) => (
          <InformeIndividual
            key={idArea}
            tituloArea={titulosAreas[index]}  // Obtener el título del área según el índice
            idArea={idArea}
            idtrim={trimestre}
            idestud={idestud}
            data={calificaciones}  // Pasar las calificaciones obtenidas
          />
        ))}

        <Observacion
          texto={"Observación"}
          placeholder={"Ingrese la observación del estudiante"}
          name={"observacion"}
          onChange={handleObservacionChange}
          value={observacion}
          error={errors.observacion}
          disabled={isInformeCreado}  // Deshabilitar si el informe ya está creado
        />
      </div>

      {/* Solo mostrar el botón si el informe no ha sido creado */}
      {!isInformeCreado && (
        <div className="mt-7 flex justify-center">
          <Boton text={"Enviar y Descargar"} type={"blue"} onClick={openModal} />
        </div>
      )}

      <ConfirmationModal
        txtQuestion="¿Está seguro de crear el informe?"
        txtWarning="Al crear el informe, no habrá posibilidad de revertir esta opción..."
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={async () => {
          await handleSubmit();
          closeModal();
        }}
      />

      <LoadingModal isOpen={isLoading} onClose={() => {}} text={"Espera mientras se genera el informe..."} />
    </LayoutGeneral>
  );
};

export default Informe;
