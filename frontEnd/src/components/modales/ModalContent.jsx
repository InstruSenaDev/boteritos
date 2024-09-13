import React, { useState, useEffect } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { UploadFile } from "../forms/UploadFile";
import {
  dataDoc,
  dataSexo,
  dataTipoParentesco,
  dataDiagnostico,
  dataDiscapacidad,
} from "../../helper/objects/dropdownArray";

export const ModalContent = ({
  selectedContent,
  values,
  handleInputChange,
  handleDropdownChange,
  handleFileChange,
}) => {
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
    dataTipoParentesco: [],
    dataDiagnostico: [],
    dataDiscapacidad: [],
  });

  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      const resultSexo = await dataSexo();
      const resultParentesco = await dataTipoParentesco();
      const resultDiagnostico = await dataDiagnostico();
      const resultDiscapacidad = await dataDiscapacidad();
      setDataDropdown({
        dropdownDocumento: resultDocumento,
        dropdownSexo: resultSexo,
        dataTipoParentesco: resultParentesco,
        dataDiagnostico: resultDiagnostico,
        dataDiscapacidad: resultDiscapacidad,
      });
    };

    getDataDropdown();
  }, []);

  switch (selectedContent) {
    case "responsable":
      return (
        <>
          <Input
            texto="Nombre"
            placeholder="Ingresa el nombre"
            name="nombre"
            tipo="text"
            onChange={handleInputChange}
            value={values.nombre || ""}
          />
          <Input
            texto="Apellido"
            placeholder="Ingresa el apellido"
            name="apellido"
            tipo="text"
            onChange={handleInputChange}
            value={values.apellido || ""}
          />
          <Dropdown
            name="idtipodocumento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            value={values.idtipodocumento || ""}
            placeholder={"Seleccione el tipo de documento"}
          />
          <Input
            texto="Número de documento"
            placeholder="Ingresa el número documento"
            name="numerodocumento"
            tipo="text"
            onChange={handleInputChange}
            value={values.numerodocumento || ""}
          />
          <Input
            texto="Teléfono"
            placeholder="Ingresa el número de teléfono"
            name="telefono"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefono || ""}
          />
          <Input
            texto="Otro teléfono"
            placeholder="Ingresa un segundo teléfono"
            name="telefonodos"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefonodos || ""}
          />
          <Input
            texto="Dirección"
            placeholder="Ingresa la dirección"
            name="direccion"
            tipo="text"
            onChange={handleInputChange}
            value={values.direccion || ""}
          />
          <Input
            texto="Correo electronico"
            placeholder="Ingresa el correo electronico"
            name="correo"
            tipo="text"
            onChange={handleInputChange}
            value={values.correo || ""}
          />
          <Input
            texto="Ocupación"
            placeholder="Ingresa la ocupación"
            name="ocupacion"
            tipo="text"
            onChange={handleInputChange}
            value={values.ocupacion || ""}
          />
          <Input
            texto="Profesión"
            placeholder="Ingresa la profesión"
            name="profesion"
            tipo="text"
            onChange={handleInputChange}
            value={values.profesion || ""}
          />
          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={handleInputChange}
            value={values.empresa || ""}
          />
          <Dropdown
            name="idsexo"
            label="Sexo"
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            value={values.idsexo || ""}
            placeholder={"Seleccione el sexo"}
          />
          <Dropdown
            name="idtipoparentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dataTipoParentesco}
            onChange={(value) =>
              handleDropdownChange("idtipoparentesco", value)
            }
            value={values.idtipoparentesco || ""}
            placeholder={"Seleccione el parentesco"}
          />
        </>
      );

    case "historiaclinica":
      return (
        <>
          <Dropdown
            name="iddiagnostico"
            label="Diagnostico"
            data={dataDropdown.dataDiagnostico}
            onChange={(value) => handleDropdownChange("iddiagnostico", value)}
            value={values.iddiagnostico || ""}
            placeholder={"Seleccione el diagnostico del estudiante"}
          />
          <Dropdown
            name="iddiscapacidad"
            label="Discapacidad"
            data={dataDropdown.dataDiscapacidad}
            onChange={(value) => handleDropdownChange("iddiscapacidad", value)}
            value={values.iddiscapacidad || ""}
            placeholder={"Seleccione la discapacidad del estudiante"}
          />

          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restriccionesalimenticias"
            tipo="text"
            onChange={handleInputChange}
            value={values.restriccionesalimenticias || ""}
          />
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos que necesita"
            name="medicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.medicamentos || ""}
          />
          <Input
            texto="Cantidad de medicamentos"
            placeholder="Ingresa la cantidad de medicamentos que necesita"
            name="cantidadmedicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.cantidadmedicamentos || ""}
          />
          <Input
            texto="Observacion"
            placeholder="Ingresa alguna observación sobre el estudiante"
            name="observacion"
            tipo="text"
            onChange={handleInputChange}
            value={values.observacion || ""}
          />
          <UploadFile
            typefile={".pdf"}
            title={"Archivo"}
            id="archivo"
            onFileChange={(file) => handleFileChange("archivo", file)}
          />
        </>
      );

    case "Informes":
      return (
        <div>
          <h2>Informes</h2>
          <p>Esto NO será un modal.</p>
        </div>
      );

    default:
      return null;
  }
};
