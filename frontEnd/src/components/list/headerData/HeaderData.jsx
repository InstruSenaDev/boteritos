import { useEffect, useState } from "react";
import { getOneUser } from "../../../api/get";
import { useNavigate } from "react-router-dom";
import CardsData from "./CardsData";
import ActionData from "./ActionData";

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

//ESTUDIANTES
export const HeaderData = ({ id, urlApi, urlGo ,typeLink, typeHeaderdata }) => {

  const [dataCard1, setDataCard1] = useState({});
  const [dataCard2, setDataCard2] = useState([]);

  const navigate = useNavigate();

  //OBTENCION DE LOS DATOS
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await getOneUser(`${urlApi}${id}`);
        
        setDataCard1(response.data.data.dataEstudiante);
        setDataCard2(response.data.data.dataResponsable || []);
      }
    };
    getData();
  }, [id]);
  
  const linkTo = (id)=>{

    if (typeLink == 'back') {
      navigate(-1)
      return
    }

    if (id) {
      navigate(`${urlGo}/${id}`)
    }
        
  }

  return (
    <CardsData dataGraphic={logros} dataCard1={dataCard1} dataCard2={dataCard2} >
      <ActionData type={typeLink} data={dataCard1.id} goTo={linkTo} typeHeaderdata={typeHeaderdata}/>
    </CardsData>
  );
};

export default HeaderData;
