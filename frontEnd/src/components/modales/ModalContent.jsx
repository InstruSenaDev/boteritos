import React, { useState, useEffect } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { UploadFile } from "../forms/UploadFile";
import { dataDoc } from "../../helper/objects/dropdownArray";

export const ModalContent = ({
  selectedContent,
  values={},
  handleInputChange,
  handleDropdownChange,
  errors={}
}) => {
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
  });

  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      setDataDropdown({ dropdownDocumento: resultDocumento });
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
          error={errors.telefono}
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
            error={errors.nombre}
          />
          <Dropdown
            name="documento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("documento", value)}
            value={values.documento || ""}
            error={errors.documento}
          />
          <Input
            texto="Número de documento"
            placeholder="Ingresa el número documento"
            name="numeroDocumento"
            tipo="text"
            onChange={handleInputChange}
            value={values.numerococumento || ""}
            error={errors.numerococumento}
          />
          <Input
            texto="Teléfono"
            placeholder="Ingresa el número de teléfono"
            name="telefono"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefono || ""}
            error={errors.telefono}
          />
          <Input
            texto="Otro teléfono"
            placeholder="Ingresa un segundo teléfono"
            name="telefonodos"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefonodos || ""}
            error={errors.telefonodos}
          />
          <Input
            texto="Dirección"
            placeholder="Ingresa la dirección"
            name="direccion"
            tipo="text"
            onChange={handleInputChange}
            value={values.direccion || ""}
            error={errors.direccion}
          />
          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={handleInputChange}
            value={values.empresa || ""}
            error={errors.empresa}
          />
          <Dropdown
            name="parentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("parentesco", value)}
            value={values.parentesco || ""}
            error={errors.parentesco}
          />
        </>
      );

    // Similar para los otros casos

    case "condicionmedica":
      return (
        <>
          <Input
            texto="Lugar de atención"
            placeholder="Ingresa el lugar de atención"
            name="lugaratencion"
            tipo="text"
            onChange={handleInputChange}
            value={values.lugaratencion || ""}
            error={errors.lugaratencion}
          />
          <Dropdown
            name="rh"
            label="RH"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("rh", value)}
            value={values.rh || ""}
            error={errors.rh}
          />
          <Input
            texto="Estatura"
            placeholder="Ingresa la estatura"
            name="estatura"
            tipo="text"
            onChange={handleInputChange}
            value={values.estatura || ""}
            error={errors.estatura}
          />
          <Input
            texto="Peso"
            placeholder="Ingresa el peso"
            name="peso"
            tipo="text"
            onChange={handleInputChange}
            value={values.peso || ""}
            error={errors.peso}
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
            error={errors.diagnostico}
          />
          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restricciones"
            tipo="text"
            onChange={handleInputChange}
            value={values.restricciones || ""}
            error={errors.restricciones}
          />
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos que necesita"
            name="medicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.medicamentos || ""}
            error={errors.medicamentos}
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
