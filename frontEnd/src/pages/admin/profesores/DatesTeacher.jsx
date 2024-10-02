// import { GrupoDatos } from "../../../components/datosEstudiante/GrupoDatos.jsx";
// import { Dato } from "../../../components/datosEstudiante/Dato.jsx";
// import {DatosHistoria} from "../../../components/datosEstudiante/DatosHistoria.jsx";
// import { Boton } from "../../../components/forms/Boton.jsx";
// import { HeaderData } from "../../../components/tables/headerData/HeaderData.jsx";
// import {GrupoDatoElemento} from "../../../components/datosEstudiante/GrupoDatoElemento.jsx";
// import { dataPersonal, dataTelefono, dataHistoriaClinica } from "../../../helper/objects/dataStudentsArray.js";
import { LayoutGeneral } from "../../../layouts/LayoutGeneral.jsx";

import { DetailsTeachers } from "../../../sections/admin/profesores/DetailsTeachers.jsx";

const DatesTeacher = () => {
 
  return (
      <LayoutGeneral title="DatosAdicionales" titleHeader="Profesores">
       <DetailsTeachers/>
      </LayoutGeneral>
  );
};

export default DatesTeacher;