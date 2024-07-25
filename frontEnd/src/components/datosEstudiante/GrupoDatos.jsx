import React from 'react';

export const GrupoDatos = ({ titulo, children }) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl flex flex-col gap-y-5">
      <div className="flex justify-between text-darkBlue">
        <p className="font-cocogooseSemiLight text-subTitle">{titulo}</p>
        <p className="font-cocogooseSemiLight text-subTitle2 underline">Editar</p>
      </div>
      <div className="flex flex-col xl:flex-row px-5 justify-between gap-y-3">
        <div className="flex flex-col w-full gap-y-3">
          {children.columnaD}
        </div>
        <div className="flex flex-col w-full gap-y-3">
          {children.columnaI}
        </div>
      </div>
    </div>
  );
};