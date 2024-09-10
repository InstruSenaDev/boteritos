import { useEffect, useState } from "react";
import GraphicPie from "../../../components/graphics/GraphicPie";
import { getOneUser } from "../../../api/get";
import { useNavigate } from "react-router-dom";

const logros = [
  {
    name: "LA",
    value: 2,
  },
  {
    name: "LP",
    value: 2,
  },
  {
    name: "LN",
    value: 2,
  },
];

export const HeaderData = ({ id }) => {
  const [dataCard1, setDataCard1] = useState({});
  const [dataCard2, setDataCard2] = useState({});
  const navigate = useNavigate();

  //OBTENCION DE LOS DATOS
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await getOneUser(`sql/estudiantes/header/${id}`);
        console.log(response);
        setDataCard1(response.data.data.dataEstudiante);
        setDataCard2(response.data.data.dataResponsable);
      }
    };
    getData();
  }, [id]);

  const linkTo = (id)=>{
    if (id) {
      navigate(`datoestudiante/${id}`)
    }
    
  }

  return (
    <div className="flex gap-3 text-black font-cocogooseLight sm:flex-row flex-col">
      {/*IMAGEN DEL ESTUDIANTE*/}
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

      {/* INFORMACION */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col gap-1">
        <p className="text-paragraph text-darkBlue">
          {dataCard1.nombre ? dataCard1.nombre : "Nombre Completo"}
        </p>
        <p className="text-paragraph2">
          {dataCard1.documento ? dataCard1.documento : "Identificacion"}
        </p>
        <p className="text-paragraph2">
          {dataCard1.edad ? dataCard1.edad : "XX"} años
        </p>
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

        {/*
        <div className="flex justify-between w-full">
          <p className="text-paragraph text-darkBlue">Telefono:</p>
          <p className="text-paragraph3">XX-XXX-XXXX-XXX</p>
        </div>*/}
      </div>

      {/* ESTADISTICAS */}
      <div className="min-h-[130px] grow bg-white rounded-xl p-4 flex justify-start">
        <GraphicPie data={logros} />
      </div>

      {/*BOTON VER */}
      <div className={`min-h-[130px] grow ${id ? 'bg-darkBlue cursor-pointer' : 'bg-gray'} rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3`} onClick={ ()=> linkTo(id) }>
        <i className="fa-regular fa-eye text-5xl"></i>
        <p className="text-paragraph2">Ver</p>
      </div>
    </div>
  );
};

export default HeaderData;
