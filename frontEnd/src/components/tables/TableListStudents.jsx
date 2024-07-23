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
        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="" />
          </div>
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 bg-white sm:grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
            <p className="justify-self-center">Area</p>
          </div>

          {/*CUERPO DE LA TABLA */}
          {objStudentsTeacher.map((data, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
              <p>
                {(index + 1).toString().length == 2
                  ? index + 1
                  : `0${index + 1}`}
              </p>
              <p className="underline">{`${data.name} ${data.lastname}`}</p>
              <p>{`${data.diagnostic}`}</p>
              <DataState state={data.qualify} />
              <p>{`${data.area}`}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
