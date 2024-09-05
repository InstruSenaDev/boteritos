import React, { useState, useEffect } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { UploadFile } from "../forms/UploadFile";
import { dataDoc } from "../../helper/objects/dropdownArray";

export const ModalContent = ({
  selectedContent,
  values,
  handleInputChange,
  handleDropdownChange,
}) => {
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownParentesco: [],
  });

  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      setDataDropdown({ dropdownDocumento: resultDocumento });
      
      const resultParentesco = await dataParentesco();
      setDataDropdown({ dropdownDocumento: resultParentesco });
    };

    getDataDropdown();
  }, []);
  

  switch (selectedContent) {
    case "telefono":
      return (
        <Input
          texto="Ingresa un número de teléfono el cual permita comunicarse con el estudiante"
          placeholder="Por favor escriba su número telefónico"
          name="telefono"
          tipo="text"
          onChange={handleInputChange}
          value={values.telefono || ""}
        />
      );

    case "responsable":
      return (
        <>
          <Input
            texto="Nombre completo"
            placeholder="Ingresa el nombre completo"
            name="nombre"
            tipo="text"
            onChange={handleInputChange}
            value={values.nombre || ""}
          />
          <Dropdown
            name="idtipodocumento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            value={values.idtipodocumento || ""}
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
            name="idparentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idparentesco", value)}
            value={values.idparentesco || ""}
          />
        </>
      );

    // Similar para los otros casos

    case "condicionmedica":
      return (
        <>
          <Dropdown
            name="parentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("parentesco", value)}
            value={values.parentesco || ""}
          />
          <Input
            texto="Lugar de atención"
            placeholder="Ingresa el lugar de atención"
            name="lugaratencion"
            tipo="text"
            onChange={handleInputChange}
            value={values.lugaratencion || ""}
          />
          <Dropdown
            name="rh"
            label="RH"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("rh", value)}
            value={values.rh || ""}
          />
          <Input
            texto="Estatura"
            placeholder="Ingresa la estatura"
            name="estatura"
            tipo="text"
            onChange={handleInputChange}
            value={values.estatura || ""}
          />
          <Input
            texto="Peso"
            placeholder="Ingresa el peso"
            name="peso"
            tipo="text"
            onChange={handleInputChange}
            value={values.peso || ""}
          />
        </>
      );

    case "historiaclinica":
      return (
        <>
          <Input
            texto="Diagnóstico"
            placeholder="Ingresa el diagnóstico del estudiante"
            name="diagnostico"
            tipo="text"
            onChange={handleInputChange}
            value={values.diagnostico || ""}
          />
          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restricciones"
            tipo="text"
            onChange={handleInputChange}
            value={values.restricciones || ""}
          />
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos que necesita"
            name="medicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.medicamentos || ""}
          />
          <UploadFile />
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
