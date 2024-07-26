import DataState from "./dataStates/DataState";
import { objStudentsTeacher } from "../../helper/objects/studentsTeacher";
import Buscador from "../search/Buscador";
import { useState } from "react";
import "../../../input.css"


export default function TableListStudents() {

  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) => {
    openAcc != index ? setOpenAcc(index) : setOpenAcc(-1);
  }

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*buscador*/}
        {/*<Buscador/>*/}
        <header className="flex justify-center sm:flex sm:justify-start">
          <Buscador />
        </header>

        <section className="max-h-[80vh] overflow-y-scroll ">
          {/* HEADER TABLA */}
          <div className="hidden sticky top-0 bg-white lg:grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p className="justify-self-center">Calificación</p>
            <p className="justify-self-center">Area</p>
          </div>

          {/*CUERPO DE LA TABLA */}
          {objStudentsTeacher.map((data, index) => (
            <div className={`acc-item grid grid-cols-1  lg:grid lg:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc == index ? "open" : "close"}`} key={index}>
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°:</p>
                <div className="acc-header w-full flex justify-between items-center">
                  <p>
                    {(index + 1).toString().length == 2
                      ? index + 1
                      : `0${index + 1}`}
                  </p>
                  <button onClick={() => toogleRow(index)}><i className="fa-solid fa-angle-down block lg:hidden"></i></button>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className=" flex justify-self-center acc-header">
                  <p className="underline">{`${data.name} ${data.lastname}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                <div className="flex justify-self-center">
                  <p>{`${data.diagnostic}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body lg:justify-center">
                <p className="text-darkBlue lg:hidden">Fecha:</p>
                <div className="flex justify-self-center">
                  <DataState state={data.qualify} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body lg:justify-center">
                <p className="text-darkBlue lg:hidden">Area:</p>
                <div className="flex justify-self-center">
                  <p className="justify-self-center">{`${data.area}`}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
