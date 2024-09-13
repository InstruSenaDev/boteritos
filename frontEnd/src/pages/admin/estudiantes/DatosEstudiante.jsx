import { LayoutGeneral } from "../../../layouts/LayoutGeneral.jsx";
import { useParams } from "react-router-dom";
// import StudentsDates from "../../../sections/admin/registro/GeneralDates/StudentsDates.jsx";
import Detail from "../../../sections/admin/estudiantes/Detail.jsx";

const DatosEstudiante = () => {

  return (
    <LayoutGeneral title="DatosAdicionales" titleHeader="Estudiantes">
      <Detail />
    </LayoutGeneral>
  );
};

export default DatosEstudiante;
