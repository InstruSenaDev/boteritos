import { Boton } from "../../components/forms/Boton";
import TableCalificarEstudiante from "../../components/tables/TableCalificarEstudiante";
import HeaderData from "../../components/tables/headerData/HeaderData";
import { Observacion } from "../../components/forms/Observacion";
import { useState } from "react";
import { ConfirmationModal } from "../../components/modales/ConfirmationModal";
import { Button } from "@tremor/react";

export const Calificar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLogros, setSelectedLogros] = useState({}); //estado para los logros seleccionados

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleGuardar = () => {
    console.log("Datos a guardar", selectedLogros);
    alert("Datos guardados exitosamente.");
  };

  return (
    <>
      <main className="flex flex-col w-full gap-y-8">
        <HeaderData />
        <TableCalificarEstudiante setSelectedLogros={setSelectedLogros} />

        <div className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
          <Observacion
            texto={"Observaciones"}
            placeholder={"Ingresa una observación"}
          ></Observacion>
          {/*<Observacion title="Generar automaticamente" observacion="el estudiante cumple con todos los logros solicitados y es aplicado" />*/}
        </div>

        <div className="w full flex justify-end gap-x-3">
          <Button
            onClick={handleGuardar}
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
