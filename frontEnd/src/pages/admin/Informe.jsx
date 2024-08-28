import React from "react";
import {
  dataSocioAfectiva,
  dataVidaDiaria,
  dataTeatro,
  dataDanza,
  dataMusica,
  dataPintura,
} from "../../helper/objects/dataInforme";
import { GrupoDatoElemento } from "../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../components/tables/headerData/HeaderData";
import { InformeIndividual } from "../../components/informe/InformeIndividual";
import { Observacion } from "../../components/informe/Observacion";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";

export const Informe = () => {
  return (
    <LayoutGeneral title="InformeObservacion" titleHeader="Informe">
      <div class="w-full space-y-7">
        <HeaderData />
        <GrupoDatoElemento />
        <div class="w-full h-0 border-darkBlue border-2"></div>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataSocioAfectiva}
        >
          <Observacion />
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataVidaDiaria}
        >
          <Observacion />
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataTeatro}
        >
          <Observacion />
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataDanza}
        >
          <Observacion />
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataMusica}
        >
          <Observacion />
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          data={dataPintura}
        >
          <Observacion />
        </InformeIndividual>
      </div>
    </LayoutGeneral>
  );
};
