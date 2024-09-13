import { GrupoDatos } from "../../../components/datosEstudiante/GrupoDatos.jsx";
import { Dato } from "../../../components/datosEstudiante/Dato.jsx";
import {DatosHistoria} from "../../../components/datosEstudiante/DatosHistoria.jsx";
import { Boton } from "../../../components/forms/Boton.jsx";
import { HeaderData } from "../../../components/tables/headerData/HeaderData.jsx";
import {GrupoDatoElemento} from "../../../components/datosEstudiante/GrupoDatoElemento.jsx";
import { dataPersonal, dataTelefono, dataHistoriaClinica } from "../../../helper/objects/dataStudentsArray.js";
import { LayoutGeneral } from "../../../layouts/LayoutGeneral.jsx";
import { useParams } from "react-router-dom";

const DatesTeacher = () => {
  const { id } = useParams();
  return (
      <LayoutGeneral title="DatosAdicionales" titleHeader="Profesores">
        <div className="w-full space-y-2 grid gap-10">
          <HeaderData/>
          <GrupoDatoElemento/>
          <div className="w-full h-0 border-darkBlue border-2"></div>
          <div className="space-y-7">
            <GrupoDatos titulo={"Datos personales"}>
              <Dato data={dataPersonal} />
            </GrupoDatos>

            <GrupoDatos titulo={"Datos personales"}>
              <Dato data={dataTelefono} />
            </GrupoDatos>

            <DatosHistoria titulo={"Historia clinica"}>
              <Dato data={dataHistoriaClinica} />
            </DatosHistoria>
          </div>
          <div className="w-full flex justify-center">
            <Boton text="Confirmar" type="blue" />
          </div>
        </div>
      </LayoutGeneral>
  );
};

export default DatesTeacher;