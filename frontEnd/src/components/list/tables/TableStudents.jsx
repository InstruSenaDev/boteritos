import { useEffect, useState } from "react";
import { getAllUser } from "../../../api/get.js";
import DataState from "../dataStates/DataState.jsx";
import { ModalInformes } from "../../modales/ModalInformes";
import { ConfirmationModal } from "../../modales/ConfirmationModal.jsx";

export default function TableStudents({ getId }) {
  const [dataStudents, setDataStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedInforme, setSelectedInforme] = useState(null); // Agregado

  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleOpenInformeModal = (informe) => {
    setSelectedInforme(informe);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedInforme(null); // Limpia el informe seleccionado al cerrar
  };

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      console.log(dataApi);
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-full" />
          </div>
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue bg-white hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
            <p>Acción</p>
          </div>

          {dataStudents ? (
            dataStudents.map((data, index) => (
              <div
                className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(350px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                  openAcc === index ? "open" : "close"
                }`}
                key={index}
              >
                <div className="flex gap-2 lg:gap-0 ">
                  <p className="text-darkBlue lg:hidden">No°</p>
                  <div className="acc-header w-full flex justify-between items-center ">
                    <p>
                      {data.idestudiante.toString().length == 2
                        ? data.idestudiante
                        : `0${data.idestudiante}`}
                    </p>
                    <button onClick={() => toogleRow(index)}>
                      <i className="fa-solid fa-angle-down block lg:hidden"></i>
                    </button>
                  </div>
                </div>
                <div className="acc-header flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Nombre:</p>
                  <div className="w-full flex justify-between items-center">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => getId(data.idestudiante)}
                    >{`${data.nombre} ${data.apellido}`}</p>
                  </div>
                </div>
                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                  <div className="w-full flex justify-between items-center">
                    <p>{data.diagnostico}</p>
                  </div>
                </div>

                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Calificación:</p>
                  <div className="w-full flex justify-between items-center">
                    <DataState state={data.calificado} />
                  </div>
                </div>

                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Acción:</p>
                  <div className="w-full flex justify-between items-center">
                    <div className="justify-self-center flex gap-3">
                      <i
                        className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"
                        onClick={() => handleOpenInformeModal(data.informes)}
                      ></i>
                      <i
                        className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"
                        onClick={handleOpenConfirmationModal}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>¡No hay estudiantes registrados!</p>
          )}
        </section>
      </main>

      {selectedInforme && (
        <ModalInformes
          isOpen={isOpen}
          onClose={handleCloseModal}
          txtmodal="Informes del Estudiante"
          informes={selectedInforme}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        txtQuestion={`¿Está seguro de eliminar este usuario?`}
        txtWarning={`Si presionas continuar, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
      />
    </>
  );
}
