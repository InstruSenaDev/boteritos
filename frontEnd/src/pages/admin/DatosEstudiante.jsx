import React from "react";
// import { GrupoDatos } from "../../components/datosEstudiante/GrupoDatos";
// import { Dato } from "../../components/datosEstudiante/Dato";
// import { DatosHistoria } from "../../components/datosEstudiante/DatosHistoria";
// import { Boton } from "../../components/forms/Boton";
// import { HeaderData } from "../../components/tables/headerData/HeaderData.jsx";
// import { GrupoDatoElemento } from "../../components/datosEstudiante/GrupoDatoElemento";
// import {
//   dataPersonal,
//   dataTelefono,
//   dataResponsable,
//   dataCondicionMedica,
//   dataHistoriaClinica,
// } from "../../helper/objects/dataStudentsArray";
import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";
import { useParams } from "react-router-dom";
import StudentsDates from "../../sections/admin/GeneralDates/StudentsDates.jsx";

const DatosEstudiante = () => {
  const { id } = useParams();
  return (
    <LayoutGeneral title="DatosAdicionales" titleHeader="Estudiantes">
      <StudentsDates />
    </LayoutGeneral>
  );
};

export default DatosEstudiante;
