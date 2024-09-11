//import React from "react";
import { useState } from "react";
import HeaderData from "../../../components/tables/headerData/HeaderData";
import TableStudents from "../../../components/estudiantes/tableStudents";

export const DataStudent = () => {

  const [idEstudiante, setIdEstudiante] = useState('')
  
  //ID QUE IRÁ CAMBIANDO, ESTE ES EL ID QUE ENVIA LA LISTA Y VA A RECIBIR EL HEAD
  const getId = (value) =>{
    setIdEstudiante(value)
  }

  return (
    <>
      <main className="flex flex-col gap-8">
        <HeaderData id={idEstudiante} urlApi={'sql/estudiantes/header/'} typeLink={'go'} />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE ESTUDIANTES
        </p>
        <TableStudents getId={getId} />
      </main>
    </>
  );
};
