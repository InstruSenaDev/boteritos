import { useEffect, useState } from "react";
import GraphicPie from "../../../components/graphics/GraphicPie";
import { getOneUser } from "../../../api/get";
import { useNavigate } from "react-router-dom";
import CardsData from "./CardsData";
import ActionData from "./actionData";

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

  console.log(dataCard1);
  console.log(dataCard2);
  
  const linkTo = (id)=>{
    if (id) {
      navigate(`datoestudiante/${id}`)
    }
    console.log(id);
    
  }

  return (
    <CardsData dataGraphic={logros} dataCard1={dataCard1} dataCard2={dataCard2} >
      <ActionData type={'go'} data={dataCard1.id} goTo={linkTo} />
    </CardsData>
  );
};

export default HeaderData;
