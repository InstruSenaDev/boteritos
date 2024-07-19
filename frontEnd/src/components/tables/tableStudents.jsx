import DataState from "./dataStates/DataState";
import { objStudents } from "../../helper/objects/students";
import { useState } from "react";
import "../../../input.css"

export default function TableStudents() {

  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) =>{
    openAcc != index ? setOpenAcc(index) : setOpenAcc(-1);
  }

  console.log(openAcc);


  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="" />
          </div>
        </header>

        {/* grid-cols-[200px_minmax(900px,_1fr)_100px] 
            grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px]
            50px minmax(300px, 1fr) minmax(250px, 1fr) repeat(2, minmax(100px, 1fr)) 60px;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        */}
        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="hidden sticky top-0 bg-white sm:flex sm:justify-between lg:grid grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Datos</p>
            <p>Calificación</p>
            <p className="justify-self-center">Acción</p>
          </div>
          {/*CUERPO DE LA TABLA */}

          {objStudents.map((data, index) => (
            <div className={`acc-item grid grid-cols-1 lg:grid-cols-[50px_minmax(300px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))_60px] items-center lg:gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc == index ? "open": "close"}`} key={index} >
              
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°:</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>{(index + 1).toString().length == 2 ? index + 1 : `0${index + 1}`}</p>
                  <button onClick={() => toogleRow(index) }><i className="fa-solid fa-angle-down block lg:hidden"></i></button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className=" flex justify-self-center acc-header">
                  <p className="underline">{`${data.nombre}  ${data.apellido}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Diagnóstico:</p>
                <div className="flex justify-self-center">
                  <p>{data.diagnosticoMental}</p>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Datos:</p>
                <div className="flex justify-self-center">
                  <DataState state={data.datos} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Calificación:</p>
                <div className="flex justify-self-center">
                  <DataState state={data.calificado} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body lg:justify-center">
                <p className="text-darkBlue lg:hidden">Acción:</p>
                <div className="justify-self-center flex gap-3">
                  <i className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"></i>
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"></i>
                </div>
              </div>
            </div>
          ))}
        </section>

      </main>
    </>
  );
}
