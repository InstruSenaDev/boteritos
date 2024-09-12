import React from "react";

export const GrupoDatos = ({ titulo, update, children }) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl flex flex-col gap-y-5">
      <div className="flex justify-between text-darkBlue">
        <p className="font-cocogooseSemiLight text-subTitle">{titulo}</p>
        <button onClick={update}>
          <p className="font-cocogooseSemiLight text-subTitle2 underline">
            Editar
          </p>
        </button>
      </div>
      <div className="flex flex-col xl:flex-row px-5 justify-between gap-y-3">
          {children}
      </div>
    </div>
  );
};

/**
         <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3" key={1}>
         <div>
           <p className="font-cocogooseLight text-paragraph text-darkBlue">
           </p>
           <p className="font-cocogooseLight text-paragraph2 flex-1">
           </p>
         </div>
       </div>
 */


/**
   <div
    key={dataKey.idDataPersonal}
    className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
  >
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Nombre Completo:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.nombreCompleto}
      </p>
    </div>
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Tipo de Documento:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.tipoDeDocumento}
      </p>
    </div>
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Número de Documento:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.numeroDeDocumento}
      </p>
    </div>
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Dirección:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.direccion}
      </p>
    </div>
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Correo:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.correo}
      </p>
    </div>
    <div>
      <p className="font-cocogooseLight text-paragraph text-darkBlue">
        Comuna:
      </p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">
        {dataKey.comuna}
      </p>
    </div>
  </div>
 */
