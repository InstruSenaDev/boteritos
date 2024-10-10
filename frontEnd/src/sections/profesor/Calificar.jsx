import TableCalificarEstudiante from "../../components/list/tables/TableCalificarEstudiante";
import { useState, useEffect } from "react";
import { ConfirmationModal } from "../../components/modales/ConfirmationModal";
import { Button } from "@tremor/react";
import { enviarLogros, guardarLogros } from "../../api/put";

export const Calificar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [selectedLogros, setSelectedLogros] = useState({}); //estado para los logros seleccionados
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para verificar si ya se envió la calificación

  const handleSaveModalOpen = () => {
    setIsSaveOpen(true)
  }

  const handleSaveModalClose = () => {
    setIsSaveOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  //GUARDAR
  const handleSave = async () => {
    setIsSaveOpen(false);
    const data = await guardarLogros(selectedLogros);
    console.log(data);
  
  };

  //ENVIAR
  const handleSubmit = async () => {
    setIsOpen(false);

    const data = await enviarLogros(selectedLogros);
    
    if(data.status != 200){
      console.error("Error al enviar los logros:", response.error);
    }

    setIsSubmitted(true); // Actualizar el estado para indicar que ya se envió
  };

  return (
    <>
      <main className="flex flex-col w-full gap-y-8">
        <TableCalificarEstudiante setSelectedLogros={setSelectedLogros} />

        <div className="w full flex justify-end gap-x-3">
          <Button
            onClick={handleSaveModalOpen}
            className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button bg-white text-darkBlue hover:bg-darkBlue hover:text-white"
          >
            Guardar
          </Button>

          {!isSubmitted && ( // Ocultamos el botón de enviar si ya se ha enviado
            <Button
              onClick={handleOpenModal}
              className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button text-white"
            >
              Enviar
            </Button>
          )}
        </div>

        <ConfirmationModal
          onConfirm={handleSubmit}
          isOpen={isOpen}
          onClose={handleCloseModal}
          txtQuestion={"¿Está seguro de enviarlo?"}
          txtWarning={
            "Una vez enviada, no podrás modificar esta calificación. Por favor, asegúrate de que toda la información es correcta antes de continuar."
          }
        />

        <ConfirmationModal 
        onConfirm={handleSave}
        isOpen={isSaveOpen}
        onClose={handleSaveModalClose}
        txtQuestion={"¿Guardar resultados?"}
        txtWarning={"Tranquilo, los resultados guardados no serán enviados al administrador, es solo para que lleves tus calificaciones con mayor seguridad a lo largo del trimestre."}
        />
      </main>
    </>
  );
};
