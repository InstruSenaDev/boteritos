import React, { useState, useEffect } from 'react';
import { getAllAreas } from '../../api/get';

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

export const InformeIndividual = ({ idArea, idtrim, idestud, tituloArea, children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataApi = await getAllAreas(`list/${idtrim}/${idArea}/${idestud}/`);
        console.log(dataApi);

        
        const calificaciones = dataApi?.data?.data || [];

        // Asegúrate de que calificaciones es un array antes de asignarlo
        setData(Array.isArray(calificaciones) ? calificaciones : []);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
        // En caso de error, asegúrate de que `data` sigue siendo un array vacío
        setData([]);
      }
    };
    fetchData();
  }, [idArea, idtrim, idestud]);

  const size = useWindowSize();

  const renderXs = (resultado) => {
    const xs = ["", "", ""]; // Array con posiciones vacías para las 3 "X"
    if (resultado === "0") {
      xs[2] = "X"; // LN
    } else if (resultado === "1") {
      xs[0] = "X"; // LA
    } else if (resultado === "2") {
      xs[1] = "X"; // LP
    }
    return xs;
  };

  return (
    size.width <= 800 ? (
      <div className="w-full divide-y-2 divide-placeholderBlue bg-white rounded-xl flex flex-col px-10 py-5">
        <p className="text-darkBlue font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
        {data.length === 0 ? (
          <p className="font-cocogooseLight text-paragraph text-gray text-center py-5">Área no calificada aún</p>
        ) : (
          data.map((dataItem) => {
            const xs = renderXs(dataItem.resultado);
            return (
              <div key={dataItem.idlogro} className="w-full py-5 gap-y-2 flex flex-col justify-between">
                <p className="font-cocogooseLight text-paragraph2">{dataItem.logro}</p>
                <div className="text-darkBlue flex font-cocogooseSemiLight text-subTitle max-w-[250px] w-full justify-between">
                  <p>L.A</p>
                  <p>L.P</p>
                  <p>L.N</p>
                </div>
                <div className="flex leading-none font-cocogooseSemiLight text-subTitle text-orange max-w-[250px] w-full justify-between px-[10px]">
                  <p>{xs[0]}</p> {/* L.A */}
                  <p>{xs[1]}</p> {/* L.P */}
                  <p>{xs[2]}</p> {/* L.N */}
                </div>
              </div>
            );
          })
        )}
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
        {data.length === 0 ? (
          <p className="font-cocogooseLight text-paragraph text-gray text-center py-5">Área no calificada aún</p>
        ) : (
          data.map((dataItem) => {
            const xs = renderXs(dataItem.resultado);
            return (
              <div key={dataItem.idlogro} className=" w-full py-5 flex justify-between items-center">
                <p className="font-cocogooseLight text-paragraph2 pr-2">{dataItem.logro}</p>
                <div className="leading-none flex font-cocogooseSemiLight text-title2 text-orange max-w-[250px] w-full justify-between px-[10px]">
                  <p>{xs[0]}</p> {/* L.A */}
                  <p>{xs[1]}</p> {/* L.P */}
                  <p>{xs[2]}</p> {/* L.N */}
                </div>
              </div>
            );
          })
        )}
      </div>
    )
  );
};
