import { Button, Dialog, DialogPanel } from "@tremor/react";
import React from "react";
import { downloadInforme } from "../../api/get";

export const ModalInformes = ({ isOpen, onClose, txtmodal, informes, onDownloadStart }) => {
  
  const downloadInform = async (idinforme) =>{
    if (onDownloadStart) onDownloadStart(true); // Muestra el modal de carga

    try {
      console.log(idinforme);
      const data = await downloadInforme(`informe/estudiante/one/${idinforme}/`);
      //VALIDACIONES Y CARGANDO
      console.log("Descarga completada", data);

      // Llama al callback para indicar que la descarga ha terminado
      onDownloadStart(false); // cerrar el modal de carga
    } catch (error) {
      console.error("Error al descargar el informe:", error);
      // por si algo lo cierro si hay error, por si algo
      onDownloadStart(false); 
    }
   
  }

  return (
    <Dialog open={isOpen} onClose={onClose} static={true} >
      <DialogPanel className="relative flex flex-col gap-4 items-start py-6 px-4 w-auto max-w-screen-md mx-auto bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full text-gray bg-white hover:bg-slate-200 hover:text-slate-500"
        >
          <i className="fa-solid fa-x"></i>
        </button>
        <div className="w-full text-title font-cocogooseRegular text-darkBlue text-start mb-4">
          <h1>{txtmodal}</h1>
        </div>
        {/* Header Modal */}
        <div className="w-full grid grid-cols-[minmax(300px,_1fr)_repeat(2,minmax(200px,_1fr))] gap-4 text-subTitle2 font-cocogooseSemiLight text-darkBlue mb-2">
          <p>Informes</p>
          <p>Fecha</p>
          <p>Descargar</p>
        </div>
        {/* BODY */}
        <div className="w-full grid grid-cols-[minmax(300px,_1fr)_repeat(2,minmax(200px,_1fr))] gap-4 text-paragraph font-cocogooseLight text-black border-t-2 border-placeholderBlue pt-4">
          {informes && informes.length > 0 ? (
            informes.map((informe, index) => (
              <React.Fragment key={index}>
                <p>{informe.informe}</p>
                <p>{informe.fecha}</p>
                <Button className="rounded-2xl transition ease-in-out" onClick={() => downloadInform(informe.idinforme)}>
                  <div className="flex gap-2 w-fit items-center">
                    <i className="fa-regular fa-eye"></i>
                    <span className="hidden sm:block">Descargar</span>
                  </div>
                </Button>
              </React.Fragment>
            ))
          ) : (
            <p className="col-span-full text-center">No hay informes disponibles.</p>
          )}
        </div>
      </DialogPanel>
    </Dialog>
  );
};
