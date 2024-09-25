import React, { useState } from "react";
import { GrupoDatoElemento } from "../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../components/list/headerData/HeaderData";
import { InformeIndividual } from "../../components/informe/InformeIndividual";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { useParams } from "react-router-dom";
import { Boton } from "../../components/forms/Boton";
import { Observacion } from "../../components/forms/Observacion";


const Informe = () => {
  const [observacion, setObservacion] = useState("");
  const trimestre = JSON.parse(localStorage.getItem("trimestre"));
  const { id } = useParams();
  const idestud = id;

  const handleObservacionChange = (event) => {
    setObservacion(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      idestudiante: idestud,
      idtrimestre: trimestre,
      observacion: observacion,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/v3/logros/informe/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Encabezados de la respuesta:", response.headers);
  
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/pdf")) {
          const contentDisposition = response.headers.get("content-disposition");
          console.log("Content-Disposition:", contentDisposition);
          
          // Extraer el nombre del archivo del encabezado Content-Disposition
          let filename = "descarga.pdf"; // Nombre de archivo por defecto
          if (contentDisposition && contentDisposition.includes("filename=")) {
            const matches = contentDisposition.match(/filename="(.+)"/);
            if (matches.length > 1) {
              filename = matches[1]; // Obtener el nombre del archivo
            }
          }
  
          // Descargar el archivo
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
        />
      </div>

      <div className="mt-7 flex justify-center">
        <Boton text={"Confirmar"} type={"blue"} onClick={handleSubmit} />
      </div>
    </LayoutGeneral>
  );
};

export default Informe;