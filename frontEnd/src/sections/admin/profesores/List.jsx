import { useState } from "react";
import HeaderData from "../../../components/list/headerData/HeaderData";
import TableListTeacher from "../../../components/list/tables/TableListTeachers";
const List = () => {
  const [idProfesor, setIdProfesor] = useState("");

  //ID QUE IRÁ CAMBIANDO, ESTE ES EL ID QUE ENVIA LA LISTA Y VA A RECIBIR EL HEAD
  const getId = (value) => {
    setIdProfesor(value);
  };

  return (
    <>
      <main className="flex flex-col gap-8">
        <HeaderData
        />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE PROFESORES
        </p>
        <TableListTeacher getId={getId} />
      </main>
    </>
  );
};

export default List;
