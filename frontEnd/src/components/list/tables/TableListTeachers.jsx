import React, { useState, useEffect } from "react";
import Buscador from "../../search/Buscador";
import { ConfirmationModal } from "../../modales/ConfirmationModal";
import { getAllTeachers } from "../../../api/get";

const TableListTeachers = ({ getId }) => {  // Desestructurar getId de los props
  const [openAcc, setOpenAcc] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [dataTeacher, setDataTeacher] = useState([]); // Estado para almacenar los profesores.

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  // useEffect para cargar los profesores
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const dataApi = await getAllTeachers("profesor/tabla");
        console.log(dataApi)
        setDataTeacher(dataApi.data.data || []);
      }
      catch (error) {
        console.error("Error al obtener los profesores:", error);
      };
    };
    fetchTeachers(); // Ejecuta la función
  }, []);

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
        </div>

        <section className="max-h[80vh] overflow-y-scroll">
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Título</p>
            <p>Área</p>
            <p>Acción</p>
          </div>
          {dataTeacher.map((data, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"}`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center">
                  <p>{data.idprofesor.toString().length === 2 ? data.idprofesor : `0${data.idprofesor}`}</p>
                  <button onClick={() => toggleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header w-full flex justify-between items-center cursor-pointer underline" onClick={() => getId(data.idprofesor)}>
                  <p>{`${data.nombre}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Título:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{`${data.titulo}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Área:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{`${data.area}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0 items-end">
                <p className="text-darkBlue lg:hidden">Acción:</p>
                <div className="w-full flex items-center">
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull" onClick={handleOpen}></i>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        txtQuestion={`¿Está seguro de eliminar este usuario?`}
        txtWarning={`Si presionas continuar, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
      />
    </>
  );
};

export default TableListTeachers;
