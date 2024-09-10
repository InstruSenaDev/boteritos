
import React from 'react'
import { GrupoDatoElemento } from '../../../components/datosEstudiante/GrupoDatoElemento'
import HeaderData from '../../../components/tables/headerData/HeaderData'
import { GrupoDatos } from '../../../components/datosEstudiante/GrupoDatos'
import { DatosHistoria } from '../../../components/datosEstudiante/DatosHistoria'
import { Boton } from '../../../components/forms/Boton'

import { dataPersonal, dataTelefono, dataResponsable, dataCondicionMedica, dataHistoriaClinica } from '../../../helper/objects/dataStudentsArray';

const StudentsDates = () => {
  return (
    <div className="w-full space-y-2 grid gap-10">
      <HeaderData/>
      <GrupoDatoElemento/>

      <div className="w-full h-0 border-darkBlue border-2"></div>

      <div className="space-y-7">
        {/* Datos Personales */}
        <GrupoDatos titulo={"Datos personales"}>
          {dataPersonal.map((dataKey) => (
            <div key={dataKey.idDataPersonal} className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Nombre Completo:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.nombreCompleto}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Tipo de Documento:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.tipoDeDocumento}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Número de Documento:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.numeroDeDocumento}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Dirección:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.direccion}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Correo:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.correo}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Comuna:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.comuna}</p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Teléfonos */}
        <GrupoDatos titulo={"Teléfonos"}>
          {dataTelefono.map((dataKey) => (
            <div key={dataKey.idTelefono} className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Teléfono 1:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.primerTelefono}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Teléfono 2:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.segundoTelefono}</p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Responsable */}
        <GrupoDatos titulo={"Responsable"}>
          {dataResponsable.map((dataKey) => (
            <div key={dataKey.idResponsable} className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Nombre:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.nombre}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Parentesco:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.parentesco}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Tipo de Documento:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.tipoDeDocumento}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Número de Documento:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.numeroDeDocumento}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Teléfono 1:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.primerTelefono}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Teléfono 2:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.segundoTelefono}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Dirección:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.direccion}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Empresa:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.empresa}</p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Condición Médica */}
        <GrupoDatos titulo={"Condición Médica"}>
          {dataCondicionMedica.map((dataKey) => (
            <div key={dataKey.idCondicionMedica} className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">EPS:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.eps}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">RH:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.rh}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Peso:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.peso}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Estatura:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.estatura}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Lugar de Atención:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.lugarDeAtencion}</p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Historia Clínica */}
        <DatosHistoria titulo={"Historia Clínica"}>
          {dataHistoriaClinica.map((dataKey) => (
            <div key={dataKey.idHistoriaClinica} className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Diagnóstico:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.diagnostico}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Medicamentos:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.medicamentos}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Restricciones Alimenticias:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.restriccionesAlimenticias}</p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">Alergias:</p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.alergias}</p>
              </div>
            </div>
          ))}
        </DatosHistoria>
      </div>

      <div className="w-full flex justify-center">
        <Boton text="Confirmar" type="blue" />
      </div>
    </div>
    
  )
}

export default StudentsDates
