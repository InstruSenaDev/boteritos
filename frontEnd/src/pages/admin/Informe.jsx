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
import HeaderData from "../../components/list/headerData/HeaderData";
import { InformeIndividual } from "../../components/informe/InformeIndividual";
import { Observacion } from "../../components/informe/Observacion";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { useParams } from "react-router-dom";

const Informe = () => {
  const trimestre = JSON.parse(localStorage.getItem("trimestre"));
  const { id } = useParams();
  const idestud = id; 
  return (
    <LayoutGeneral title="InformeObservacion" titleHeader="Informe">
      <div className="w-full space-y-7">
      <HeaderData
        id={id}
        urlApi={"sql/estudiantes/header/"}
        typeLink={"back"}
      />
        <GrupoDatoElemento />
        <div className="w-full h-0 border-darkBlue border-2"></div>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={1}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={2}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={3}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={4}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={5}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Area Socio - Afectiva"}
          idArea={6}
          idtrim={trimestre}
          idestud={idestud}
        >
         
        </InformeIndividual>
      </div>
    </LayoutGeneral>
  );
};
export default Informe;