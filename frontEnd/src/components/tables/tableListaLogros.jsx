import DataState from "./dataStates/DataState";
import { ObjLogrosCreados } from "../../helper/objects/ListaLogros";
import Buscador from "../search/Buscador";
import "../../components/tables/input.css";
import { useState } from "react";

export default function TableListaLogros() {
  const[openAcc, setOpenAcc] =useState(false);
  return (
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        {/*Buscador*/}
        <Buscador />

        <section className="max-h-[80vh] overflow-y-scroll">
          {/*HEADER TABLA*/}
          <div className="sticky hidden top-0 bg-white lg:grid grid-cols-[50px_minmax(550px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(250px,1fr)] gap-x-8 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p>Fecha</p>
            <p>Estado</p>
            <p className="sm:justify-self-center">Tipo</p>
          </div>

          {/*CUERPO DE LA TABLA */}
          {ObjLogrosCreados.map((data, index) => (
            <div className="acc-item close grid grid-cols-1 lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(250px,1fr)] items-center gap-x-8 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue">
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full">
                  <p>
                    {(index + 1).toString().length == 2
                      ? index + 1
                      : `0${index + 1}`}
                  </p>
                  <button><i class="fa-solid fa-angle-down block lg:hidden"></i></button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Logro:</p>
                <div className="acc-header w-full">
                  <p>{`${data.achievement}`}</p>{" "}
                </div>
              </div>

            <div className="flex gap-2 lg:gap-0 acc-body">
              <p className="text-darkBlue lg:hidden">Fecha:</p>
                <div className="">
                  <p>{`${data.date}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
              <p className="text-darkBlue lg:hidden">Estado:</p>
                <div className="">
                  <DataState state={data.state} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
              <p className="text-darkBlue lg:hidden">Tipo:</p>
                <div className=" sm:justify-self-center">
                  <p>{`${data.type}`}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
