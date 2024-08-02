import DataState from "./dataStates/DataState";
import { ObjLogrosCreados } from "../../helper/objects/ListaLogros";
import Buscador from "../search/Buscador";
import "../../../input.css";
import { useState } from "react";
import React from "react";
import { Modal } from "../modales/Modal";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { dataDoc } from "../../helper/objects/dropdownArray";

export default function TableListaLogros() {
  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) => {
    openAcc != index ? setOpenAcc(index) : setOpenAcc(-1);
  };

  console.log(openAcc);
  return (
    <>
      <main className="bg-white rounded-xl py-7 px-8 w-full overflow-y-hidden">
        {/*Buscador*/}
        <div className="flex justify-between w-full pb-5">
          <Buscador />
          <Modal
            txtboton="Abreme"
            txtmodal="Agregar datos medicos"
            txtbutton2="AGREGAR"
          >
            <div className="grid grid-cols-2 gap-x-[30px] gap-y-[20px]">
              <Input
                texto="Nombre completo"
                placeholder="Ingresa tu documento"
                name="nombre"
                tipo="text"
              />
              <Dropdown
                name={"documento"}
                label={"Tipo de documento"}
                data={dataDoc}
                onChange={(value) => handleDropdownChange("documento", value)}
              />

              <Input
                texto="Número de documento"
                placeholder="Ingresa tu documento"
                name="ndocumento"
                tipo="text"
              />
              <Input
                texto="Teléfono"
                placeholder="Ingresa tu documento"
                name="telefono"
                tipo="text"
              />
              <Input
                texto="Otro teléfono"
                placeholder="Ingresa tu documento"
                name="telefonodos"
                tipo="text"
              />

              <Input
                texto="Dirección"
                placeholder="Ingresa tu documento"
                name="direccion"
                tipo="text"
              />
              <Input
                texto="Empresa"
                placeholder="Ingresa tu documento"
                name="ndocumento"
                tipo="text"
              />
              <Input
                texto="Tipo parentezco"
                placeholder="Ingresa tu documento"
                name="ndocumento"
                tipo="text"
              />
            </div>
          </Modal>
        </div>

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
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(50px,_1fr)_minmax(150px,_1fr)_minmax(250px,1fr)] items-center gap-x-8 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                openAcc == index ? "open" : "close"
              }`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {(index + 1).toString().length == 2
                      ? index + 1
                      : `0${index + 1}`}
                  </p>
                  <button onClick={() => toogleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Logro:</p>
                <div className="acc-header w-full">
                  <p>{`${data.achievement}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Fecha:</p>
                <div className=" flex justify-self-center">
                  <p>{`${data.date}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body ">
                <p className="text-darkBlue lg:hidden">Estado:</p>
                <div className="">
                  <DataState state={data.state} />
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body sm:justify-self-center">
                <p className="text-darkBlue lg:hidden">Tipo:</p>
                <div>
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
