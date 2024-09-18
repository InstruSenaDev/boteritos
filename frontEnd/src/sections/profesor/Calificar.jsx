import TableCalificarEstudiante from "../../components/list/tables/TableCalificarEstudiante";
import HeaderData from "../../components/list/headerData/HeaderData";
import { Observacion } from "../../components/forms/Observacion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ConfirmationModal } from "../../components/modales/ConfirmationModal";
import { Button } from "@tremor/react";
import { jwtDecode } from "jwt-decode";

export const Calificar = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLogros, setSelectedLogros] = useState({}); //estado para los logros seleccionados

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    const arrayLogros = {
      logros: Object.values(selectedLogros)
    };
    console.log("Datos a guardar:", JSON.stringify(arrayLogros));

    try {
      const response = await fetch("http://localhost:8000/api/v3/logros/calificar/guardar/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrayLogros),
      });

      if (response.ok) {
        console.log("Logros guardados exitosamente");
        // Puedes realizar acciones adicionales aquí, como actualizar el estado o mostrar una notificación.
      } else {
        console.error("Error al guardar los logros:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  

  const handleSubmit = async () => {
    const dataToSend = {
      logros: selectedLogros,
    };

    console.log("Datos a guardar:", dataToSend);
    setIsOpen(false); 

    
    const arrayLogros = {
      logros: Object.values(selectedLogros)
    };
    console.log("arrayyyy a enviar:", arrayLogros); 
    console.log("Datos enviados al servidor:", JSON.stringify(arrayLogros));

      try {
        const response = await fetch("http://localhost:8000/api/v3/logros/calificar/enviar/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arrayLogros), 
        });
    
        if (response.ok) {
          console.log("Logros enviados exitosamente");

        } else {
          console.error("Error al enviar los logros:", response.statusText);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    
  
  };

  return (
    <>
      <main className="flex flex-col w-full gap-y-8">
        <HeaderData />
        <TableCalificarEstudiante setSelectedLogros={setSelectedLogros} />

        <div className="w full flex justify-end gap-x-3">
          <Button
            onClick={handleSave}
            className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button bg-white text-darkBlue hover:bg-darkBlue hover:text-white"
          >
            Guardar
          </Button>
          <Button
            onClick={handleOpenModal}
            className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button text-white"
          >
            Enviar
          </Button>
        </div>
        <ConfirmationModal
        onConfirm={handleSubmit}
          isOpen={isOpen}
          onClose={handleCloseModal}
          txtQuestion={"¿Está seguro de enviarlo?"}
          txtWarning={
            "Una vez enviada, no podrás modificar esta calificación. Por favor,  asegúrate de que toda la información es correcta antes de continuar."
          }
        ></ConfirmationModal>
      </main>
    </>
  );
};
