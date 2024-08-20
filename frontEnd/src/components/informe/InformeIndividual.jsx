import React, { useState, useEffect } from 'react';

// Hook para detectar el tamaño de la pantalla
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const InformeIndividual = ({ tituloArea, data, children }) => {
  const size = useWindowSize();
console.log("Ancho de la pantalla:", size.width);
  return (
    size.width <= 800 ? (
        

      <div className="w-full divide-y-2 divide-placeholderBlue bg-white rounded-xl flex flex-col px-10 py-5 ">
        <p className="text-darkBlue font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
        {data.map((dataKey) => (
          <div key={dataKey.id} className="w-full py-5 gap-y-2 flex flex-col justify-between">
            <p className="font-cocogooseLight text-paragraph">{dataKey.logroTexto}</p>
            <div className="text-darkBlue flex font-cocogooseSemiLight text-subTitle max-w-[250px] w-full justify-between">
              <p>L.A</p>
              <p>L.P</p>
              <p>L.N</p>
            </div>
            <div className="flex leading-none font-cocogooseSemiLight text-subTitle text-orange max-w-[250px] w-full justify-between px-[10px]">
              <p>X</p>
              <p>X</p>
              <p>X</p>
            </div>
          </div>
        ))}
        <div>{children}</div>
      </div>
    ) : (
      <div className="w-full divide-y-2 divide-placeholderBlue bg-white rounded-xl flex flex-col px-10 py-5">
        <div className="flex justify-between text-darkBlue py-5">
          <p className="font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
          <div className="flex font-cocogooseSemiLight text-title2 max-w-[250px] w-full justify-between">
            <p>L.A</p>
            <p>L.P</p>
            <p>L.N</p>
          </div>
        </div>
        {data.map((dataKey) => (
          <div key={dataKey.id} className=" w-full py-5 flex justify-between items-center">
            <p className="font-cocogooseLight text-paragraph">{dataKey.logroTexto}</p>
            <div className="leading-none flex font-cocogooseSemiLight text-title2 text-orange max-w-[250px] w-full justify-between px-[10px]">
              <p>X</p>
              <p>X</p>
              <p>X</p>
            </div>
          </div>
        ))}
        <div>{children}</div>
      </div>
    )
  );
};