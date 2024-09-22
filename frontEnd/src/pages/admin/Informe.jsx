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
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { useParams } from "react-router-dom";
import { Boton } from "../../components/forms/Boton"
import { Observacion } from "../../components/forms/Observacion";

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
          tituloArea={"Vida Diaria"}
          idArea={2}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Teatro"}
          idArea={3}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Danza"}
          idArea={4}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Musica"}
          idArea={5}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <InformeIndividual
          tituloArea={"Pintura"}
          idArea={6}
          idtrim={trimestre}
          idestud={idestud}
        >
        </InformeIndividual>

        <Observacion texto={"Observación"} placeholder={"Ingrese la observación del estudiante"} name={"observacion"} onChange={""}/>

      </div>
      <div className="mt-7 flex justify-center">
        <Boton text={"Confirmar"} type={"blue"}/>
      </div>
    </LayoutGeneral>
  );
};
export default Informe;