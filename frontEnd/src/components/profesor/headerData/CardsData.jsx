import React, { Children, useEffect, useState } from "react";
import GraphicPie from "../../graphics/GraphicPie";

/**
      <div className="min-h-[130px] grow bg-white rounded-xl max-w-[100px] p-4">
        <img
          src={
            dataCard1.imagen
              ? dataCard1.imagen
              : `../../../../public/img/studentDefault.png`
          }
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        <p className="text-paragraph text-darkBlue">
          {dataCard1.nombre ? dataCard1.nombre : "Nombre Completo"}
        </p>
        <p className="text-paragraph2">
          {dataCard1.documento ? dataCard1.documento : "Identificacion"}
        </p>
        <p className="text-paragraph2">
          {dataCard1.edad ? dataCard1.edad : "XX"} años
        </p>
      </div>

      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">
            {dataCard2[0] ? `${dataCard2[0].tipoparentesco}:` : "Responsable:"}
          </p>
          <p className="text-paragraph3">{dataCard2[0] ? `${dataCard2[0].nombreresponsable} ${dataCard2[0].apellidoresponsable}` : "--------------"}</p>
        </div>

        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">
            {dataCard2[1] ? `${dataCard2[1].tipoparentesco}:` : "Responsable:"}
          </p>
          <p className="text-paragraph3">{dataCard2[1] ? `${dataCard2[1].nombreresponsable} ${dataCard2[1].apellidoresponsable}` : "--------------"}</p>
        </div>

      </div>

      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex justify-start">
        <GraphicPie data={logros} />
      </div>

      <div className={`min-h-[130px] grow ${id ? 'bg-darkBlue cursor-pointer' : 'bg-gray'} rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3`} onClick={ ()=> linkTo(id) }>
        <i className="fa-regular fa-eye text-5xl"></i>
        <p className="text-paragraph2">Ver</p>
      </div>
    </div>
 */

const CardsData = ({ dataCard1, dataCard2, dataGraphic, linkTo, children }) => {
  let isObj1 = Object.keys(dataCard1).length != 0;

  return (
    <div className="flex gap-3 text-black font-cocogooseLight sm:flex-row flex-col">
      {/*IMAGEN DEL ESTUDIANTE*/}
      <div className="min-h-[130px] grow bg-white rounded-xl max-w-[100px] p-4">
        <img
          src={
            isObj1
              ? dataCard1.imagen
              : `../../../../public/img/studentDefault.png`
          }
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* INFORMACION */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        <p className="text-paragraph text-darkBlue">
          {isObj1 ? dataCard1.nombre : "Nombre Completo"}
        </p>
        <p className="text-paragraph2">
          {isObj1 ? dataCard1.documento : "Identificacion"}
        </p>
        <p className="text-paragraph2">{isObj1 ? dataCard1.edad : "XX"} años</p>
      </div>

      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        {Object.keys(dataCard2).length != 0 ? (
          dataCard2.map((values, index) => (
            <div className="flex justify-between w-full" key={index}>
              <p className="text-paragraph text-darkBlue">{values.name}:</p>
              <p className="text-paragraph3">{values.value}</p>
            </div>
          ))
        ) : (
          <>
            <div className="flex justify-between w-full">
              <p className="text-paragraph text-darkBlue">{"Responsable:"}</p>
              <p className="text-paragraph3">{"--------------"}</p>
            </div>

            <div className="flex justify-between w-full">
              <p className="text-paragraph text-darkBlue">{"Responsable:"}</p>
              <p className="text-paragraph3">{"--------------"}</p>
            </div>
          </>
        )}
      </div>

      {/* ESTADISTICAS */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex justify-start">
        <GraphicPie data={dataGraphic} />
      </div>

      {/*BOTON VER */}
      {children}
    </div>
  );
};

export default CardsData;
