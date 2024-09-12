import { getAllUser } from "../../../api/get.js";
import DataState from "../dataStates/DataState.jsx";
import { useEffect, useState } from "react";
import { ModalInformes } from "../../modales/ModalInformes";

export default function TableStudents({ getId }) {
  //to={`/datoestudiante/${data.idestudiante}`}
  const [dataStudents, setDataStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedInforme, setSelectedInforme] = useState(null);

  const handleOpenModal = (informes) => {
    setSelectedInforme(informes);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const dataInformes = [
    {
      informe: "informe1PrimerTrimestre.pdf",
      fecha: "20/03/2025",
    },
    {
      informe: "informe2PrimerTrimestre.pdf",
      fecha: "20/03/2025",
    },
    {
      informe: "informe3PrimerTrimestre.pdf",
      fecha: "20/03/2025",
    },
    {
      informe: "informe4PrimerTrimestre.pdf",
      fecha: "20/03/2025",
    },
  ];

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-full" />
          </div>
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
            <p>Acción</p>
          </div>
          {/*CUERPO DE LA TABLA */}

          {dataStudents ? (
            dataStudents.map((data, index) => (
              <div
                className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(300px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                  openAcc === index ? "open" : "close"
                }`}
                key={index}
              >
                {/*Aqui se hace una conversion para añadir los ceros a la izquierda*/}
                <p>
                  {data.idestudiante.toString().length == 2
                    ? data.idestudiante
                    : `0${data.idestudiante}`}
                </p>

                <div className="flex gap-2 items-center">
                  <p
                    className="underline cursor-pointer"
                    onClick={() => getId(data.idestudiante)}
                  >
                    {`${data.nombre} ${data.apellido}`}
                  </p>
                  <i className="fa-solid fa-circle w-[15px] h-[15px] text-greenFull rounded-full"></i>
                </div>

                <div className="acc-header flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                  <div className="w-full flex justify-between items-center ">
                    <p>{data.diagnostico}</p>
                  </div>
                </div>

                <div className="acc-header flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Calificación:</p>
                  <div className="w-full flex justify-between items-center ">
                    <DataState state={data.calificado} />
                  </div>
                </div>

                <div className="acc-header flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Acción:</p>
                  <div className="w-full flex justify-between items-center ">
                    <div className="justify-self-center flex gap-3">
                      <i
                        className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"
                        onClick={() => handleOpenModal(dataInformes)}
                      ></i>
                      <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
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
    </>
  );
}
