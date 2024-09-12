import React, { useState } from "react";
import Buscador from "../../search/Buscador";

const TableListTeachers = (getId) => {
  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const dataTeacher = [
    {
      idprofesor: 1,
      nombre: "JUAN ALBERTO",
      titulo: "Artista",
      area: "Artes",
    },
    {
      idprofesor: 1,
      nombre: "JUAN ALBERTO",
      titulo: "Artista",
      area: "Artes",
    },
    {
      idprofesor: 1,
      nombre: "JUAN ALBERTO",
      titulo: "Artista",
      area: "Artes",
    },
    {
      idprofesor: 1,
      nombre: "JUAN ALBERTO",
      titulo: "Artista",
      area: "Artes",
    },
    {
      idprofesor: 1,
      nombre: "JUAN ALBERTO",
      titulo: "Artista",
      area: "Artes",
    },
  ];

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
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                openAcc === index ? "open" : "close"
              }`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {data.idprofesor.toString().length == 2
                      ? data.idprofesor
                      : `0${data.idprofesor}`}
                  </p>
                  <button onClick={() => toogleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p className="underline cursor-pointer">{`${data.nombre}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Título:</p>
                <div className=" w-full flex justify-between items-center ">
                  <p
                    className="unerline cursor-pointer"
                    onClick={() => getId(data.idprofesor)}
                  >{`${data.titulo}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Área:</p>
                <div className=" w-full flex justify-between items-center ">
                  <p>{`${data.area}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0 items-center">
                <p className="text-darkBlue lg:hidden">Acción:</p>
                <div className=" w-full flex justify-between items-center ">
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default TableListTeachers;
