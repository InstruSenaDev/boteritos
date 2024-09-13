import React, { useState } from "react";
import Buscador from "../search/Buscador";
import { LogrosRecibidosModal } from "../modales/LogrosRecibidosModal";
import { ConfirmationModal } from "../modales/ConfirmationModal";

export const TablaLogrosRecibidos = () => {
  const [openAcc, setOpenAcc] = useState(-1);
  const [isLogroModalOpen, setIsLogroModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedLogro, setSelectedLogro] = useState(null);
  const [modalAction, setModalAction] = useState(""); // Nuevo estado para definir si es "aceptar" o "rechazar"

  const toggleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const dataTeacher = [
    {
      idlogro: 1,
      nombrelogro:
        "Posee normas que facilitan la convivencia y demuestra solidaridad con sus compañeros",
      profesor: "Brian David Marín",
      area: "Socio - Afectiva",
      tipo: "Ser",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ipsum",
    },
    {
      idlogro: 2,
      nombrelogro:
        "Posee normas que facilitan la convivencia y demuestra solidaridad con sus compañeros",
      profesor: "Juan José Cuartas",
      area: "Socio - Afectiva",
      tipo: "Ser",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ipsum",
    },
    {
      idlogro: 3,
      nombrelogro:
        "Posee normas que facilitan la convivencia y demuestra solidaridad con sus compañeros",
      profesor: "Sebastían Rodriguez Prado",
      area: "Socio - Afectiva",
      tipo: "Hacer",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ipsum",
    },
    {
      idlogro: 4,
      nombrelogro:
        "Posee normas que facilitan la convivencia y demuestra solidaridad con sus compañeros",
      profesor: "Claudia Camila Carmona",
      area: "Socio - Afectiva",
      tipo: "Conocer",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ipsum",
    },
  ];

  const handleOpenLogroModal = (logro) => {
    setSelectedLogro(logro);
    setIsLogroModalOpen(true);
  };

  const handleCloseLogroModal = () => {
    setIsLogroModalOpen(false);
  };

  const handleOpenConfirmationModal = (action) => {
    setModalAction(action);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
        </div>

        <section className="max-h[80vh] overflow-y-scroll">
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Profesor</p>
            <p>Área</p>
            <p className="text-center">Acción</p>
          </div>
          {dataTeacher.map((data, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                openAcc === index ? "open" : "close"
              }`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {data.idlogro.toString().length == 2
                      ? data.idlogro
                      : `0${data.idlogro}`}
                  </p>
                  <button onClick={() => toggleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div
                className="flex gap-2 lg:gap-0"
                onClick={() => handleOpenLogroModal(data)}
              >
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p className="underline cursor-pointer">{`${data.nombrelogro}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Título:</p>
                <div className=" w-full flex justify-between items-center ">
                  <p>{`${data.profesor}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Área:</p>
                <div className=" w-full flex justify-between items-center ">
                  <p>{`${data.area}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0 items-center">
                <p className="text-darkBlue lg:hidden text-center">Acción:</p>
                <div className=" w-full flex justify-center items-center gap-3 ">
                  <i
                    className="fa-solid fa-circle-check text-2xl cursor-pointer text-green-700"
                    onClick={() => handleOpenConfirmationModal("Aceptar")}
                  ></i>
                  <i
                    className="fa-solid fa-circle-xmark text-2xl cursor-pointer text-redFull"
                    onClick={() => handleOpenConfirmationModal("Rechazar")}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {selectedLogro && (
        <LogrosRecibidosModal
          txtmodal="Detalle del logro"
          isOpen={isLogroModalOpen}
          onClose={handleCloseLogroModal}
          tipo={selectedLogro.tipo || "N/A"}
          nombre={selectedLogro.nombrelogro || "N/A"}
          descripcion={selectedLogro.descripcion || "No disponible"}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        txtQuestion={`¿Está seguro de ${modalAction} este logro?`}
        txtWarning={`Si presionas ${modalAction.toLowerCase()}, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
      />
    </>
  );
};
