import React, { useState } from "react";
import { GrupoDatoElemento } from "../../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../../components/tables/headerData/HeaderData";
import { GrupoDatos } from "../../../components/datosEstudiante/GrupoDatos";
import { DatosHistoria } from "../../../components/datosEstudiante/DatosHistoria";
import { Boton } from "../../../components/forms/Boton";

import {
  dataPersonal,
  dataTelefono,
  dataResponsable,
  dataCondicionMedica,
  dataHistoriaClinica,
} from "../../../helper/objects/dataStudentsArray";
import { useParams } from "react-router-dom";
import { UpdateModal } from "../../../components/modales/UpdateModal";
import { Input } from "../../../components/forms/Input";

const StudentsDates = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionData, setSectionData] = useState(null); //para almacenar los datos de cada sección
  const [isModalOpen, setModalOpen] = useState(false);

  const { id } = useParams();

  const update = (sectionId, data) => {
    console.log(id);
    setSelectedSection(sectionId);
    setSectionData(data); //para establecer los datos de la sección
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
    setSectionData(null);
  };

  const handleSave = () => {
    const newData = {
      section: selectedSection,
      data: sectionData,
    };
    console.log("Datos guardados", newData);
    closeModal();
  };

  const handleInputChange = (e, key) => {
    
    setSectionData({
      ...sectionData,
      [key]: e.target.value,
    });
  };

  const filterData = (data) => {
    // Filtra los campos que contienen IDs (asumiendo que todos los IDs tienen 'id' en su nombre)
    return Object.keys(data)
      .filter((key) => !key.toLowerCase().includes("id"))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  };

  const formatLabel = (key) => {
    // Convierte la primera letra a mayúscula y agrega espacios antes de mayúsculas.
    return key
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula.
      .replace(/^./, (str) => str.toUpperCase()); // Convierte la primera letra a mayúscula.
  };

  const isFieldEditable = (key) => {
    // Determina si el campo es editable o no
    const nonEditableKeys = ["tipoDeDocumento", "numeroDeDocumento"];
    return !nonEditableKeys.includes(key);
  };

  return (
    <div className="w-full space-y-2 grid gap-10">
      <HeaderData id={id} />
      <GrupoDatoElemento />
      <div className="w-full h-0 border-darkBlue border-2"></div>
      <div className="space-y-7">
        {/* Datos Personales */}
        <GrupoDatos
          titulo={"Datos personales"}
          update={() => update("Datos personales", dataPersonal[0])}
        >
          {dataPersonal.map((dataKey) => (
            <div
              key={dataKey.idDataPersonal}
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
            >
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Nombre Completo:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.nombreCompleto}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Tipo de Documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.tipoDeDocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Número de Documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.numeroDeDocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Dirección:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.direccion}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Correo:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.correo}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Comuna:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.comuna}
                </p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Teléfonos */}
        <GrupoDatos
          titulo={"Teléfonos"}
          update={() => update("Teléfonos", dataTelefono[0])}
        >
          {dataTelefono.map((dataKey) => (
            <div
              key={dataKey.idTelefono}
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
            >
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Teléfono 1:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.primerTelefono}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Teléfono 2:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.segundoTelefono}
                </p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Responsable */}
        <GrupoDatos
          titulo={"Responsable"}
          update={() => update("Responsable", dataResponsable[0])}
        >
          {dataResponsable.map((dataKey) => (
            <div
              key={dataKey.idResponsable}
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
            >
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Nombre:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.nombre}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Parentesco:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.parentesco}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Tipo de Documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.tipoDeDocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Número de Documento:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.numeroDeDocumento}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Teléfono 1:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.primerTelefono}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Teléfono 2:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.segundoTelefono}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Dirección:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.direccion}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Empresa:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.empresa}
                </p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Condición Médica */}
        <GrupoDatos
          titulo={"Condición Médica"}
          update={() => update("condición medica", dataCondicionMedica[0])}
        >
          {dataCondicionMedica.map((dataKey) => (
            <div
              key={dataKey.idCondicionMedica}
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
            >
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  EPS:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.eps}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  RH:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.rh}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Peso:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.peso}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Estatura:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.estatura}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Lugar de Atención:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.lugarDeAtencion}
                </p>
              </div>
            </div>
          ))}
        </GrupoDatos>

        {/* Historia Clínica */}
        <DatosHistoria
          titulo={"Historia Clínica"}
          update={() => update("Historia clinica", dataHistoriaClinica[0])}
        >
          {dataHistoriaClinica.map((dataKey) => (
            <div
              key={dataKey.idHistoriaClinica}
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3"
            >
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Diagnóstico:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.diagnostico}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Medicamentos:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.medicamentos}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Restricciones Alimenticias:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.restriccionesAlimenticias}
                </p>
              </div>
              <div>
                <p className="font-cocogooseLight text-paragraph text-darkBlue">
                  Alergias:
                </p>
                <p className="font-cocogooseLight text-paragraph2 flex-1">
                  {dataKey.alergias}
                </p>
              </div>
            </div>
          ))}
        </DatosHistoria>
      </div>
      <div className="w-full flex justify-center">
        <Boton text="Confirmar" type="blue" />
      </div>

      <UpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      >
        <h2 className="text-paragraph font-cocogooseLight">
          Editando sección: {selectedSection}
        </h2>
        {sectionData && (
          <div>
            {Object.keys(filterData(sectionData)).map((key) => (
              <div key={key} className="mb-4">
                <label className="blocktext-paragraph font-cocogooseLight text-darkBlue">
                  {formatLabel(key)}:
                </label>
                <input
                  type="text"
                  value={sectionData[key]}
                  onChange={(e) =>
                    isFieldEditable(key) && handleInputChange(e, key)
                  }
                  className={`p-2 rounded-xl w-full px-5 text-paragraph3 border-darkBlue font-cocogooseLight border-[1.5px] focus:ring focus:selection focus:outline-none ${
                    isFieldEditable(key) ? "" : "bg-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!isFieldEditable(key)}
                />
              </div>
            ))}
          </div>
        )}
      </UpdateModal>
    </div>
  );
};

export default StudentsDates;
