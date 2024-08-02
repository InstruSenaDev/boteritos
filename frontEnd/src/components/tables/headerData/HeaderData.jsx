import { useEffect } from "react";
import GraphicPie from "../../../components/graphics/GraphicPie"

const HeaderData = () => {
  const logros = [
    {
      name: 'LA',
      value: 2,
    },
    {
      name: 'LP',
      value: 2,
    },
    {
      name: 'LN',
      value: 2,
    }
  ];


  return (
    <div className="flex gap-3 text-black font-cocogooseLight sm:flex-row flex-col">
      {/*IMAGEN DEL ESTUDIANTE*/}
      <div className="min-h-[130px] grow bg-white rounded-xl max-w-[100px] p-4">
        <img
          src="../../../../public/img/studentDefault.png"
          alt=""
          className="w-full object-cover"
        />
      </div>

      {/* INFORMACION */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col gap-1">
        <p className="text-paragraph text-darkBlue">Nombre del estudiante</p>
        <p className="text-paragraph2">Identificacion</p>
        <p className="text-paragraph2">XX años</p>
        {/* PARA LOS ICONOS, SE HARÁ UN COMPONENTE */}
        <div className="flex gap-3">
          <div className="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i className="fa-solid fa-hospital text-[8px] text-gray"></i>
          </div>
          <div className="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i className="fa-solid fa-user-group text-[8px] text-gray"></i>
          </div>
          <div className="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i className="fa-solid fa-address-card text-[8px] text-gray"></i>
          </div>
          <div className="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i className="fa-solid fa-phone text-[8px] text-gray"></i>
          </div>
        </div>
      </div>

      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">Madre:</p>
          <p className="text-paragraph3">-------------------</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">Padre:</p>
          <p className="text-paragraph3">-------------------</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">Telefono:</p>
          <p className="text-paragraph3">XX-XXX-XXXX-XXX</p>
        </div>
      </div>

      {/* ESTADISTICAS */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex justify-start">
        <GraphicPie data={logros} />
      </div>

      {/*BOTON VER */}
      <div className="min-h-[130px] grow bg-gray rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3">
        <i className="fa-regular fa-eye text-5xl"></i>
        <p className="text-paragraph2">Ver</p>
      </div>
    </div>
  );
};

export default HeaderData;
