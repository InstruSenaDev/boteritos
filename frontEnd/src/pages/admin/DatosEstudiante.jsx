import React from "react";
import { GrupoDatos } from "../../components/datosEstudiante/GrupoDatos";
import { Dato } from "../../components/datosEstudiante/Dato";
import {DatosHistoria} from "../../components/datosEstudiante/DatosHistoria";
import { Boton } from "../../components/forms/Boton";
import { HeaderData } from "../../components/tables/headerData/HeaderData.jsx";
import {GrupoDatoElemento} from "../../components/datosEstudiante/GrupoDatoElemento";
import { dataPersonal, dataTelefono, dataResponsable, dataCondicionMedica, dataHistoriaClinica } from "../../helper/objects/dataStudentsArray";
import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";

export const DatosEstudiante = () => {
  return (
      <LayoutGeneral title="DatosAdicionales" titleHeader="Estudiantes">
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
            <GrupoDatos titulo={"Responsable"}>
              <Dato data={dataResponsable} />
            </GrupoDatos>
            <GrupoDatos titulo={"dataCondicionMedica"}>
              <Dato data={dataCondicionMedica} />
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
